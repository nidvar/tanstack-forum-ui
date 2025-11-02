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
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    const [disableButton, setDisableButton] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const clearError = function(){
        setErrorMessage('')
    }

    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const tagsArray: string[] = [];
        if(title.trim() == '' || content.trim() == ''){
            return;
        }

        if(tags != ''){
            const arr = tags.split(',');
            arr.forEach((item)=>{
                tagsArray.push(item.trim())
            });
        };

        if(tagsArray.length > 5){
            setErrorMessage('too many tags');
            return
        };
        
        const formData = {
            title,
            content,
            tags: [...tagsArray]
        };
        await editPost(formData, postId);
        navigate({ to: '/' });
        setDisableButton(true);
    }

    const getPost = async function(){
        const post = await singlePost(postId);
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(','));
    }

    useEffect(()=>{
        setDisableButton(false);
        getPost();
    }, []);

    return (
        <>
            <div className='main margin-top-xl'>
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
                        onChange={function(e){setTitle(e.target.value); clearError();}}
                    />

                    <label
                        htmlFor='content'
                    >
                        Content
                    </label>
                    <textarea
                        id='content'
                        value={content}
                        onChange={function(e){setContent(e.target.value); clearError();}}
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
                        onChange={function(e){setTags(e.target.value); clearError();}}
                    />

                    <button className='button margin-top' disabled={disableButton}>EDIT</button>
                    <p className='error'>{errorMessage}</p>
                </form>
            </div>
        </>
    )
}
