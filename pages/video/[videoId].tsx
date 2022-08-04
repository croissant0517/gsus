import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

const VideoPage: NextPage = () => {
    const router = useRouter();
    const { videoId } = router.query;

    return (
        <div>
            <h1>video No.{videoId}</h1>
            {
                !!videoId && 
                <video
                    autoPlay
                    muted
                    loop 
                    controls
                    style={{ width: '1000px' }}
                >         
                    <source src={`/video-${videoId}.mp4`} type="video/mp4"/>
                </video>
            }
        </div>
    );
}

export default VideoPage;