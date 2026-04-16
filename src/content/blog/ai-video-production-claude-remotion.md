---
title: "AI Video Production From the Command Line: How We Use Claude Code and Remotion to Build Professional Videos"
excerpt: "Professional video production without a video team. We combined Claude Code with Remotion to produce polished product videos autonomously — from script to MP4 — using only a terminal and a browser."
date: "2026-04-16"
author: "Stuffnthings Engineering"
image: "/images/sections/ai-video-production.png"
tag: "Engineering"
gradient: "from-brand-green/30 to-emerald-500/10"
accentColor: "#10b981"
featured: true
readingTime: "8 min read"
keywords: ["ai video production", "claude code", "remotion", "video automation", "ai video editing", "programmatic video", "react video", "claude code skills", "autonomous video creation", "business video automation"]
promptContent: |
  Clone the claude-code-video-toolkit from https://github.com/digitalsamba/claude-code-video-toolkit into ~/Development/. Install it as a global Claude Code skill by copying .claude/commands/*.md to ~/.claude/commands/ and .claude/skills/* to ~/.claude/skills/. Install Python dependencies from tools/requirements.txt. Set up a Remotion project from one of the templates (product-demo or sprint-review). Install npm dependencies and verify Remotion Studio launches. Report the Studio URL when ready.
---

# AI Video Production From the Command Line: How We Use Claude Code and Remotion to Build Professional Videos

Every business needs video. Product demos, explainer clips, social ads, investor updates. The demand is constant. The production capacity is not.

Hiring a video team or an agency to produce a 60-second product demo costs thousands of dollars and takes weeks. Editing software like Premiere or After Effects requires specialized skills and hours of manual work per minute of output. For small businesses and startups operating at speed, this math doesn't work. **We built a system that produces professional videos from a text description in the terminal — and we used it to ship a real product demo.**

---

## The Problem: Video Production Doesn't Scale

Video content drives more engagement than any other format. Every platform prioritizes it. Every marketing playbook recommends it. But the production bottleneck is brutal:

- A 60-second product video takes 8-20 hours of manual editing
- Professional motion graphics require After Effects expertise
- Every revision cycle adds days to the timeline
- Small teams can't justify a dedicated video producer

The result is that most businesses either skip video entirely or produce low-quality content that hurts their brand more than it helps. We wanted a third option: **AI-directed video production that produces broadcast-quality output without manual editing.**

---

## What We Built: Claude Code + Remotion + the Video Toolkit

The system has three layers working together.

### Remotion: Video as React Components

