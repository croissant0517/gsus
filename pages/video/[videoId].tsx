import React, { useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head';
import axios from 'axios'
import dynamic from "next/dynamic";
import { VideoFile } from '.';
import styles from '../../styles/Video.module.css'

const VideoPlayer = dynamic(
    () => {
      return import('../../components/VideoPlayer/VideoPlayer');
    },
    { ssr: false }
);

const VideoPage: NextPage = ({ videoData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [video, setVideo] = useState<VideoFile>({
        id: 0,
        link: '',
        file_type: '',
        width: 0,
    });

    useEffect(() => {
        const video = videoData.video_files.find((file: VideoFile) => file.width === 1920);
        if (!!video) {
            setVideo(video);
        }
    },[videoData]);

    return (
        <React.Fragment>
            <Head>
                <title>GSUS | {videoData.user.name}</title>
                <meta name="description" content={`Video courtesy of ${videoData.user.name} in Pexels`}/>
            </Head>
            <div className={styles.title}>
                <h1>
                    <a 
                        className={styles.userLink}
                        href={videoData.url} 
                        target='_blank' 
                        rel='noreferrer'
                    >
                        Video
                    </a>
                    courtesy of
                    <a 
                        className={styles.userLink}
                        href={videoData.user.url} 
                        target='_blank' 
                        rel='noreferrer'
                    >
                        {videoData.user.name}
                    </a>
                    in
                    <a 
                        className={styles.userLink}
                        href='https://www.pexels.com/' 
                        target='_blank' 
                        rel='noreferrer'
                    >
                        Pexels
                    </a>
                </h1>
            </div>
            <VideoPlayer
                src={video.link}
                type={video.file_type}
            />
        </React.Fragment>
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
                'Authorization': process.env.PEXEL_KEY ?? ''
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