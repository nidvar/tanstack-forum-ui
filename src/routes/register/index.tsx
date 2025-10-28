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

    const handleChange = function () {
        setErrorMessage('');
    }

    const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
            email
        };

        try {
            registerUser(newUser);
            setComplete(true);
        } catch (error) {
            console.log('register new user error ===>', error)
        } finally {
            setDisable(false);
        }

    };

    return (
        <>
            <h1>Register</h1>
            {!complete ?
                <form className='new-post-form' onSubmit={handleSubmit}>
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
        </>
    )
}
