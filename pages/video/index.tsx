import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import axios from 'axios'
import VideoItemsList from '../../components/VideoItemsList/VideoItemsList';
import styles from '../../styles/Video.module.css'

export interface User {
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

export interface Video {
    id: number
    user: User
    width: number
    video_files: VideoFile[]
    image: string
}

const Video: NextPage = () => {
    const [videoDatas, setVideoDatas] = useState<Video[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios(`/api/get-popular/`)
        .then((res) => {
            setPage(res.data.page);
            // filter the FullHD quality file
            const filtedVideosData = res.data.videos.filter((video: Video) => video.width >= 1920);
            setVideoDatas(filtedVideosData);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        const scrollingFetch = () => {
            if(((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1080) && !loading) {
                setLoading(true);
                console.log("fetching more.........")
                axios(`/api/get-popular/`, {
                    params: { 
                        page: page+1,
                    }
                })
                .then((res) => {
                    setPage(res.data.page);
                    console.log(res.data);
                    
                    // filter the FullHD quality file
                    const filtedVideosData = res.data.videos.filter((video: Video) => video.width >= 1920);
                    setVideoDatas(oldVideosDatas => [...oldVideosDatas, ...filtedVideosData]);
                    setLoading(false);
                })
            }
        }
        window.addEventListener('scroll', scrollingFetch);
        return () => {
            window.removeEventListener('scroll', scrollingFetch);
        };
    }, [page, videoDatas, loading]);

    return (
        <div className={styles.pageContainer}>
            <VideoItemsList
                videos={videoDatas}
                loading={loading}
            />
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

// export const getServerSideProps: GetServerSideProps = async (content) => {
//     const req = content.req;
//     const res = content.res;
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

export default Video;