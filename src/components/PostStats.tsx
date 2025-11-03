import { useState, useEffect } from 'react';

import {likeOrDislikeAPI} from '../api/posts';

type PostStatsProps = {
    likeDislike: (choice: 'like' | 'dislike' | 'none') => void;
    likes: number
    dislikes: number
    id: string
    email: string
}

const PostStats = function ({likes, dislikes, id, email}: PostStatsProps) {

    const [hoverLike, setHoverLike] = useState(false);
    const [likeChoice, setLikeChoice] = useState(false);

    const [hoverDislike, setHoverDislike] = useState(false);
    const [dislikeChoice, setDislikeChoice] = useState(false);

    const likeOrDislike = function(like: string, id: string, email: string){
        return
        likeOrDislikeAPI(like, id, email);
    }

    const chooseDislike = function () {
        const votedState = dislikeChoice;
        setDislikeChoice(!votedState);
        setHoverLike(false);
        setLikeChoice(false);

        likeOrDislike('dislike', id, email)
    }

    const chooseLike = function () {
        const votedState = likeChoice;
        setLikeChoice(!votedState);
        setHoverDislike(false);
        setDislikeChoice(false);

        likeOrDislike('like', id, email)
    };

    useEffect(()=>{
        if(!likeChoice && !dislikeChoice && email){
            likeOrDislike('none', id, email)
        }
    }, [likeChoice, dislikeChoice]);


    return (
        <>
            <div className='post-stats'>
                {
                    likeChoice === false ? (
                        <div
                            onMouseEnter={function () { setHoverLike(true) }}
                            onMouseLeave={function () { setHoverLike(false) }}
                        >
                            {
                                hoverLike === true ?
                                    <img onClick={function () { chooseLike() }} className='icon' src="/liked.ico" /> :
                                    <img onClick={function () { chooseLike() }} className='icon' src="/like.ico" />
                            }
                        </div>
                    ) :
                        <img onClick={function () { chooseLike() }} className='icon' src="/liked.ico" />
                }{likes}

                {
                    dislikeChoice === false ? (
                        <div
                            onMouseEnter={function () { setHoverDislike(true) }}
                            onMouseLeave={function () { setHoverDislike(false) }}
                        >
                            {
                                hoverDislike === true ?
                                    <img onClick={function () { chooseDislike() }} className='icon' src="/disliked.ico" /> :
                                    <img onClick={function () { chooseDislike() }} className='icon' src="/dislike.ico" />
                            }
                        </div>
                    ) :
                        <img onClick={function () { chooseDislike() }} className='icon' src="/disliked.ico" />
                }{dislikes}

                <div>
                    <img className='icon' src="/comments.ico" />
                </div>
            </div>
        </>
    )
};

export default PostStats;