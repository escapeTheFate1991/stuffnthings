'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Tag, Calendar, User } from 'lucide-react'
import Fuse from 'fuse.js'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  tag: string
  gradient: string
  accentColor: string
  readingTime?: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [tags, setTags] = useState<string[]>(['All'])

  // Load posts on client side
  useEffect(() => {
    const staticPosts: BlogPost[] = [
      {
        slug: 'ai-video-production-claude-remotion',
        title: "AI Video Production From the Command Line: How We Use Claude Code and Remotion to Build Professional Videos",
        excerpt: "Professional video production without a video team. We combined Claude Code with Remotion to produce polished product videos autonomously — from script to MP4 — using only a terminal and a browser.",
        date: "2026-04-16",
        author: "Stuffnthings Engineering",
        image: "/images/sections/ai-video-production.png",
        tag: "Engineering",
        gradient: "from-brand-green/30 to-emerald-500/10",
        accentColor: "#10b981",
        readingTime: "8 min read"
      },
      {
        slug: 'ai-agent-wave-planning',
        title: "Stop Letting Your AI Agent Wing It: The Wave Plan Protocol for Organized Execution",
        excerpt: "Your AI coding assistant is brilliant at generating code but terrible at managing complex tasks. Here's how to turn it into a disciplined orchestrator that plans before it acts, delegates instead of doing, and never walks away from broken state.",
        date: "2026-04-06",
        author: "Stuffnthings AI Team",
        image: "/images/sections/blog-ai-wave-planning.jpg",
        tag: "AI",
        gradient: "from-brand-purple/30 to-brand-cyan/10",
        accentColor: "#8b5cf6",
        readingTime: "8 min read"
      },
      {
        slug: 'supabase-triple-threat-audit',
        title: "The Supabase Triple Threat: How Three Small Mistakes Create One Big Security Breach",
        excerpt: "In Supabase, your 'API' is actually PostgREST sitting on PostgreSQL. Learn how IDOR + data exposure + broken auth chain together for devastating attacks, and get our audit prompt to find these vulnerabilities.",
        date: "2026-04-01",
        author: "Stuffnthings Security Team",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        tag: "Security",
        gradient: "from-red-500/30 to-orange-500/10",
        accentColor: "#ef4444",
        readingTime: "10 min read"
      }
    ]
    setPosts(staticPosts)
    setTags(['All', 'Engineering', 'AI', 'Security'])
  }, [])

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(
    () => new Fuse(posts, {
      keys: ['title', 'excerpt', 'tag', 'author'],
      threshold: 0.4,
    }),
    [posts]
  )

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filteredPosts = posts

    // Apply tag filter
    if (selectedTag !== 'All') {
      filteredPosts = filteredPosts.filter(post => post.tag === selectedTag)
    }

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery)
      const searchedPosts = searchResults.map(result => result.item)
      if (selectedTag !== 'All') {
        filteredPosts = searchedPosts.filter(post => post.tag === selectedTag)
      } else {
        filteredPosts = searchedPosts
      }
    }

    return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [posts, searchQuery, selectedTag, fuse])

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 to-black" />
        
        {/* Background orbs */}
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-purple/[0.05] blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-8%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.04] blur-[110px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Prompts That</span>{' '}
              <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">Actually Work</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Battle-tested prompts for AI security audits, compliance frameworks, and enterprise deployment. 
              Copy, paste, and secure your systems.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Desktop Search & Filter */}
            <div className="hidden md:flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 backdrop-blur-sm">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white placeholder-slate-400 focus:border-brand-cyan/50 focus:outline-none transition-all"
                />
              </div>

              {/* Tag Filter */}
              <div className="flex items-center gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-brand-cyan text-black'
                        : 'bg-white/[0.05] text-slate-400 hover:bg-white/[0.1] hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Search & Filter */}
            <div className="md:hidden space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-white placeholder-slate-400 focus:border-brand-cyan/50 focus:outline-none transition-all"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-white transition-all hover:bg-white/[0.05]"
              >
                <Filter className="w-5 h-5" />
                Filter by Category
              </button>

              {/* Mobile Filter Dropdown */}
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 space-y-2"
                >
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(tag)
                        setIsFilterOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTag === tag
                          ? 'bg-brand-cyan text-black'
                          : 'text-slate-400 hover:bg-white/[0.1] hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <p className="text-slate-400 text-sm">
              {filteredPosts.length} prompt{filteredPosts.length !== 1 ? 's' : ''} found
              {selectedTag !== 'All' && ` in ${selectedTag}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </motion.div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white/[0.05] rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No prompts found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedTag('All')
                }}
                className="px-6 py-3 bg-brand-cyan text-black rounded-lg font-medium hover:bg-brand-cyan/90 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/${post.slug}`} className="block">
                    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                      {/* Image Header */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-40 group-hover:opacity-20 transition-opacity duration-500`} />
                        
                        {/* Tag */}
                        <div className="absolute top-3 left-3">
                          <span
                            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md bg-black/40 border border-white/10 flex items-center gap-1"
                            style={{ color: post.accentColor }}
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {post.tag}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug group-hover:text-brand-cyan transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </div>
                        </div>

                        {/* Read More Link */}
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                          style={{ color: post.accentColor }}
                        >
                          Read & Copy Prompt
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
