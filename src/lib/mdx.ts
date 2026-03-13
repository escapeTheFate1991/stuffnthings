import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export type BlogPostMetadata = {
    slug: string
    title: string
    excerpt: string
    date: string
    author: string
    image: string
    tag: string
    gradient: string
    accentColor: string
}

export type BlogPost = {
    metadata: BlogPostMetadata
    contentHtml: string
}

// Ensure the directory exists
function ensureDirectory() {
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true })
    }
}

export function getSortedPostsData(): BlogPostMetadata[] {
    ensureDirectory()
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents)

            return {
                slug,
                ...(matterResult.data as Omit<BlogPostMetadata, 'slug'>),
            }
        })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export async function getPostData(slug: string): Promise<BlogPost> {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(gfm)
        .use(html, { sanitize: false })
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
        metadata: {
            slug,
            ...(matterResult.data as Omit<BlogPostMetadata, 'slug'>),
        },
        contentHtml,
    }
}

export function getAllPostSlugs() {
    ensureDirectory()
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => fileName.replace(/\.md$/, ''))
}
