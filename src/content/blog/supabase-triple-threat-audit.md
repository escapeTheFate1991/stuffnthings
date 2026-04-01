---
title: "The Supabase Triple Threat: How Three Small Mistakes Create One Big Security Breach"
excerpt: "In Supabase, your 'API' is actually PostgREST sitting on PostgreSQL. Learn how IDOR + data exposure + broken auth chain together for devastating attacks, and get our audit prompt to find these vulnerabilities in your own codebase."
date: "2026-04-01"
author: "Stuffnthings Security Team"
image: "/images/sections/blog-security.png"
tag: "Security"
gradient: "from-red-500/30 to-orange-500/10"
accentColor: "#ef4444"
featured: true
readingTime: "10 min read"
keywords: ["supabase security", "postgrest vulnerabilities", "idor attacks", "row level security", "database security"]
promptContent: |
  **Context:** I am hardening my Supabase application against advanced attack chains. In Supabase, the API (PostgREST) is a direct reflection of the database schema. I need to ensure that a single vulnerability (like a leaky RLS policy) cannot be chained with others (like IDOR or excessive data exposure) to compromise the system.

  **Task:** Audit my SQL schema, RLS policies, and Database Functions for the following "Triple Threat" vulnerabilities:

  **1. IDOR & Enumeration Check:**
  * Identify any tables using `BigInt` or `Serial` (integer) primary keys instead of `UUID`.
  * For existing integer keys, suggest a migration to `UUID` or a strategy to mask them using a `hashid` or a Public View.

  **2. Excessive Data Exposure (PostgREST Scrubbing):**
  * Scan all tables for sensitive columns (e.g., `email`, `stripe_id`, `internal_notes`, `role`, `is_admin`).
  * For these tables, write the SQL to create a **Secure View** using `WITH (security_invoker = true)` that excludes these sensitive fields.
  * Provide the `REVOKE` and `GRANT` commands to ensure the `anon` and `authenticated` roles can only access the **View**, not the raw table.

  **3. RLS Policy & Logic Audit:**
  * Flag any RLS policies using `USING (true)` or `CHECK (true)`.
  * Verify that every policy involving a user check uses the cached pattern: `((select auth.uid()) = user_id)` for performance and accuracy.
  * Check all **Database Functions (RPCs)**:
  * Ensure they are defined with `SECURITY INVOKER` by default.
  * If `SECURITY DEFINER` is required, verify that `SET search_path = public` is present and that `auth.uid()` is manually checked inside the function body to prevent privilege escalation.

  **4. Schema Hygiene:**
  * Confirm all tables in the `public` schema have RLS enabled.
  * Check for any "Shadow Admin" functions that bypass RLS but are exposed to the `authenticated` role.

  **Output Requirement:** Provide a summary of found "holes" and the exact SQL migrations needed to fix them.
---

# The Supabase Triple Threat: How Three Small Mistakes Create One Big Security Breach

In traditional web development, you build an API layer in Node.js, Python, or Go that sits between your frontend and database. You write authentication middleware, validation logic, and business rules in application code.

**But in Supabase, your "API" is actually a thin layer (PostgREST) sitting directly on top of your PostgreSQL database.** This means your security logic isn't in a Node.js middleware; it's inside the database itself.

This architectural difference creates a unique attack surface. Here's how the **"Triple Threat" Chain** looks and breaks in a Supabase environment, and how you fix it.

---

## 1. The IDOR Gotcha (Enumeration)

**The Scenario:** You have a table `projects` with an auto-incrementing integer `id`.

* **The Hole:** Even with Row Level Security (RLS) enabled, if your policy is slightly off—or if you accidentally set a table to "Public"—an attacker can guess `id=101`, `id=102`, etc.
* **The Supabase Fix:** **Use UUIDs.**
 * When creating tables, set the `id` column to type `uuid` with the default `gen_random_uuid()`. 
 * Integers are predictable; UUIDs are practically impossible to guess.

**Migration Example:**
```sql
-- Bad: Integer IDs
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  user_id UUID REFERENCES auth.users(id)
);

-- Good: UUID IDs
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  user_id UUID REFERENCES auth.users(id)
);
```

---

## 2. Excessive Data Exposure (The PostgREST Leak)

**The Scenario:** You call `supabase.from('projects').select('*')`.

