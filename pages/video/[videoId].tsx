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
                    // autoPlay
                    muted
                    loop 
                    controls
                    style={{ width: '1000px' }}
                >         
                    <source 
                        // src={`/video-${videoId}.mp4`}
                        src='https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile_id=175&oauth2_token_id=57447761'
                        type="video/mp4"
                    />
                </video>
            }
        </div>
    );
}

export default VideoPage;