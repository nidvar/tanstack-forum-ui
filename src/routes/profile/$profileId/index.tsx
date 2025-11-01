import { createFileRoute } from '@tanstack/react-router'

import { useAuth } from '../../../store/authContext';

import { useState, useEffect } from 'react';

export const Route = createFileRoute('/profile/$profileId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { profileId } = Route.useParams();

    const authState = useAuth();

    useEffect(()=>{
        console.log(authState);
    }, []);

    return (
        <>
            <div className='main margin-top-xl'>
                <h1>Profile - {profileId }</h1>
            </div>
        </>
    )
}