* **The Hole:** By default, `select('*')` returns **every column** in that table. If you have a column like `internal_admin_note` or `project_secret_key`, it gets sent to the browser. In Supabase, the "frontend" is the one asking for the data, so you can't rely on the frontend developer to "just not ask for it."
* **The Supabase Fix:** **Database Views.**
 1. Create a view that only includes safe columns:
 ```sql
 CREATE VIEW public_projects AS
 SELECT id, name, created_at FROM projects;
 ```
 2. **Revoke** all permissions on the raw `projects` table from the `authenticated` and `anon` roles.
 3. **Grant** select permission only on the `public_projects` view.

**Secure View Implementation:**
```sql
-- Create the secure view
CREATE VIEW public_projects 
WITH (security_invoker = true) AS
SELECT 
  id, 
  name, 
  created_at,
  user_id
FROM projects;

-- Revoke access to raw table
REVOKE ALL ON projects FROM authenticated;
REVOKE ALL ON projects FROM anon;

-- Grant access only to the view
GRANT SELECT ON public_projects TO authenticated;
GRANT SELECT ON public_projects TO anon;

-- Enable RLS on the view (inherits from underlying table)
ALTER TABLE public_projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for the view
CREATE POLICY "Users can see their own projects" ON public_projects
  FOR SELECT USING (auth.uid() = user_id);
```

---

## 3. The "Triple Threat" Chain in Supabase

This is how a real hack would happen on a Supabase stack by chaining minor mistakes:

1. **The Chain Link 1 (IDOR):** You used integer IDs. The attacker finds your project at `id=50`. They guess `id=51`.
2. **The Chain Link 2 (Data Leak):** Your RLS policy for `SELECT` on the `projects` table is `true` (publicly readable). The attacker fetches `id=51`. Because you used `select('*')`, the JSON response includes a hidden column: `creator_id` (a UUID).
3. **The Chain Link 3 (Broken Auth):** You created a **Database Function** to "Reset User Settings" and checked the "REST API" box. 
 * **The Mistake:** Inside the function, you wrote `WHERE user_id = input_id`. You forgot to check if `auth.uid() == input_id`.
 * **The Kill:** The attacker calls your function via `rpc('reset_settings', { input_id: 'leaked-uuid-from-step-2' })`. They just wiped or took over another user's configuration.

**The Complete Attack Chain:**
```javascript
// Step 1: IDOR - Guess integer IDs
const response1 = await supabase
  .from('projects')
  .select('*')
  .eq('id', 51);

// Step 2: Data leak - Gets creator_id from select('*')
const leaked_user_id = response1.data[0].creator_id;

// Step 3: Privilege escalation - Call vulnerable RPC
const response2 = await supabase
  .rpc('reset_user_settings', { 
    input_id: leaked_user_id 
  });

// Victim's settings are now wiped/controlled by attacker
```

---

## 4. The Supabase Hardening Checklist

### Row Level Security (RLS) is Not Optional

Never leave a table without RLS. Even if it's meant to be public, use a policy that explicitly says `FOR SELECT USING (true)`. This prevents accidental "write" access.

```sql
-- Bad: No RLS at all
CREATE TABLE public_posts (id UUID PRIMARY KEY, content TEXT);

-- Good: Explicit public read policy
CREATE TABLE public_posts (id UUID PRIMARY KEY, content TEXT);
ALTER TABLE public_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read posts" ON public_posts
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can create" ON public_posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```

### Use `auth.uid()` Constantly

In every single policy, verify the requester. 
* **Bad Policy:** `USING (true)` (Anyone can see anything).
* **Good Policy:** `USING (auth.uid() = user_id)` (Users can only see their own rows).

**Performance Optimization:**
```sql
-- Slow: auth.uid() called for every row
CREATE POLICY "slow_policy" ON user_data
  FOR SELECT USING (auth.uid() = user_id);

-- Fast: auth.uid() cached for the query
CREATE POLICY "fast_policy" ON user_data
  FOR SELECT USING ((SELECT auth.uid()) = user_id);
```

### Protect your `service_role` Key

* **The Gotcha:** Developers sometimes bake the `service_role` key into their frontend code because they "can't get RLS to work."
* **The Reality:** The `service_role` key **bypasses all RLS**. If an attacker gets this key, they are the "Super Admin" of your entire database. **Never** use this key in the browser.

