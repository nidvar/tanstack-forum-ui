import { createFileRoute } from '@tanstack/react-router'

import { useAuth } from '../../../store/authContext';

import { useEffect } from 'react';

import { grabProfile } from '../../../api/profile';

export const Route = createFileRoute('/profile/$profileId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { profileId } = Route.useParams();

    const authState = useAuth();

    useEffect(()=>{
        console.log(authState);
        grabProfile(profileId);
    }, []);

    return (
        <>
            <div className='main margin-top-xl'>
                <h1>Profile</h1>
                <img src={authState.userData.profilePic || "blank_profile.jpg"} />
                <p>username: {profileId}</p>
            </div>
        </>
    )
}
