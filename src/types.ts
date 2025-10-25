export type Post = {
    _id: string
    title: string
    content: string
    tags: string[]
    createdAt: string
    user: string
}

export type NewPost = {
    title: string
    content: string
    tags: string[]
}