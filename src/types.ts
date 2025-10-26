export type Post = {
    _id: string
    title: string
    content: string
    tags: string[]
    createdAt: string
    username: string
}

export type NewPost = {
    title: string
    content: string
    tags: string[]
}

export type User = {
    username: string
    email: string
    password: string
}