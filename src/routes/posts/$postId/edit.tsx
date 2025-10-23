import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import {editPost, singlePost} from '../../../api/posts'


export const Route = createFileRoute('/posts/$postId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();

    const { postId } = Route.useParams();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        return;
        const tagsArray: string[] = [];
        if(title.trim() == '' || summary.trim() == '' || content.trim() == ''){
            return;
        }
        if(tags != ''){
            const arr = tags.split(',');
            arr.forEach((item)=>{
                tagsArray.push(item)
            });
        }
        const formData = {
            title,
            summary,
            description: content,
            tags: [...tagsArray]
        };
        editPost(formData);
        navigate({ to: '/posts' });
    }

    const getPost = async function(){
        const post = await singlePost(postId);
        setTitle(post.title);
        setSummary(post.summary);
        setContent(post.description);
        setTags(post.tags.join(','));
    }

    useEffect(()=>{
        getPost();
    }, []);

    return (
        <>
            <div className='main post-details'>
                <Link to='/posts/$postId' params={{ postId: postId }} className='blue underline'>{'<-'} Back to post</Link>
                <h1>Edit Post</h1>
                <form className='new-post-form' onSubmit={handleSubmit}>
                    <label
                        htmlFor='title'
                    >
                        Title
                    </label>
                    <input
                        id='title'
                        type='text'
                        value={title}
                        onChange={function(e){setTitle(e.target.value)}}
                    />

                    <label
                        htmlFor='summary'
                    >
                        Summary
                    </label>
                    <input
                        id='summary'
                        type='text'
                        value={summary}
                        onChange={function(e){setSummary(e.target.value)}}
                    />

                    <label
                        htmlFor='content'
                    >
                        Content
                    </label>
                    <textarea
                        id='content'
                        value={content}
                        onChange={function(e){setContent(e.target.value)}}
                    ></textarea>

                    <label
                        htmlFor='tags'
                    >
                        Tags (optional)
                    </label>
                    <input
                        placeholder='comma separated'
                        id='tags'
                        type='text'
                        value={tags}
                        onChange={function(e){setTags(e.target.value)}}
                    />

                    <button className='button margin-top'>EDIT</button>
                </form>
            </div>
        </>
    )
}
