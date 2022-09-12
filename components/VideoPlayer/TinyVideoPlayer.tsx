import React, { useEffect, useRef, useState, Key } from 'react';
import { useRouter } from 'next/router';
import {
    Dropdown,
    Loading
} from '@nextui-org/react';
import { IoPlay, IoPause } from 'react-icons/io5'
import styles from './VideoPlayer.module.css';

interface playerPropsType {
    id: number
    src: string
    userName: string
    userLink: string
}

const TinyVideoPlayer = ({ src, userName, userLink, id }: playerPropsType) => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const handlePlayPauseVideo = () => {
        if (isPlaying) {
            videoRef.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    };

    return (
        <div 
            className={styles.tinyVideoPlayerContainer}
            id='player'
        >
            <video
                className={styles.video}
                ref={videoRef}
                onCanPlay={() => {
                    setLoading(false);
                }}
                muted
                loop
                src={src}            
                playsInline
            >
            </video>
            <div className={styles.showControler}>
                {   loading ?
                    <Loading className={styles.loading}/>
                    :
                    <React.Fragment>
                        <div
                            className={styles.providerContainer}
                            onMouseEnter={handlePlayPauseVideo}
                            onMouseLeave={handlePlayPauseVideo}
                            onClick={(event) => {
                                if (event.target === event.currentTarget) {
                                    router.push(`/video/${id}`)
                                }
                            }}
                        >
                            Video courtesy of
                            <a 
                                className={styles.providerLink} 
                                href={userLink} 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                {userName}
                            </a>
                            in Pexels
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    );
}

export default TinyVideoPlayer;