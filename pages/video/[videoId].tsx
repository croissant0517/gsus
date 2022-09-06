import type { NextPage, GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

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

// export const getStaticPaths: GetStaticPaths = () => {
//     return {
//         fallback: false,
//         paths: [
//             {
//                 params: {
//                     videoId: '1'
//                 }
//             },
//             {
//                 params: {
//                     videoId: '2'
//                 }
//             }
//         ]
//     }
// }

// export const getStaticProps: GetStaticProps = async (content) => {
//     const videoId = content.params;
//     console.log(videoId);

//     return {
//         props: {},
//     };
// }

export const getServerSideProps: GetServerSideProps = async (content) => {
    const req = content.req;
    const res = content.res;
    const videoId = content.params;
    console.log(videoId);

    return {
        props: {},
    };
}

export default VideoPage;