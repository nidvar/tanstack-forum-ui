import { Link } from '@tanstack/react-router';

import type {Post} from '../types';

const PostCard = function({post, link}: {post: Post, link: string}){
    return(
        <>
            <div className='post' key={post._id} >
                <div>
                    {
                        post.img?.url? <img src={post.img.url} alt={post.title} />: '📄'
                    }
                </div>
                <Link to={link}>
                    <p>
                        <span className='post-username black'>{post.username} -</span>
                        <span className='post-time'> {post.createdAt}</span>
                    </p>
                    <h3>{post.title}</h3>
                    <p>
                        {post.tags.length > 0? post.tags.map((item, index)=>{ return <span key={post._id + index} className='post-card-tags'>{item}</span> }):'' }
                    </p>
                </Link>
            </div>
        </>
    )
};

export default PostCard;