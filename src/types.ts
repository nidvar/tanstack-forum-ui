export type Comment = {
    postId: string
    comment: string
    username: string
    profilePic: string
    _id?: string
}

export type Post = {
    _id: string
    title: string
    content: string
    author: {
        username: string
        email: string
        profilePic: string
    }
    img?: {
        url?: string;
        public_id?: string;
    };
    comments: Comment[]
    likes: string[]
    dislikes: string[]
    tags: string[]
    createdAt: string
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