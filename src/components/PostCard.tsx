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
                        <img 
                            src={post.img.url} 
                            alt={post.title} 
                            className='postcard-img'
                        />: 
                        <div className='post-card-img-placeholder'>📄</div>
                    }
                </div>
                <div>
                    <p>
                        <span className='post-username black'>
                            {post.author.username} - {post.junk?.creator? post.junk?.creator + '-': ''} 
                        </span>
                        <span className='post-time'> {post.createdAt? timeAgo(post.createdAt): ''}</span>
                    </p>
                    <h4>{post.title}</h4>
                    <div className='tags-container'>
                        {post.tags?.length > 0? post.tags.map((item, index)=>{ return <span key={post._id + index} className='post-card-tags'>{item}</span> }):'' }
                    </div>
                </div>
            </Link>
        </>
    )
};

export default PostCard;