import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';

import { login } from '../../api/users';

export const Route = createFileRoute('/login/')({
    component: RouteComponent,
})

function RouteComponent() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [disable, setDisable] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = function () {
        setErrorMessage('');
    }

    const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setDisable(true);

        const userData = {
            password,
            email
        };

        try {
            login(userData);
        } catch (error) {
            console.log('login error ===>', error)
        } finally {
            setDisable(false);
        }

    };
    return (
        <>
            <div>
                <h1>Login</h1>
                <form className='new-post-form' onSubmit={handleSubmit}>
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
                    <button className='button margin-top' disabled={disable}>LOGIN</button>
                    <p className='error'>{errorMessage}</p>
                </form>
            </div>
        </>
    )
}
