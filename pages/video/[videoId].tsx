import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
// import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const VideoPlayer = dynamic(
    () => {
      return import('../../components/VideoPlayer/VideoPlayer');
    },
    { ssr: false }
  );

const VideoPage: NextPage = () => {
    const router = useRouter();
    const { videoId } = router.query;

    return (
        <div>
            <h1>video No.{videoId}</h1>
            {!!videoId && 
                <VideoPlayer
                    src={'https://www.pexels.com/zh-tw/video/3007578/download/?h=1080&w=1920'}
                />
            }
        </div>
    );
}

export default VideoPage;