import type { NextPage, GetServerSideProps, InferGetServerSidePropsType, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router';
import axios from 'axios'
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import { VideoFile } from '.';

const VideoPlayer = dynamic(
    () => {
      return import('../../components/VideoPlayer/VideoPlayer');
    },
    { ssr: false }
);

const VideoPage: NextPage = ({ videoData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const { videoId } = router.query;
    const [video, setVideo] = useState<VideoFile>({
        id: 0,
        link: '',
        width: 0,
    })

    useEffect(() => {
        const video = videoData.video_files.find((file: VideoFile) => file.width === 1920)
        if (!!video) {
            setVideo(video)
        }
    },[videoData])

    return (
        <div>
            <h1>video No.{videoId}</h1>
            <VideoPlayer
                src={video.link}
            />
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
    const videoId = content.params?.videoId;
    try {
        const res = await axios(`https://api.pexels.com/videos/videos/${videoId}`, {
            headers: {
                'Authorization': '563492ad6f917000010000014833f6db804f435992402130a2d1fb24'
            }
        })
        return {
            props: {
                videoData: res.data
            },
        };
    } catch(error) {
        return {
            props: {
                videoData: null
            },
        };
    }
}

export default VideoPage;