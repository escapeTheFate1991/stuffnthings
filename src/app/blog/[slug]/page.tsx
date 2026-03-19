import { getPostData, getAllPostSlugs } from '@/lib/mdx'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
    const slugs = getAllPostSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostData(params.slug)

    return {
        title: `${post.metadata.title} | Stuffnthings Blog`,
        description: post.metadata.excerpt,
        openGraph: {
            title: post.metadata.title,
            description: post.metadata.excerpt,
            type: 'article',
            publishedTime: post.metadata.date,
            authors: [post.metadata.author],
            images: [
                {
                    url: post.metadata.image,
                    width: 1200,
                    height: 630,
                    alt: post.metadata.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metadata.title,
            description: post.metadata.excerpt,
            images: [post.metadata.image],
        },
    }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostData(params.slug)

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    return (
        <div className="bg-slate-950 min-h-screen relative">

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold gradient-text tracking-tight">stuffnthings</Link>
                    <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to home</Link>
                </div>
            </nav>

            {/* Massive Full-Bleed Hero Section */}
            <div className="relative pt-32 pb-40 md:pt-40 md:pb-48 overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        fill
                        className="object-cover opacity-20 md:opacity-30"
                        priority
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent`} />
                    <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent`} />
                    <div className={`absolute inset-0 bg-gradient-to-b ${post.metadata.gradient} opacity-20`} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-end h-full">
                    {/* Back Link */}
                    <div className="mb-10 lg:mb-16">
                        <Link href="/blog" className="inline-flex items-center text-sm font-black tracking-widest uppercase text-slate-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to The Agent
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-8">
                        <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-black bg-white">
                            {post.metadata.tag}
                        </span>
                        <span className="text-slate-400 text-sm font-black uppercase tracking-widest">
                            {formatDate(post.metadata.date)}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-white font-display leading-[1.05] mb-10 md:mb-16 max-w-5xl tracking-tight">
                        {post.metadata.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <span className="text-white text-sm md:text-lg font-black block">YL</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-white text-base md:text-xl font-black">{post.metadata.author}</div>
                            <div className="text-slate-400 text-xs md:text-sm font-black uppercase tracking-widest">Author</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 relative">

                    {/* Left Column: Markdown Content */}
                    <article className="lg:col-span-8 xl:col-span-8 max-w-none">
                        <div
                            className="
                                prose prose-invert lg:prose-xl w-full max-w-none
                                prose-headings:font-display prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight
                                prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/10
                                prose-h3:text-3xl md:prose-h3:text-4xl prose-h3:mt-12
                                prose-p:text-slate-300 prose-p:leading-[1.8] prose-p:mb-8
                                prose-li:text-slate-300 prose-li:my-3 prose-li:leading-[1.8]
                                prose-strong:text-white prose-strong:font-black
                                prose-a:text-brand-cyan prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-white transition-colors
                                [&>*:first-child]:mt-0
                            "
                            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                        />
                    </article>

                    {/* Right Column: Sticky Sidebar Info / CTA */}
                    <aside className="lg:col-span-4 xl:col-span-4 hidden lg:block">
                        <div className="sticky top-32">

                            {/* Executive Summary Box */}
                            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md mb-8">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Executive Summary</h3>
                                <p className="text-slate-300 leading-[1.8] font-medium text-lg">
                                    {post.metadata.excerpt}
                                </p>
                            </div>

                            {/* Sticky CTA */}
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-cyan/10 to-transparent border border-brand-cyan/20 text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <h3 className="text-3xl font-black text-white mb-6 leading-tight font-display tracking-tight">Transform Your Operations</h3>
                                <p className="text-slate-400 mb-10 text-base leading-relaxed">
                                    Stuffnthings builds high-performance, conversion-engineered digital infrastructure tailored for enterprise-grade local dominance.
                                </p>
                                <Link href="/#contact" className="flex items-center justify-center w-full px-6 py-4 rounded-xl bg-white text-black font-black uppercase tracking-wider hover:bg-brand-cyan hover:scale-105 transition-all">
                                    Get Your Free Assessment
                                </Link>
                            </div>

                        </div>
                    </aside>

                </div>
            </div>

        </div>
    )
}
