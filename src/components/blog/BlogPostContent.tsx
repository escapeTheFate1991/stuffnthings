'use client'

import { motion } from 'framer-motion'

interface BlogPostContentProps {
  content: string
  accentColor: string
}

export function BlogPostContent({ content, accentColor }: BlogPostContentProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg md:prose-xl prose-invert max-w-none"
          style={{
            // Custom CSS variables for dynamic accent colors
            '--accent-color': accentColor
          }}
        >
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </motion.article>
      </div>

      <style jsx global>{`
        .blog-content {
          /* Typography */
          font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.8;
          color: #e2e8f0;
        }

        .blog-content h1, 
        .blog-content h2, 
        .blog-content h3, 
        .blog-content h4, 
        .blog-content h5, 
        .blog-content h6 {
          font-family: 'EB Garamond', serif;
          color: #ffffff;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .blog-content h1 {
          font-size: 2.5rem;
          margin-top: 3rem;
        }

        .blog-content h2 {
          font-size: 2rem;
          margin-top: 3rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .blog-content h3 {
          font-size: 1.625rem;
          margin-top: 2.5rem;
        }

        .blog-content h4 {
          font-size: 1.375rem;
          color: var(--accent-color);
          margin-top: 2rem;
        }

        .blog-content h5, 
        .blog-content h6 {
          font-size: 1.125rem;
          margin-top: 1.5rem;
        }

        /* Paragraphs */
        .blog-content p {
          margin-bottom: 1.75rem;
          color: #cbd5e1;
          font-size: 1.125rem;
        }

        /* First paragraph after heading - larger */
        .blog-content h2 + p,
        .blog-content h3 + p {
          font-size: 1.25rem;
          color: #e2e8f0;
          margin-bottom: 2rem;
        }

        /* Links */
        .blog-content a {
          color: var(--accent-color);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .blog-content a:hover {
          border-bottom-color: var(--accent-color);
          opacity: 0.8;
        }

        /* Lists */
        .blog-content ul, 
        .blog-content ol {
          margin: 1.75rem 0;
          padding-left: 2rem;
        }

        .blog-content li {
          margin-bottom: 0.75rem;
          color: #cbd5e1;
          font-size: 1.125rem;
          line-height: 1.7;
        }

        .blog-content li::marker {
          color: var(--accent-color);
        }

        /* Blockquotes */
        .blog-content blockquote {
          margin: 2.5rem 0;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.02);
          border-left: 4px solid var(--accent-color);
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          font-size: 1.25rem;
          color: #e2e8f0;
        }

        .blog-content blockquote p {
          margin-bottom: 0;
        }

        /* Code blocks */
        .blog-content pre {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 0.75rem;
          overflow-x: auto;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .blog-content code {
          background: rgba(255, 255, 255, 0.06);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.875rem;
          color: var(--accent-color);
        }

        .blog-content pre code {
          background: transparent;
          padding: 0;
          color: #e2e8f0;
        }

        /* Images */
        .blog-content img {
          margin: 2.5rem 0;
          border-radius: 0.75rem;
          width: 100%;
          height: auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        /* Tables */
        .blog-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 0.75rem;
          overflow: hidden;
          font-size: 1rem;
        }

        .blog-content th,
        .blog-content td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .blog-content th {
          background: rgba(255, 255, 255, 0.04);
          font-weight: 600;
          color: #ffffff;
          font-family: 'EB Garamond', serif;
        }

        .blog-content td {
          color: #cbd5e1;
        }

        /* Horizontal rules */
        .blog-content hr {
          margin: 3rem 0;
          border: none;
          height: 1px;
          background: linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.1), 
            transparent
          );
        }

        /* Strong/bold text */
        .blog-content strong,
        .blog-content b {
          color: #ffffff;
          font-weight: 600;
        }

        /* Emphasis/italic text */
        .blog-content em,
        .blog-content i {
          color: var(--accent-color);
          font-style: italic;
        }

        /* Custom callout boxes (if using specific classes) */
        .blog-content .callout {
          margin: 2rem 0;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 0.75rem;
          position: relative;
        }

        .blog-content .callout.info {
          border-left-color: #22d3ee;
          border-left-width: 4px;
        }

        .blog-content .callout.warning {
          border-left-color: #f59e0b;
          border-left-width: 4px;
        }

        .blog-content .callout.error {
          border-left-color: #ef4444;
          border-left-width: 4px;
        }

        .blog-content .callout.success {
          border-left-color: #22c55e;
          border-left-width: 4px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
          }

          .blog-content h1 {
            font-size: 2rem;
          }

          .blog-content h2 {
            font-size: 1.75rem;
          }

          .blog-content h3 {
            font-size: 1.5rem;
          }

          .blog-content p {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .blog-content h2 + p,
          .blog-content h3 + p {
            font-size: 1.125rem;
          }

          .blog-content ul, 
          .blog-content ol {
            padding-left: 1.5rem;
          }

          .blog-content li {
            font-size: 1rem;
          }

          .blog-content blockquote {
            padding: 1rem 1.5rem;
            font-size: 1.125rem;
            margin: 2rem 0;
          }

          .blog-content pre {
            padding: 1rem;
            margin: 1.5rem 0;
            font-size: 0.8125rem;
          }
        }

        /* Print styles */
        @media print {
          .blog-content {
            color: #000 !important;
          }

          .blog-content h1, 
          .blog-content h2, 
          .blog-content h3, 
          .blog-content h4, 
          .blog-content h5, 
          .blog-content h6 {
            color: #000 !important;
          }
        }
      `}</style>
    </section>
  )
}