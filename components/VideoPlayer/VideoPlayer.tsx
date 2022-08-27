import React, { useEffect, useRef, useState, Key } from 'react';
import {
    Progress,
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

const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.5);
    const [isMouseDownProgress, setIsMouseDownProgress] = useState<boolean>(false);
    const [playSpeed, setPlaySpeed] = useState<number>(1);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
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

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current?.currentTime);
        }
    };

    const handleVolumeChange = () => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current?.duration);
        }
    };

    const displayTime = (time: number) => {
        const minutes: number = Math.floor(time/60);
        let seconds: number | string = Math.floor(time%60);
        seconds = seconds > 9 ? seconds : `0${seconds}`;
        return `${minutes}:${seconds}`;
    };

    const setProgress = (e: React.MouseEvent<HTMLElement>) => {
        const newTime = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
        const newCurrentTime = newTime * duration;
        if (videoRef.current) {
            videoRef.current.currentTime = newCurrentTime;
        }
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
            webkitExitFullscreen(): Promise<void>;
        };
        const elem: any = document.getElementById('player');
        function openFullscreen() {
            if (elem?.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem?.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            }
        }
          
        /* Close fullscreen */
        function closeFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (forkDocument.webkitExitFullscreen) { /* Safari */
                forkDocument.webkitExitFullscreen();
            }
        }
        
        if (!fullscreen) {
            openFullscreen();
        } else {
            closeFullscreen();
        }
        setFullscreen(!fullscreen);
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playSpeed;
        }
    }, [playSpeed]);

    useEffect(() => {
        console.log(videoRef);
        const cacheVolume = Number(localStorage.getItem('videoPlayVolume'));
        setVolume(cacheVolume);
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
                onVolumeChange={handleVolumeChange}
                onCanPlay={() => {
                    setLoading(false);
                }}
                src='https://www.pexels.com/zh-tw/video/3007578/download/?h=1080&w=1920'
                // autoPlay
                // loop
                // controls                
                playsInline
            >
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
                        {/* 下方控制區 */}
                        <div className={styles.controlerContainer}>
                            {/* 進度條 */}                    
                            {/* <div 
                                className={styles.progressRange}
                                onClick={setProgress}
                                // 滑鼠拖拉進度條
                                onMouseDown={(e) => {
                                    // console.log(e);
                                    setIsMouseDownProgress(true);
                                    const newTime = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
                                    const newCurrentTime = newTime * duration;
                                    if (videoRef.current) {
                                        // setIsPlaying(false);
                                        setCurrentTime(newCurrentTime);
                                        // videoRef.current.currentTime = newCurrentTime;
                                    }
                                }}
                                onMouseUp={() => {
                                    setIsMouseDownProgress(false);
                                }}
                                onMouseMove={(e) => {
                                    // console.log(e);
                                    const newTime = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
                                    const newCurrentTime = newTime * duration;
                                    // console.log(newCurrentTime);
                                    if (isMouseDownProgress) {
                                        setCurrentTime(newCurrentTime);
                                    }
                                }}
                            >                           
                                <div 
                                    className={styles.progressBar}
                                    style={{ width: `${(currentTime/duration) * 100}%` }}
                                >                        
                                </div>
                            </div> */}
                            {/* <Progress
                                className={styles.progressRange}
                                size='sm'
                                color='primary'
                                value={currentTime}
                                max={duration}
                                onClick={setProgress}
                                animated={false}
                            /> */}

                            <input
                                name='currentTime'
                                className={styles.progressRange}
                                style={{ width: '100%' }}
                                type={'range'}
                                value={currentTime}
                                max={duration}
                                step={0.01}
                                onChange={(e) => {
                                    if (!!videoRef.current) {
                                        videoRef.current.currentTime = Number(e.currentTarget.value);
                                        setCurrentTime(Number(e.currentTarget.value));
                                    }
                                }}
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
                                        name='volume'
                                        type='range'
                                        value={volume}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        onChange={(e) => {
                                            if (videoRef.current) {
                                                setVolume(Number(e.currentTarget.value));
                                                localStorage.setItem('videoPlayVolume', JSON.stringify(volume));
                                            }
                                        }}
                                    >
                                    </input>
                                </div>
                                {/* right side UI */}
                                <div className={styles.rightControler}>
                                    <div className={styles.time}>
                                        {displayTime(currentTime)} / {displayTime(duration)}
                                    </div>
                                    {/* speed */}
                                    <Dropdown>
                                        <Dropdown.Button css={{ color: 'white' }} light>
                                            speed
                                        </Dropdown.Button>
                                        <Dropdown.Menu
                                            variant="light"
                                            aria-label="Single selection actions"
                                            selectionMode="single"
                                            selectedKeys={playSpeed.toString()}
                                            onAction={(key: Key) => {
                                                setPlaySpeed(Number(key));                   
                                            }}
                                        >
                                            <Dropdown.Item key={0.5}>0.5x</Dropdown.Item>
                                            <Dropdown.Item key={0.75}>0.75x</Dropdown.Item>
                                            <Dropdown.Item key={1}>1x</Dropdown.Item>
                                            <Dropdown.Item key={1.25}>1.25x</Dropdown.Item>
                                            <Dropdown.Item key={1.5}>1.5x</Dropdown.Item>
                                            <Dropdown.Item key={1.75}>1.75x</Dropdown.Item>
                                            <Dropdown.Item key={2}>2x</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
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