[Remotion](https://github.com/remotion-dev/remotion) is a React-based framework for programmatic video. Instead of dragging clips on a timeline, you write React components that describe scenes, animations, and transitions. Each scene is a function. Each animation is code. The entire video is a composition you can version-control, parameterize, and render to MP4.

This matters because code-based video is repeatable. Change the product name, swap the benchmark numbers, adjust the color scheme — re-render. No manual re-editing. No timeline scrubbing. Just change the props and hit render.

### Claude Code: The Director

Claude Code is an AI coding assistant that runs directly in your terminal. Give it a description of what you want, and it writes the code. In our case, that code happens to be Remotion video compositions.

The workflow is conversational:

```
You: "Build a product demo video for Engram Memory. 8 scenes.
      Start with a title card, walk through the key features,
      show the benchmark results, end with a CTA."

Claude: [reads your benchmark data, proposes scene breakdown,
         builds all Remotion compositions, configures transitions]

You: "Make the benchmark scene more dramatic. Animate the
      numbers counting up."

Claude: [modifies the scene component, adds spring animations]
```

You direct. Claude builds. You review in the browser. Iterate until it's right. Render.

### The Video Toolkit: Skills That Teach Claude How to Produce

The [claude-code-video-toolkit](https://github.com/digitalsamba/claude-code-video-toolkit) is an open-source skill pack that gives Claude Code specialized knowledge about video production. It installs as a set of Claude Code skills and commands that teach the AI how to:

- Structure Remotion projects and scene compositions
- Use FFmpeg for media processing and format conversion
- Generate AI voiceover for narration
- Create images for scene backgrounds and illustrations
- Generate background music and soundtracks
- Record browser demos as video assets using Playwright
- Manage the full production pipeline from script to final render

Without the toolkit, Claude Code can write React components but doesn't know Remotion's APIs, animation patterns, or video production conventions. The toolkit bridges that gap.

---

## Real Example: Engram Memory Product Video

We didn't build this system as a proof of concept. We used it to produce a real product demo for [Engram Memory](https://github.com/EngramMemory/engram-memory-community), our open-source persistent memory library.

### The Brief

73 seconds. 8 scenes. Professional motion graphics. Real data from our benchmark suite.

### The Scene Breakdown

| Scene | Duration | Content |
|-------|----------|---------|
| Title Card | 8s | Product name, tagline, animated logo |
| The Problem | 10s | "AI agents forget everything between sessions" |
| The Solution | 10s | Engram's architecture — store, recall, forget |
| Store Speed | 9s | Benchmark: 21x faster than competing solutions |
| Recall Accuracy | 9s | 96-100% recall accuracy across query types |
| Hot-Tier Cache | 8s | Sub-millisecond retrieval from in-memory cache |
| Data Sovereignty | 9s | Self-hosted, your data stays on your infrastructure |
| CTA | 10s | GitHub link, install command, call to action |

### How It Happened

Claude Code read our benchmark report — real performance data from standardized tests. It proposed the scene structure, wrote all 8 Remotion compositions with coordinated animations, configured the transitions, and set up the render pipeline.

The entire process took a handful of prompts. Not hours of timeline editing. Not days of back-and-forth with a motion graphics contractor. A conversation.

### Remotion Studio: The Human Review Layer

This is the critical piece that separates AI video production from "AI-generated slop." Remotion Studio is a browser-based GUI that runs locally. It shows your video composition in real-time with a scrubable timeline, frame-by-frame preview, and live prop editing.

When Claude builds a scene, you open Remotion Studio, preview it, and give feedback:

```
You: "The benchmark numbers are hard to read. Increase font
      size and add a slight delay before the animation starts."

Claude: [adjusts the component, updates timing]
```

You refresh the Studio preview, confirm it looks right, and move on. Non-technical team members can review in the same browser — no dev environment required. They see the actual video, not code.

---

## The Production Pipeline

Here's the full workflow from idea to finished video:

```
1. Describe the video you want (text prompt in terminal)
2. Claude proposes scene breakdown and structure
3. Claude builds Remotion compositions (React components)
4. Preview in Remotion Studio (browser GUI)
5. Iterate: adjust scenes, timing, animations via conversation
6. Generate voiceover narration (optional)
7. Add background music (optional)
8. Render to MP4
```

Each step is conversational. You describe what you want in plain English. Claude handles the implementation. Remotion Studio gives you the visual feedback loop. The toolkit provides the production infrastructure.

### What Makes This Different From AI Video Generators

Services that generate video from text prompts give you a black box. You type a description, wait, and get whatever the model produces. If you don't like it, you regenerate and hope for better.

This approach is fundamentally different:

- **Full creative control** — every scene is a React component you can inspect and modify
- **Deterministic rendering** — the same code produces the same video every time
- **Real data integration** — pull numbers from your actual benchmarks, databases, or APIs
- **Iterative refinement** — change one scene without re-rendering everything
- **Version control** — your video is code, stored in git, with full history
- **No vendor lock-in** — Remotion is open source, runs on your hardware

---

## Set It Up Yourself

The entire system is open source. Here's the install prompt you can give directly to Claude Code to set everything up:

```
Clone the claude-code-video-toolkit from
https://github.com/digitalsamba/claude-code-video-toolkit
into ~/Development/. Install it as a global Claude Code skill
(copy .claude/commands/*.md to ~/.claude/commands/ and
.claude/skills/* to ~/.claude/skills/). Install Python
dependencies from tools/requirements.txt. Set up a Remotion
project from one of the templates (product-demo or
sprint-review). Install npm dependencies and verify Remotion
Studio launches. Report the Studio URL when ready.
```

Once the toolkit is installed, you have access to all the video production skills directly in your Claude Code session. Open a terminal, start Claude Code, and describe the video you want to make.

### Requirements

- Node.js 18+ and npm
- Python 3.10+ (for media processing tools)
- Claude Code CLI installed and authenticated
- FFmpeg (for rendering and media conversion)
- A browser (for Remotion Studio preview)

---

## Why This Matters for Your Business

The economics of video production just changed. Here's the before and after:

| | Traditional | AI-Directed |
|---|---|---|
| **Time to first draft** | 3-5 days | 30 minutes |
| **Cost per video** | $2,000-$10,000 | Your existing hardware |
| **Revision cycle** | 1-3 days per round | Minutes |
| **Technical skill required** | After Effects, Premiere | Describe what you want |
| **Scalability** | Linear (more videos = more hours) | Conversational (more videos = more prompts) |

This isn't about replacing creative professionals. It's about removing the bottleneck between having an idea and seeing it on screen. Product launches, feature announcements, quarterly updates, sales enablement videos, onboarding walkthroughs — all of these become same-day deliverables instead of multi-week projects.

The GUI layer (Remotion Studio) means your marketing team, your founders, your sales leads can all review and provide feedback without touching code. They open a browser, watch the preview, and say "make the logo bigger." The AI handles the rest.

---

## Links and Resources

- **Claude Code Video Toolkit:** [github.com/digitalsamba/claude-code-video-toolkit](https://github.com/digitalsamba/claude-code-video-toolkit)
- **Remotion:** [github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion)
- **Claude Code:** [claude.ai/code](https://claude.ai/code)
- **Engram Memory (our demo subject):** [github.com/EngramMemory/engram-memory-community](https://github.com/EngramMemory/engram-memory-community)

---

## Ready to Automate More Than Video?

You just saw what happens when you point AI at a production bottleneck. A multi-day creative process collapsed into a conversation. The same principle applies across your entire operation.

Our courses teach business owners and operators how to use AI to automate the workflows that eat their time: document generation, customer onboarding, sales follow-up sequences, reporting dashboards, internal tooling. The pattern is always the same — describe what you want, AI builds it, you review and iterate.

These aren't theory courses. They're hands-on, practical playbooks built from the systems we run in production every day. Every technique we teach is something we've deployed for real clients with real revenue on the line.

If you're spending hours on tasks that could be conversations, you're leaving operational leverage on the table.

**[Explore our courses at stuffnthings.io](https://stuffnthings.io)**
