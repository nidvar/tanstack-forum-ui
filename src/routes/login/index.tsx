import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { useState } from 'react';

import { login } from '../../api/auth';

import { useAuth } from '../../store/authContext';

export const Route = createFileRoute('/login/')({
    component: RouteComponent,
})

function RouteComponent() {

    const authState = useAuth();

    const navigate = useNavigate();

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
            const result = await login(userData);

            if(result.error){
                setErrorMessage(result.error);
            }else{
                authState.setLoggedIn(true);
                console.log(result)
                navigate({ to: '/' });
            }
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
                    <Link to='/register' className='blue underline center'>Create new account</Link>
                    <p className='error'>{errorMessage}</p>
                </form>
            </div>
        </>
    )
}
