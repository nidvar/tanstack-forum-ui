import { Link } from '@tanstack/react-router';

import type {Post} from '../types';
import { timeAgo } from '../tools/tools';

const PostCard = function({post, link}: {post: Post, link: string}){
    return(
        <>
            <Link to={link} key={post._id} className='post'>
                <div className='post-card-img-thumbnail'>
                    {
                        post.img?.url? 
                        <img src={post.img.url} alt={post.title} className='postcard-img'/>: 
                        <div className='post-card-img-placeholder'>📄</div>
                    }
                </div>
                <div>
                    <p>
                        <span className='post-username black'>{post.author.username} -</span>
                        <span className='post-time'> {post.createdAt? timeAgo(post.createdAt): ''}</span>
                    </p>
                    <h3>{post.title}</h3>
                    <p>
                        {post.tags?.length > 0? post.tags.map((item, index)=>{ return <span key={post._id + index} className='post-card-tags'>{item}</span> }):'' }
                    </p>
                </div>
            </Link>
        </>
    )
};

export default PostCard;