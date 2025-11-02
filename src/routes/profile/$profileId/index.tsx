import { createFileRoute } from '@tanstack/react-router'

import { timeAgo } from '../../../tools/tools';

import { useEffect, useState } from 'react';

import { grabProfile } from '../../../api/profile';

export const Route = createFileRoute('/profile/$profileId/')({
    component: RouteComponent,
})

type ProfileType = {
    username: string,
    createdAt: string,
    profilePic: string,
    lastLogIn: string,
}

function RouteComponent() {

    const { profileId } = Route.useParams();
    const [profile, setProfile] = useState<ProfileType | null>(null);

    const authorProfile = async function(){
        const author = await grabProfile(profileId);
        setProfile(author);
    }

    useEffect(()=>{
        authorProfile();
    }, [profileId]);

    useEffect(()=>{
        console.log(profile)
    }, [profile])

    return (
        <>
            <div className='main margin-top-xl center'>
                <h1>Profile</h1>
                <div className='profile-page-img'>
                    <img src={profile?.profilePic || "blank_profile.jpg"} />
                </div>
                <p>Username: {profile?.username}</p>
                <p>User since: {timeAgo(profile?.createdAt || '')}</p>
                <p>Last login: {timeAgo(profile?.lastLogIn || '')}</p>
            </div>
        </>
    )
}
