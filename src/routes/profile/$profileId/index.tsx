import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';


import { grabProfile } from '../../../api/profile';
import { timeAgo } from '../../../tools/tools';
import { logout } from '../../../api/auth';
import { useAuth } from '../../../store/authContext';

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

    const authState = useAuth();

    const { profileId } = Route.useParams();
    const [profile, setProfile] = useState<ProfileType | null>(null);

    const authorProfile = async function(){
        const author = await grabProfile(profileId);
        setProfile(author);
    }

    const navigate = useNavigate();

    const logoutFn = async function(){
        const result = await logout();

        if(result.message && result.message == 'logged out'){
            authState.setLoggedIn(false);
            navigate({ to: '/logout' });
        }
    }

    useEffect(()=>{
        authorProfile();
    }, [profileId]);

    return (
        <>
            <div className='main margin-top-xl center'>
                <h1>{profile?.username}</h1>
                <div className='profile-page-img'>
                    <img src={profile?.profilePic || "blank_profile.jpg"} />
                </div>
                <p>Username: {profile?.username}</p>
                <p>User since: {timeAgo(profile?.createdAt || '')}</p>
                <p>Last login: {timeAgo(profile?.lastLogIn || '')}</p>
                <button className='button margin-top-xl' onClick={logoutFn}>LOGOUT</button>
            </div>
        </>
    )
}
