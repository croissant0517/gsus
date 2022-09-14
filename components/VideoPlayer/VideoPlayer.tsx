import React, { useEffect, useRef, useState, Key } from 'react';
import {
    Dropdown,
    Loading
} from '@nextui-org/react';
import { IoPlay, IoPause } from 'react-icons/io5'
import { 
    BsFillVolumeMuteFill,
    BsFillVolumeDownFill,
    BsFillVolumeUpFill,
} from 'react-icons/bs';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi'
import styles from './VideoPlayer.module.css';

interface playerPropsType {
    src: string
    type: string
}

const VideoPlayer = ({ src, type }: playerPropsType) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const initialVolume = Number(localStorage.getItem('videoPlayVolume')) ?? 0.5 ;
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(initialVolume);
    const [playSpeed, setPlaySpeed] = useState<number>(1);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handlePlayPauseVideo = () => {
        if (isPlaying) {
            videoRef.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleCurrentTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!!videoRef.current) {
            videoRef.current.currentTime = Number(event.currentTarget.value);
            setCurrentTime(Number(event.currentTarget.value));
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(event.currentTarget.value));
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPlaySpeed(Number(event.target.value))
    };

    const handleClickVolumeIcon = () => {
        if (volume !== 0) {
            setVolume(0);
        } else {
            const cacheVolume = Number(localStorage.getItem('videoPlayVolume'));
            setVolume(cacheVolume);
        }
    };

    const toggleFullscreen = () => {
        const forkDocument = document.documentElement as HTMLElement & {
            webkitRequestFullscreen(): Promise<void>;
            webkitExitFullscreen(): Promise<void>;
        };
        const elem = document.getElementById('player') as HTMLElement & {
            webkitRequestFullscreen(): Promise<void>;
        };
        function openFullscreen() {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            }
        };
          
        /* Close fullscreen */
        function closeFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (forkDocument.webkitExitFullscreen) { /* Safari */
                forkDocument.webkitExitFullscreen();
            }
        };
        
        if (document.fullscreenElement) {
            closeFullscreen();
        } else {
            openFullscreen();
        }
    };

    const displayTime = (time: number) => {
        const minutes: number = Math.floor(time/60);
        let seconds: number | string = Math.floor(time%60);
        seconds = seconds > 9 ? seconds : `0${seconds}`;
        return `${minutes}:${seconds}`;
    };

    const displayVolumeIcon = () => {
        if (volume > 0.5) {
            return <BsFillVolumeUpFill />
        } else if (volume <= 0.5 && volume > 0) {
            return <BsFillVolumeDownFill/>
        } else if (volume === 0) {
            return <BsFillVolumeMuteFill/>
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
        if (volume > 0) {
            localStorage.setItem('videoPlayVolume', JSON.stringify(volume));
        }
    }, [volume]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playSpeed;
        }
    }, [playSpeed]);

    useEffect(() => {
        const fullscreenListener = () => {
            if (document.fullscreenElement) {
                setFullscreen(true);
            } else {
                setFullscreen(false);
            }
        };
        window.addEventListener("fullscreenchange", fullscreenListener);
        return () => {
            window.removeEventListener("fullscreenchange", fullscreenListener);
        };
    }, []);

    return (
        <div 
            className={styles.videoPlayerContainer}
            id='player'
        >
            <video
                className={styles.video}
                ref={videoRef}
                onEnded={handleEnded}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlay={() => {
                    setLoading(false);
                }}
                src={src}               
                playsInline
            >
                <source
                    src={src}
                    type={type}
                >
                </source>
            </video>
                <div className={styles.showControler}>
                    {   loading ?
                        <Loading className={styles.loading}/>
                        :
                        <React.Fragment>
                            <div
                                className={isPlaying ? styles.centerPlayPauseButtonActive : styles.centerPlayPauseButton}
                                onMouseDown={handlePlayPauseVideo}
                            >
                                <IoPlay/>
                            </div>
                            <div
                                className={!isPlaying ? styles.centerPlayPauseButtonActive : styles.centerPlayPauseButton}
                                onMouseDown={handlePlayPauseVideo}
                            >
                                <IoPause/>
                            </div>
                        </React.Fragment>
                    }
                        {/* custom UI */}
                        <div className={styles.controlerContainer} style={{ bottom: fullscreen ? '0px' : '5px' }}>
                            {/* progress */}                    
                            <input
                                name='currentTime'
                                className={styles.progressRange}
                                style={{ backgroundSize: `${100*currentTime/duration}%` }}
                                type={'range'}
                                value={currentTime}
                                max={duration}
                                step={0.01}
                                onChange={handleCurrentTimeChange}
                            ></input>

                            {/* controler UI */}
                            <div className={styles.controlers}>
                                {/* left side UI */}
                                <div className={styles.leftControler}>
                                    {/* play pause */}
                                    {
                                        isPlaying ?
                                        <IoPause
                                            className={styles.playPauseButton}
                                            onClick={handlePlayPauseVideo}
                                        />
                                        :
                                        <IoPlay
                                            className={styles.playPauseButton}
                                            onClick={handlePlayPauseVideo}
                                        />
                                    }
                                    {/* volume icon */}
                                    <div
                                        className={styles.volumeIcon}
                                        onClick={handleClickVolumeIcon}
                                    >
                                        {displayVolumeIcon()}
                                    </div>
                                    {/* volume input */}
                                    <input
                                        className={styles.volune}
                                        style={{ backgroundSize: `${volume*100}%` }}
                                        name='volume'
                                        type='range'
                                        value={volume}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        onChange={handleVolumeChange}
                                    >
                                    </input>
                                </div>
                                {/* right side UI */}
                                <div className={styles.rightControler}>
                                    <div className={styles.time}>
                                        {displayTime(currentTime)} / {displayTime(duration)}
                                    </div>
                                    {/* speed */}
                                    <div className={styles.speed}>
                                        <select
                                            className={styles.speedSelect}
                                            value={playSpeed}
                                            onChange={handleSpeedChange}
                                        >
                                            <option value="0.5">0.5 x</option>
                                            <option value="0.75">0.75 x</option>
                                            <option value="1" >1.0 x</option>
                                            <option value="1.5">1.5 x</option>
                                            <option value="2">2.0 x</option>
                                        </select>
                                    </div>
                                    {/* fullscreen icon */}
                                    <div 
                                        className={styles.fullscreenIcon}
                                        onClick={toggleFullscreen}
                                    >
                                        {fullscreen ? <BiExitFullscreen/> : <BiFullscreen/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
        </div>
    );
}

export default VideoPlayer;