```javascript
// NEVER DO THIS
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY);

// DO THIS INSTEAD
const supabase = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
```

### The "Search Path" Security Hole

* **The Hole:** PostgreSQL has a "search path" for schemas. If an attacker can create a function or table with the same name as a system one, they might trick your functions into running their malicious code.
* **The Fix:** When writing custom Postgres functions (RPCS), always explicitly set the `search_path`:

```sql
CREATE FUNCTION my_secure_func() 
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public -- <--- CRITICAL
AS $$ 
BEGIN
  -- Ensure we check auth even in SECURITY DEFINER functions
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  
  -- Your secure logic here
END;
$$;
```

### Audit your "Foreign Tables"

If you use **Supabase Wrappers** to connect to external databases (like Stripe or Firebase), ensure your RLS extends to those foreign tables. A leak in a connected service can be the "Step 2" in a chain that lets an attacker back into your primary database.

```sql
-- Example: Secure Stripe integration
CREATE FOREIGN TABLE stripe_customers (
  id TEXT,
  email TEXT,
  user_id UUID
) SERVER stripe_server;

-- Apply RLS to foreign table too
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stripe_user_access" ON stripe_customers
  FOR SELECT USING ((SELECT auth.uid()) = user_id);
```

---

## 5. Advanced Attack Scenarios

### The "Shadow Admin" Exploit

**The Setup:** You create an admin panel with a `user_roles` table:

```sql
CREATE TABLE user_roles (
  user_id UUID REFERENCES auth.users(id),
  role TEXT CHECK (role IN ('user', 'admin'))
);
```

**The Mistake:** You create a function to promote users but forget to check who's calling it:

```sql
-- VULNERABLE FUNCTION
CREATE FUNCTION promote_to_admin(target_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with elevated privileges
AS $$
BEGIN
  UPDATE user_roles 
  SET role = 'admin' 
  WHERE user_id = target_user_id;
END;
$$;
```

**The Attack:** Any authenticated user can promote themselves to admin:
```javascript
await supabase.rpc('promote_to_admin', { 
  target_user_id: supabase.auth.user().id 
});
```

**The Fix:** Always check permissions inside `SECURITY DEFINER` functions:

```sql
-- SECURE FUNCTION
CREATE FUNCTION promote_to_admin(target_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_role TEXT;
BEGIN
  -- Check if current user is admin
  SELECT role INTO current_user_role 
  FROM user_roles 
  WHERE user_id = auth.uid();
  
  IF current_user_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can promote users';
  END IF;
  
  UPDATE user_roles 
  SET role = 'admin' 
  WHERE user_id = target_user_id;
END;
$$;
```

### The "Cascade Privilege" Attack

**The Setup:** You have related tables with different security levels:

```sql
-- Public: Anyone can see company info
CREATE TABLE companies (
  id UUID PRIMARY KEY,
  name TEXT,
  website TEXT
);

-- Private: Only employees can see employee data
CREATE TABLE employees (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  user_id UUID REFERENCES auth.users(id),
  salary INTEGER,
  ssn TEXT
);
```

**The Mistake:** Your RLS policies don't consider JOIN attacks:

```sql
-- Looks secure...
CREATE POLICY "employees_own_data" ON employees
  FOR SELECT USING (auth.uid() = user_id);

-- But this is too open
CREATE POLICY "companies_public" ON companies
  FOR SELECT USING (true);
```

**The Attack:** Attacker joins public data with private data:
```javascript
// This shouldn't work but might if RLS is misconfigured
const { data } = await supabase
  .from('companies')
  .select(`
    name,
    employees(salary, ssn)
  `);
```

**The Fix:** Be explicit about JOIN permissions and test edge cases:

```sql
-- Secure the relationship
CREATE POLICY "companies_public" ON companies
  FOR SELECT USING (true);

CREATE POLICY "employees_own_data" ON employees
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() IN (
      SELECT user_id FROM employees 
      WHERE company_id = employees.company_id 
      AND role = 'admin'
    )
  );
```

---

## 6. Testing Your Security

### Automated Security Testing

Create test scenarios for each attack vector:

