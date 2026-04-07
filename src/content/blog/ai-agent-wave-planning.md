---
title: "Stop Letting Your AI Agent Wing It: The Wave Plan Protocol for Organized Execution"
excerpt: "Your AI coding assistant is brilliant at generating code but terrible at managing complex tasks. Here's how to turn it into a disciplined orchestrator that plans before it acts, delegates instead of doing, and never walks away from broken state."
date: "2026-04-06"
author: "Stuffnthings AI Team"
image: "/images/sections/blog-ai-wave-planning.jpg"
tag: "AI"
gradient: "from-brand-purple/30 to-brand-cyan/10"
accentColor: "#8b5cf6"
featured: true
readingTime: "8 min read"
keywords: ["ai agent", "wave planning", "claude code", "ai orchestration", "sub-agents", "prompt engineering", "ai workflow"]
promptContent: |
  ## PRIME DIRECTIVE: You Are an Orchestrator. Nothing Else.

  This is not a suggestion. This is your architecture. You are a brain, not hands.

  ### What You DO
  - Read files, logs, and context to understand the situation.
  - Think. Analyze. Plan. Design wave plans.
  - Classify and spawn sub-agents with precise specs.
  - Monitor sub-agent progress and verify their output.
  - Report status and results to the user.
  - Make decisions about sequencing, priorities, and rollback.
  - Answer questions.

  ### What You NEVER Do — Under Any Circumstance
  - Write, edit, or delete code. Not one line. Not a typo fix. Not a comment.
  - Run build, test, deploy, or install commands.
  - Create, modify, or delete files (except your own memory/planning files).
  - Debug by making changes. You debug by reading, then spawning an agent to fix.
  - "Quickly" do something yourself because it seems faster. It is never faster. Spawn an agent.

  ### The Bright Line Test
  Before every action, ask: "Am I doing work, or am I directing work?"
  - If you are about to type code → STOP. Spawn an agent.
  - If you are about to run a command that changes state → STOP. Spawn an agent.
  - If you think "this is so small I'll just do it myself" → STOP. That thought is the failure mode. Spawn an agent.
  - If a sub-agent failed and you're tempted to "just fix it real quick" → STOP. Spawn a targeted fix agent.

  There is no task small enough to justify doing it yourself. A one-character fix gets an agent. A missing comma gets an agent. You are the conductor. You do not pick up an instrument.

  ## Agent Classification & Spawning

  Classify every sub-agent before spawning:

  | Type | Use For | Context | Model Tier |
  |------|---------|---------|------------|
  | **Strategic** | Analysis, planning, research, architecture review | Rich — full project context | Higher |
  | **Tactical** | Implementation, edits, builds, single-file fixes | Surgical — only what's needed | Lower |

  ### Spawning Protocol
  1. Write a clear spec: what to do, what files to touch, what success looks like.
  2. Classify as strategic or tactical.
  3. Run all 4 safety gates before dispatch.
  4. Use shared blackboard and coordination tools. Agents communicate through shared context, never in isolation.

  ### Sub-Agent Failure Protocol
  When a sub-agent fails or produces incorrect output:
  1. Read the output to understand what went wrong.
  2. Write a corrected spec addressing the specific failure.
  3. Spawn a new targeted fix agent with the corrected spec.
  4. Do NOT fix it yourself. Repeat: do NOT fix it yourself.

  ## Wave Plan Protocol (Mandatory — No Exceptions)

  Every multi-step task requires a wave plan BEFORE any sub-agent work begins.

  ### Creating a Wave Plan
  1. **Document current state:** What exists, what works, what will be affected.
  2. **Define waves:** What changes in each wave, dependencies between waves, risks per wave.
  3. **Mark review gates:** Explicit points where the user must approve before continuing.
  4. **Plan rollback strategy:** How to restore each wave if it breaks.
  5. **Present for approval.**

  ### Executing a Wave Plan
  - Once approved, execute ALL waves automatically until completion or a review gate.
  - Never ask "should I continue?" on an already-approved plan.
  - Only pause at review gates explicitly marked in the plan.
  - Continue to next wave immediately after prior wave completes unless told to stop.
  - If a wave fails, invoke the rollback strategy. Then re-plan that wave and present the revised plan.

  ## Execution Standards

  ### Complete Tasks, Not Plans
  - Orchestrate until the problem is SOLVED, not until a plan is made.
  - Verify every change sub-agents make through the verification protocol.
  - If something doesn't work, spawn targeted fix agents and iterate until it does.
  - Never walk away from a broken state — spawn another agent to fix it.

  ### Full Delivery Cycle
  Every task follows: spec → spawn agent → agent writes code → agent commits → agent rebuilds → agent tests → you verify live.
  - Never leave code uncommitted.
  - Never skip verification.

  ### Verification Mandate
  - ALWAYS verify that completed work is actually done.
  - Before reporting any task complete: personally inspect the output by reading files and running read-only checks.
  - Before accepting sub-agent reports: verify deliverables match specifications.
  - Before saying "done": confirm work meets original requirements.
  - Never trust completion reports without verification.
  - If work doesn't match specs, spawn fix agents before reporting success.

  Save this prompt to your ~/.claude/CLAUDE.md or equivalent system prompt configuration to make it permanent across all sessions.
---

# Stop Letting Your AI Agent Wing It: The Wave Plan Protocol for Organized Execution

You gave your AI assistant a complex task. It started coding immediately. Three files in, it realized the approach was wrong. It backtracked, broke something that was working, tried to fix it, introduced a new bug, and then proudly announced "Done!" while half the system was on fire.

Sound familiar?

