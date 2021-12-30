export interface ArticleData {
  markdownRemark: MarkdownRemark
}

export interface MarkdownRemark {
  html: string
  excerpt: string
  timeToRead: number
  frontmatter: Frontmatter
}

export interface Frontmatter {
  title: string
  tags: string[]
  date: string
}
