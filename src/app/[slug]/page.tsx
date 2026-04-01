import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin, Tag, Clock, Copy, Check } from 'lucide-react'
import { CopyPromptButton } from '@/components/CopyPromptButton'

// Static blog posts data - in production this would come from a CMS or markdown files
const BLOG_POSTS = {
  'supabase-triple-threat-audit': {
    slug: 'supabase-triple-threat-audit',
    title: "The Supabase Triple Threat: How Three Small Mistakes Create One Big Security Breach",
    excerpt: "In Supabase, your 'API' is actually PostgREST sitting on PostgreSQL. Learn how IDOR + data exposure + broken auth chain together for devastating attacks, and get our audit prompt to find these vulnerabilities.",
    date: "2026-04-01",
    author: "Stuffnthings Security Team",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
    tag: "Security",
    gradient: "from-red-500/30 to-orange-500/10",
    accentColor: "#ef4444",
    readingTime: "10 min read",
    content: `
# The Supabase Triple Threat

In traditional web development, you build an API layer in Node.js, Python, or Go that sits between your frontend and database. You write authentication middleware, validation logic, and business rules in application code.

**But in Supabase, your "API" is actually a thin layer (PostgREST) sitting directly on top of your PostgreSQL database.** This means your security logic isn't in a Node.js middleware; it's inside the database itself.

This architectural difference creates a unique attack surface. Here's how the **"Triple Threat" Chain** looks and breaks in a Supabase environment, and how you fix it.

## 1. The IDOR Gotcha (Enumeration)

**The Scenario:** You have a table \`projects\` with an auto-incrementing integer \`id\`.

* **The Hole:** Even with Row Level Security (RLS) enabled, if your policy is slightly off—or if you accidentally set a table to "Public"—an attacker can guess \`id=101\`, \`id=102\`, etc.
* **The Supabase Fix:** **Use UUIDs.**
  * When creating tables, set the \`id\` column to type \`uuid\` with the default \`gen_random_uuid()\`. 
  * Integers are predictable; UUIDs are practically impossible to guess.

## 2. Excessive Data Exposure (The PostgREST Leak)

**The Scenario:** You call \`supabase.from('projects').select('*')\`.

* **The Hole:** By default, \`select('*')\` returns **every column** in that table. If you have a column like \`internal_admin_note\` or \`project_secret_key\`, it gets sent to the browser.
* **The Supabase Fix:** **Database Views.**
  1. Create a view that only includes safe columns
  2. **Revoke** all permissions on the raw table
  3. **Grant** select permission only on the view

## 3. The "Triple Threat" Chain in Supabase

This is how a real hack would happen on a Supabase stack by chaining minor mistakes:

1. **The Chain Link 1 (IDOR):** You used integer IDs. The attacker finds your project at \`id=50\`. They guess \`id=51\`.
2. **The Chain Link 2 (Data Leak):** Your RLS policy allows public reads. The attacker fetches \`id=51\` and gets a hidden \`creator_id\` UUID.
3. **The Chain Link 3 (Broken Auth):** You created a Database Function to "Reset User Settings" but forgot to check if \`auth.uid() == input_id\`.

**The Kill:** The attacker calls your function via \`rpc('reset_settings', { input_id: 'leaked-uuid-from-step-2' })\`. They just wiped another user's configuration.

## The Audit Prompt

Use this prompt with your AI coding assistant to systematically audit your Supabase application for these vulnerabilities.
    `,
    promptContent: `**Context:** I am hardening my Supabase application against advanced attack chains. In Supabase, the API (PostgREST) is a direct reflection of the database schema. I need to ensure that a single vulnerability (like a leaky RLS policy) cannot be chained with others (like IDOR or excessive data exposure) to compromise the system.

**Task:** Audit my SQL schema, RLS policies, and Database Functions for the following "Triple Threat" vulnerabilities:

**1. IDOR & Enumeration Check:**
* Identify any tables using \`BigInt\` or \`Serial\` (integer) primary keys instead of \`UUID\`.
* For existing integer keys, suggest a migration to \`UUID\` or a strategy to mask them using a \`hashid\` or a Public View.

**2. Excessive Data Exposure (PostgREST Scrubbing):**
* Scan all tables for sensitive columns (e.g., \`email\`, \`stripe_id\`, \`internal_notes\`, \`role\`, \`is_admin\`).
* For these tables, write the SQL to create a **Secure View** using \`WITH (security_invoker = true)\` that excludes these sensitive fields.
* Provide the \`REVOKE\` and \`GRANT\` commands to ensure the \`anon\` and \`authenticated\` roles can only access the **View**, not the raw table.

**3. RLS Policy & Logic Audit:**
* Flag any RLS policies using \`USING (true)\` or \`CHECK (true)\`.
* Verify that every policy involving a user check uses the cached pattern: \`((select auth.uid()) = user_id)\` for performance and accuracy.
* Check all **Database Functions (RPCs)**:
* Ensure they are defined with \`SECURITY INVOKER\` by default.
* If \`SECURITY DEFINER\` is required, verify that \`SET search_path = public\` is present and that \`auth.uid()\` is manually checked inside the function body to prevent privilege escalation.

**4. Schema Hygiene:**
* Confirm all tables in the \`public\` schema have RLS enabled.
* Check for any "Shadow Admin" functions that bypass RLS but are exposed to the \`authenticated\` role.

**Output Requirement:** Provide a summary of found "holes" and the exact SQL migrations needed to fix them.`
  }
}

export function generateStaticParams() {
  return [
    { slug: 'supabase-triple-threat-audit' }
  ]
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS[params.slug as keyof typeof BLOG_POSTS]
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Stuffnthings`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS[params.slug as keyof typeof BLOG_POSTS]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 to-black" />
        
        {/* Background orbs */}
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-purple/[0.03] blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-8%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.02] blur-[110px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Prompts
          </Link>

          {/* Copy Prompt Button - Top of Page */}
          {post.promptContent && (
            <div className="mb-8">
              <CopyPromptButton 
                promptContent={post.promptContent}
                accentColor={post.accentColor}
                className="w-full sm:w-auto"
              />
            </div>
          )}

          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              {/* Tag */}
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-black/40 border border-white/10 flex items-center gap-1"
                style={{ color: post.accentColor }}
              >
                <Tag className="w-3 h-3" />
                {post.tag}
              </span>

              {/* Reading Time */}
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author and Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm mr-2">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://stuffnthings.io/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://stuffnthings.io/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://stuffnthings.io/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-20`} />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
            />
          </div>
        </div>
      </section>

      {/* Copy Prompt Section - Bottom of Page */}
      {post.promptContent && (
        <section className="py-16 md:py-24 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Audit Your System?
              </h2>
              <p className="text-xl text-slate-400">
                Copy this prompt and use it with your AI coding assistant to find vulnerabilities.
              </p>
            </div>
            
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 mb-8">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-x-auto">
                {post.promptContent}
              </pre>
            </div>

            <div className="text-center">
              <CopyPromptButton 
                promptContent={post.promptContent}
                accentColor={post.accentColor}
                size="lg"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}