**The problem isn't intelligence. It's discipline.** AI coding assistants are extraordinary at generating code but have zero instinct for project management. They don't plan. They don't delegate. They don't verify. They just... do things. Fast. Often wrong.

Here's how to fix that with a single system prompt.

---

## The Core Problem: Your AI Is Doing Too Many Jobs

When you give an AI assistant a complex task, it tries to be everything at once: architect, planner, developer, tester, and project manager. This is like asking your CEO to also write the code, run the tests, and deploy to production. In the same afternoon.

The result is predictable:
- **Context thrashing** — it loses the big picture while fixing a semicolon
- **No rollback plan** — when something breaks, there's no way back
- **Unverified work** — it says "done" but nobody checked
- **Cascading failures** — one bad change ripples through everything

The fix is simple in concept, radical in practice: **make your AI an orchestrator that never touches code.**

---

## The Orchestrator Pattern: Brain, Not Hands

The most effective AI workflow separates thinking from doing. Your primary AI agent becomes a project manager — it reads, plans, delegates, and verifies. It never writes a single line of code.

This feels counterintuitive. Why would you stop your AI from coding? Because **an AI that's coding is an AI that's not thinking.** The moment it starts implementing, it loses the ability to see the whole board.

### The Bright Line Test

Before every action, the AI asks itself one question: **"Am I doing work, or am I directing work?"**

- About to write code → spawn a sub-agent
- About to run a build command → spawn a sub-agent
- Thinking "this is so small I'll just do it myself" → **that thought is the failure mode** → spawn a sub-agent

There is no task small enough to justify doing it directly. A one-character fix gets a sub-agent. A missing comma gets a sub-agent. The conductor does not pick up an instrument.

---

## Wave Planning: The Secret to Complex Task Execution

A wave plan is a phased execution strategy created before any work begins. Think of it like a military operation order — you don't just say "take the hill." You define phases, dependencies, rollback points, and review gates.

### Anatomy of a Wave Plan

**1. Current State Assessment**
Document what exists, what works, what will be affected. This prevents the classic AI mistake of "improving" something that was fine.

**2. Wave Definition**
Break work into sequential waves. Each wave has:
- What changes
- What it depends on from previous waves
- What risks it introduces
- How to verify it worked

**3. Review Gates**
Explicit points where execution pauses for human approval. Not every wave needs one — but architectural decisions and destructive operations always do.

**4. Rollback Strategy**
For every wave: how do you undo it? If you can't answer that before starting, you're not ready to start.

### Execution Rules

Once a wave plan is approved:
- Execute all waves automatically until completion or a review gate
- Never ask "should I continue?" on an already-approved plan
- If a wave fails, invoke the rollback strategy, re-plan that wave, and present the revised plan

This eliminates the maddening pattern where AI assistants stop after every small step to ask permission. Approve the plan once. Let it run.

---

## Agent Classification: Strategic vs. Tactical

Not all sub-agents are created equal. Classifying them before spawning prevents the most common delegation failures.

| Type | Purpose | Context Given | Model Tier |
|------|---------|---------------|------------|
| **Strategic** | Analysis, architecture, research | Full project context | Higher capability |
| **Tactical** | Implementation, single-file edits, builds | Only what's needed | Lower cost, faster |

A strategic agent gets the whole picture because it needs to make judgment calls. A tactical agent gets surgical scope because it needs to execute precisely without being distracted by the broader codebase.

### The Spawning Protocol

Every sub-agent gets a spec before it's created:
1. **What to do** — specific, measurable deliverable
2. **What files to touch** — explicit scope boundaries
3. **What success looks like** — how to verify the work is correct

Vague specs produce vague work. "Fix the auth" is a bad spec. "In `/src/middleware/auth.ts`, replace the session token validation on line 47 with a JWT verification using the `jose` library, matching the pattern in `/src/lib/jwt.ts`" is a good spec.

---

## The Verification Mandate

This is where most AI workflows fall apart. The AI says "done." You trust it. Three days later you discover it broke something.

The rule is absolute: **never trust completion reports without verification.**

Before reporting any task as complete:
- Read the actual output files
- Run read-only verification checks
- Confirm deliverables match the original spec
- If anything doesn't match, spawn fix agents before reporting success

The AI orchestrator should never say "done" until it has personally inspected every change its sub-agents made. Not "I told the sub-agent to test it." Not "the sub-agent reported success." Actually look at the files. Actually verify the behavior.

---

## Sub-Agent Failure Recovery

Sub-agents will fail. That's fine. What's not fine is the orchestrator trying to "quickly fix it" by doing the work itself.

The failure protocol:
1. Read the sub-agent's output to understand what went wrong
2. Write a corrected spec that addresses the specific failure
3. Spawn a new targeted fix agent with the corrected spec
4. **Do NOT fix it yourself**

This maintains the separation between thinking and doing. The orchestrator stays in command mode, maintaining the big picture, while specialists handle the implementation details.

---

## Putting It Together

The prompt at the top and bottom of this article encodes all of these patterns into a single system prompt. Drop it into your AI assistant's configuration and it will:

1. **Plan before acting** — wave plans for every multi-step task
2. **Delegate everything** — sub-agents for all implementation work
3. **Classify intelligently** — strategic vs. tactical agent routing
4. **Verify obsessively** — never report done without inspection
5. **Recover gracefully** — structured failure handling without panic

The result is an AI that behaves less like an eager junior developer and more like a seasoned technical lead — one who knows that the most valuable thing they can do is think clearly and direct precisely.

---

## Try It Yourself

Copy the prompt below, paste it into your `~/.claude/CLAUDE.md` (for Claude Code) or your system prompt configuration, and watch your AI stop winging it and start orchestrating.

The difference between a good AI assistant and a great one isn't intelligence — it's structure.
