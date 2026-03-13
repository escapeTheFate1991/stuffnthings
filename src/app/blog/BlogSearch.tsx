'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostMetadata } from '@/lib/mdx'
import { motion, AnimatePresence } from 'framer-motion'

export default function BlogSearch({ initialPosts }: { initialPosts: BlogPostMetadata[] }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTag, setActiveTag] = useState('All')

    const tags = ['All', ...Array.from(new Set(initialPosts.map(post => post.tag)))]

    const filteredPosts = initialPosts.filter(post => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesTag = activeTag === 'All' || post.tag === activeTag
        return matchesSearch && matchesTag
    })

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    // Optional: split into featured and rest if we are on 'All' and no search
    const isDefaultView = activeTag === 'All' && searchQuery === ''
    const featuredPost = isDefaultView ? filteredPosts[0] : null
    const gridPosts = isDefaultView ? filteredPosts.slice(1) : filteredPosts

    return (
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT SIDEBAR: Filters & Search (Sticky on Desktop) */}
            <div className="lg:col-span-3 lg:sticky top-32 space-y-10">
                {/* Search */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Search</h3>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/[0.03] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all"
                            placeholder="Find articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Categories</h3>
                    <div className="flex flex-col gap-2 relative">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${activeTag === tag
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                                    }`}
                            >
                                {activeTag === tag && (
                                    <motion.div
                                        layoutId="activeFilterBg"
                                        className="absolute inset-0 bg-white/[0.1] border border-white/20 rounded-xl z-0"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tag}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT MAIN CONTENT: Articles */}
            <div className="lg:col-span-9 space-y-12">

                {/* Featured Post (Only show on default view) */}
                {featuredPost && (
                    <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                        <Link href={`/blog/${featuredPost.slug}`} className="group block">
                            <article className="relative rounded-3xl overflow-hidden border border-white/10 bg-black group-hover:border-white/20 transition-all duration-300">
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="relative aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-tr ${featuredPost.gradient} opacity-30`} />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-md bg-black/80 text-white border border-white/20">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center bg-white/[0.02]">
                                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
                                            <span className="text-brand-cyan">{featuredPost.tag}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                                            <span>{formatDate(featuredPost.date)}</span>
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-[1.1] font-display group-hover:text-brand-cyan transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center font-bold text-sm tracking-widest uppercase transition-all" style={{ color: featuredPost.accentColor }}>
                                            Read Article
                                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </motion.div>
                )}

                {/* Grid Posts */}
                <div className="grid md:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                        {gridPosts.map((post) => (
                            <motion.div
                                layout
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={post.slug}
                            >
                                <Link href={`/blog/${post.slug}`} className="group block h-full">
                                    <article className="flex flex-col h-full rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.15] transition-all duration-300">

                                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                                            <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-20`} />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-md bg-black/60 text-white border border-white/10">
                                                    {post.tag}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-black uppercase tracking-widest">
                                                <span>{formatDate(post.date)}</span>
                                            </div>

                                            <h2 className="text-2xl font-black text-white mb-4 leading-tight font-display group-hover:text-brand-cyan transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>

                                            <p className="text-slate-400 leading-relaxed mb-8 flex-1">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto flex items-center font-bold text-sm uppercase tracking-widest" style={{ color: post.accentColor }}>
                                                Read
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredPosts.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                        <p className="text-slate-400 text-lg mb-4">No articles found matching "{searchQuery}"</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveTag('All') }}
                            className="text-white font-bold bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
