import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { VideoFile } from '../../pages/video';
import axios from 'axios';
import styles from './VideoPlayer.module.css';

type Props = {
    id: number
    src: string
    userName: string
    userLink: string
    image: string
}

const TinyVideoPlayer = ({ userName, userLink, id, image }: Props) => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [videoData, setVideoData] = useState<VideoFile>({
        id: 0,
        link: '',
        file_type: '',
        width: 0,
    });

    const handlePlayVideo = () => {
        if (!isPlaying) {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    };

    const handlePauseVideo = () => {
        if (isPlaying) {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    };

    const getVideoData = () => {
        if (videoData.link === '') {
            setLoading(true)
            axios(`/api/get-video/${id}`)
            .then((res) => {
                setVideoData(res.data)
            })
        }
    }

    return (
        <div 
            className={styles.tinyVideoPlayerContainer}
            // style={{ width: 640, height: 360 }}
            style={{ width: '100%', height: 360 }}
            id='player'
            onMouseEnter={() => {
                getVideoData();
                handlePlayVideo();
            }}
            onMouseLeave={handlePauseVideo}
        >   
            <div
                className={styles.providerContainer}
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
            {
                !!videoData.link ?
                <video
                    className={styles.video}
                    ref={videoRef}
                    onCanPlay={() => {
                        setLoading(false);
                    }}
                    muted
                    loop
                    playsInline
                    autoPlay={isPlaying}
                >
                    <source
                        src={videoData.link}
                        type={videoData.file_type}
                    >
                    </source>
                </video>
                :
                <Image
                    className={styles.video}
                    src={image}
                    alt="error image"
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                    priority
                />
            }
            {
                loading &&
                <Image
                    className={styles.video}
                    src={image}
                    alt="error image"
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                    priority
                />
            }
        </div>
    );
}

export default TinyVideoPlayer;