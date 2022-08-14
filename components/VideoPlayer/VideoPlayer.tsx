const VideoPlayer = () => {
    
    return (
        <div>
            <video
                src='https://www.pexels.com/zh-tw/video/3007578/download/?h=1080&w=1920'
                autoPlay
                muted
                loop 
                controls
                playsInline
            >
            </video>
        </div>
    );
}

export default VideoPlayer;