```javascript
// Test 1: IDOR Protection
async function testIDOR() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*');
  
  // Try to access someone else's project by incrementing ID
  for (let i = 1; i < 1000; i++) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', i);
    
    if (data && data.length > 0) {
      console.error(`IDOR vulnerability: Can access project ${i}`);
    }
  }
}

// Test 2: Data Exposure
async function testDataExposure() {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .limit(1);
  
  const columns = Object.keys(data[0] || {});
  const sensitiveColumns = [
    'internal_notes', 'admin_only', 'secret_key', 
    'stripe_id', 'private_data'
  ];
  
  const exposedSensitive = columns.filter(col => 
    sensitiveColumns.some(sensitive => 
      col.includes(sensitive)
    )
  );
  
  if (exposedSensitive.length > 0) {
    console.error(`Data exposure: ${exposedSensitive.join(', ')}`);
  }
}

// Test 3: Broken Function Auth
async function testFunctionAuth() {
  const functions = [
    'reset_user_settings',
    'delete_user_data', 
    'promote_user',
    'admin_override'
  ];
  
  for (const func of functions) {
    try {
      // Try to call admin function as regular user
      const { data, error } = await supabase.rpc(func, {
        user_id: 'some-other-user-uuid'
      });
      
      if (!error) {
        console.error(`Function auth bypass: ${func} allows unauthorized access`);
      }
    } catch (e) {
      // Expected - function should reject unauthorized calls
    }
  }
}
```

### Security Audit Checklist

**Before Production:**
- [ ] All tables use UUID primary keys
- [ ] All tables have RLS enabled
- [ ] No `USING (true)` policies except for intentionally public data
- [ ] All Database Functions use explicit auth checks
- [ ] `SECURITY DEFINER` functions set `search_path = public`
- [ ] No sensitive columns exposed in public views
- [ ] Service role key never used in frontend
- [ ] Foreign table RLS policies configured
- [ ] JOIN attack scenarios tested
- [ ] Automated security tests passing

**Regular Monitoring:**
- [ ] Weekly RLS policy reviews
- [ ] Monthly penetration testing
- [ ] Quarterly security audits
- [ ] Database function permission audits
- [ ] User privilege escalation tests

---

## Get the Audit Prompt

This security framework can be systematically applied to any Supabase application. The audit prompt below is designed to be fed into a coding assistant (like Cursor, Claude, or ChatGPT) that has access to your codebase.

**Copy this prompt and run it against your Supabase schema to identify potential Triple Threat vulnerabilities:**

---

**[Copy Prompt Button Will Appear Here]**

---

## Why This Matters for Supabase

Traditional API security focuses on endpoint protection, request validation, and middleware authentication. **Supabase security is fundamentally different—it's database security made accessible via HTTP.**

The Triple Threat attack pattern is especially dangerous in Supabase because:

1. **Direct Database Access:** PostgREST exposes your database schema directly
2. **Client-Side Queries:** Frontend code determines what data gets requested  
3. **Database-Level Security:** All protection must be implemented in PostgreSQL, not application code

This architectural shift requires a fundamentally different security mindset. Traditional web developers are used to controlling data access in application code. **In Supabase, your database IS your API.**

### Real-World Impact

We've seen production Supabase applications with exactly these vulnerabilities:

- **E-commerce platform:** Integer product IDs allowed inventory enumeration and price manipulation
- **SaaS application:** Exposed user emails and subscription data via `select('*')` queries  
- **Healthcare app:** Admin functions accessible to regular users, allowing data modification
- **Financial service:** Foreign table misconfiguration leaked Stripe customer data

Each of these could have been prevented with the hardening checklist above.

---

## Next Steps

1. **Run the audit prompt** on your current Supabase schema
2. **Implement UUID migration** for any integer primary keys  
3. **Create secure views** for tables with sensitive columns
4. **Audit all RLS policies** for overly permissive rules
5. **Review Database Functions** for auth bypass vulnerabilities
6. **Set up automated security testing** in your CI/CD pipeline

**Need help with Supabase security hardening?** Our team specializes in PostgreSQL security architecture and Supabase-specific threat modeling. We provide comprehensive security audits, migration planning, and ongoing monitoring for production Supabase applications.

[Schedule a Supabase Security Audit →](/contact)

---

*The security landscape for database-as-API architectures like Supabase is rapidly evolving. Stay updated with our latest security research and practical hardening guides by subscribing to our security newsletter.*