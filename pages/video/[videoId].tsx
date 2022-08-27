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
            {!!videoId && <VideoPlayer/>}
        </div>
    );
}

export default VideoPage;