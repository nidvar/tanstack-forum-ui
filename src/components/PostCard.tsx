import { Link } from '@tanstack/react-router';

import type {Post} from '../types';

const PostCard = function({post, link}: {post: Post, link: string}){
    return(
        <>
            <div className='post' key={post.id}>
                <Link to={link}>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <p className='blue'>Read more {"->"}</p>
                </Link>
            </div>
        </>
    )
};

export default PostCard;