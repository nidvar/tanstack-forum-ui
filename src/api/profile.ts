import axiosAPI from '../lib/axios';

export const grabProfile = async function(username: string){
    const res = await axiosAPI.get('profile/' + username);
    return res.data;
}