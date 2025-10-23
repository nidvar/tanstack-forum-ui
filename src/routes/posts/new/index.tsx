import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useState } from 'react';

import {createNewPost} from '../../../api/posts'

export const Route = createFileRoute('/posts/new/')({
    head: ()=> ({
        meta: [{title: 'Jarro - Forum'},]
    }), 
    component: NewPostPage,
})

function NewPostPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

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
        createNewPost(formData);
        navigate({ to: '/posts' });
    }

    return (
        <>
            <div className='main'>
                <h1>Create New Post</h1>
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

                    <button className='button margin-top'>CREATE</button>
                </form>
            </div>
        </>
    )
}
