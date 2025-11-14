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
    const [image, setImage] = useState('');

    const clearError = function(){
        setErrorMessage('')
    }

    const handleImageUpload = function(e: React.ChangeEvent<HTMLInputElement>){
        setErrorMessage('');
        if(e.target.files && e.target.files[0]){
            if(e.target.files[0].size > 1500000){
                setErrorMessage('Image size must be under 1.5MB');
                e.target.files = null;
                return;
            };
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = async ()=>{
                const base64Image = reader.result;
                if(typeof base64Image === 'string'){
                    setImage(base64Image);
                }
            }
        }
    }

    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log('submit')
        if(!authState.loggedIn){
            setErrorMessage('Please login to create new post');
            return
        };
        const tagsArray: string[] = [];

        if(title.trim() == '' || content.trim() == ''){
            setErrorMessage('Fields must not be empty');
            return;
        }
        if(tags != ''){
            const arr = tags.split(',');
            arr.forEach((item)=>{
                tagsArray.push(item.trim())
            });
        };

        if(tagsArray.length > 5){
            setErrorMessage('Too many tags');
            return;
        };

        const formData = {
            title,
            content,
            tags: [...tagsArray],
            img:{
                url: 'https://static.photos/blurred/640x360/' + Math.random() * 10,
                public_id: ''
            }
        };

        try{
            setDisable(true);
            await createNewPost(formData);
            navigate({ to: '/' });
        }catch(error){
            console.log('Error ==> ',error)
        }finally{
            setDisable(false);
            console.log('end')
        }

    }

    return (
        <>
            <div className='main'>
                <h2 className='center'>Create New Post</h2>
                <form className='new-post-form' onSubmit={handleSubmit}>
                    {
                        image !=''? <img 
                            src={image || undefined}
                            className='image-upload'
                        />: ''
                    }

                    <label
                        htmlFor='image'
                    >
                        Image (optional)
                    </label>
                    <input 
                        id='image'
                        className='image-upload-input'
                        type='file'
                        onChange={handleImageUpload}
                    />

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
