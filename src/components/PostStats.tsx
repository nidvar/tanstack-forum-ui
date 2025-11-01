import { useState, useEffect } from 'react';

type PostStatsProps = {
    likeDislike: (choice: 'like' | 'dislike' | 'none') => void;
    likes: number
    dislikes: number
}

const PostStats = function ({likeDislike, likes, dislikes}: PostStatsProps) {

    const [hoverLike, setHoverLike] = useState(false);
    const [likeChoice, setLikeChoice] = useState(false);

    const [hoverDislike, setHoverDislike] = useState(false);
    const [dislikeChoice, setDislikeChoice] = useState(false);

    const chooseDislike = function () {
        const votedState = dislikeChoice;
        setDislikeChoice(!votedState);
        setHoverLike(false);
        setLikeChoice(false);
    }

    const chooseLike = function () {
        const votedState = likeChoice;
        setLikeChoice(!votedState);
        setHoverDislike(false);
        setDislikeChoice(false);
    };

    useEffect(()=>{
        if(likeChoice){
            likeDislike('like')
        }else if(dislikeChoice){
            likeDislike('dislike')
        }else{
            likeDislike('none');
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