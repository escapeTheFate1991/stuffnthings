import { getSortedPostsData } from '@/lib/mdx'
import BlogSearch from '@/app/blog/BlogSearch'
import Link from 'next/link'

export const metadata = {
    title: 'The Agent | Stuffnthings',
    description: 'Insights on web performance, AI automation, and local business digital strategy.',
}

export default function BlogIndex() {
    const allPosts = getSortedPostsData()

    return (
        <div className="min-h-screen bg-slate-950 pt-20 md:pt-28 relative overflow-hidden">

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold gradient-text tracking-tight">stuffnthings</Link>
                    <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to home</Link>
                </div>
            </nav>

            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-purple/10 via-brand-cyan/5 to-transparent pointer-events-none" />

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                <header className="mb-10 md:mb-16 mt-6 md:mt-12">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 font-display tracking-tight leading-none">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Agent</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium">
                        Performance insights, AI automation strategies, and unfiltered truth about what actually works for local business growth.
                    </p>
                </header>

                <div className="border-t border-white/10 pt-12 md:pt-16 mb-32">
                    <BlogSearch initialPosts={allPosts} />
                </div>
            </div>
        </div>
    )
}
