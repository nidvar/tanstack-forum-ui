import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useState } from 'react';

import {createNewPost} from '../../../api/posts';

import { useAuth } from '@/store/authContext';

export const Route = createFileRoute('/posts/new/')({
    head: ()=> ({
        meta: [{title: 'Jarro - Forum'},]
    }), 
    component: NewPostPage,
})

function NewPostPage() {

    const authState = useAuth();

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    const [disable, setDisable] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const clearError = function(){
        setErrorMessage('')
    }

    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!authState.loggedIn){
            setErrorMessage('Please login to create new post');
            return
        };
        setDisable(true);
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

        console.log(formData);

        try{
            await createNewPost(formData);
            navigate({ to: '/' });
        }catch(error){
            console.log('Error ==> ',error)
        }finally{
            setDisable(false)
        }

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
                        placeholder='comma separated, maximum 5'
                        id='tags'
                        type='text'
                        value={tags}
                        onChange={function(e){setTags(e.target.value); clearError();}}
                    />

                    <button className='button margin-top' disabled={disable}>CREATE</button>

                    <p className='error'>{errorMessage}</p>
                </form>
            </div>
        </>
    )
}
