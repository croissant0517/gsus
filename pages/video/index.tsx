import type { NextPage, GetStaticProps, GetServerSideProps, InferGetStaticPropsType, InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react';
import axios from 'axios'
import TinyVideoPlayer from '../../components/VideoPlayer/TinyVideoPlayer';
import { Button } from '@nextui-org/react';
import styles from '../../styles/Video.module.css'

interface User {
    id: number
    name: string
    url: string
}

export interface VideoFile {
    id: number
    link: string
    file_type: string
    width: number
}

interface Video {
    id: number
    user: User
    width: number
    video_files: VideoFile[]
    image: string
}

const Video: NextPage = ({ videosData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [videos, setVideos] = useState<Video[]>();

    useEffect(() => {
        if (!!videosData?.videos) {
            // filter the FullHD quality file
            const filtedVideosData = videosData.videos.filter((video: Video) => video.width >= 1920);
            setVideos(filtedVideosData);
        }
    }, [videosData])

    return (
        <div className={styles.pageContainer}>
            {
                videos?.map((video: Video) => {
                    // find the FullHD quality file
                    const srcLink = video.video_files.find((file: VideoFile) => file.width === 1920)
                    if (!!srcLink) {
                        return (
                            <div key={video.id} className={styles.videoContainer}>
                                <TinyVideoPlayer
                                    id={video.id}
                                    src={srcLink.link}
                                    userName={video.user.name}
                                    userLink={video.user.url}
                                    image={video.image}
                                />
                            </div>
                        )
                    }
                })
            }
        </div>
    );
}

// export const getStaticProps: GetStaticProps = async () => {
//     try {
//         const res = await axios('https://api.pexels.com/videos/popular', {
//             headers: {
//                 'Authorization': process.env.PEXEL_KEY ?? ''
//             }
//         })
//         return {
//             props: {
//                 videosData: res.data
//             },
//         };
//     } catch(error) {
//         return {
//             props: {
//                 videosData: null
//             },
//         };
//     }
// }

export const getServerSideProps: GetServerSideProps = async (content) => {
    const req = content.req;
    const res = content.res;
    try {
        const res = await axios('https://api.pexels.com/videos/popular', {
            headers: {
                'Authorization': process.env.PEXEL_KEY ?? ''
            }   
        })
        return {
            props: {
                videosData: res.data
            },
        };
    } catch(error) {
        return {
            props: {
                videosData: null
            },
        };
    }
}

export default Video;