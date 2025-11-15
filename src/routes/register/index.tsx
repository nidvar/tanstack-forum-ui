import { createFileRoute, Link } from '@tanstack/react-router';

import { useState } from 'react';

import { registerUser } from '../../api/auth';

export const Route = createFileRoute('/register/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const [disable, setDisable] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [complete, setComplete] = useState(false);
    const [profilePic, setProfilePic] = useState('');

    const [registrating, setRegistrating] = useState(false);

    const handleChange = function () {
        setErrorMessage('');
    }

    const handleProfileUpload = function(e: React.ChangeEvent<HTMLInputElement>){
        setErrorMessage('');
        if(e.target.files && e.target.files[0]){
            if(e.target.files[0].size > 1500000){
                setErrorMessage('Image must be under 1.5MB');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = async ()=>{
                const base64Image = reader.result;
                if(typeof base64Image === 'string'){
                    setProfilePic(base64Image);
                }
            }
        };
    }

    const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setRegistrating(true);
        if (password != confirmPassword) {
            setErrorMessage('Passwords do not match');
            return
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return
        }

        setDisable(true);

        const newUser = {
            username,
            password,
            email,
            profilePic
        };

        try {
            const res = await registerUser(newUser);
            if(res && res.message ==='User registered successfully'){
                setComplete(true);
                setRegistrating(false);
            }else{
                setErrorMessage(res.error)
                throw new Error(res);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setDisable(false);
        }
    };

    return (
        <>
            <div className='main margin-top-xl'>
                <h1>Register</h1>
                {
                    registrating===false?
                    <div>
                        {!complete ?
                            <form className='new-post-form' onSubmit={handleSubmit}>

                                <img 
                                    src={profilePic || "blank_profile.jpg"}
                                    className='profile-image-upload'
                                />

                                <label
                                    htmlFor='profile-image'
                                >
                                    Profile picture (optional)
                                </label>
                                <input 
                                    className='image-upload-input'
                                    id='profile-image'
                                    type='file'
                                    onChange={handleProfileUpload}
                                />

                                <label
                                    htmlFor='username'
                                >
                                    Username
                                </label>
                                <input
                                    id='username'
                                    type='text'
                                    value={username}
                                    onChange={function (e) { setUsername(e.target.value), handleChange() }}
                                />

                                <label
                                    htmlFor='email'
                                >
                                    Email
                                </label>
                                <input
                                    id='email'
                                    type='email'
                                    value={email}
                                    onChange={function (e) { setEmail(e.target.value), handleChange() }}
                                />

                                <label
                                    htmlFor='password'
                                >
                                    Password
                                </label>
                                <input
                                    id='password'
                                    type='password'
                                    value={password}
                                    onChange={function (e) { setPassword(e.target.value), handleChange() }}
                                />

                                <label
                                    htmlFor='confirm-password'
                                >
                                    Confirm password
                                </label>
                                <input
                                    id='confirm-password'
                                    type='password'
                                    value={confirmPassword}
                                    onChange={function (e) { setConfirmPassword(e.target.value), handleChange() }}
                                />

                                <button className='button margin-top' disabled={disable}>REGISTER</button>
                                <p className='error'>{errorMessage}</p>
                            </form>
                            :
                            <div className='center'>
                                <p>Registration complete</p>
                                <Link to='/login' className='blue underline'>Go to Login page</Link>
                            </div>
                        }
                    </div>:
                    <div className='center margin-top-xl'>
                        <h2 className='center margin-top-xl'>Creating new account....</h2>
                        <p className='center margin-top-xl'>Free server is slow...</p>
                    </div>
                }
            </div>
        </>
    )
}
