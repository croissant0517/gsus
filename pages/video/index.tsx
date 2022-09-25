import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head';
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

export interface SearchData {
    page: number
    per_page: number
    videos: Video[]
    total_results: number
    next_page: string
}

const Video: NextPage = () => {
    const [videoDatas, setVideoDatas] = useState<Video[]>([]);
    const [searchResults, setSearchResults] = useState<SearchData>();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios(`/api/get-popular/`)
        .then((res) => {
            setPage(res.data.page);
            setSearchResults(res.data);
            // filter the FullHD quality file
            const filtedVideosData = res.data.videos.filter((video: Video) => video.width >= 1920);
            setVideoDatas(filtedVideosData);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        const scrollingFetch = () => {
            if(((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1080) && !loading && !!searchResults?.next_page) {
                setLoading(true);
                axios(`/api/get-popular/`, {
                    params: {
                        page: page+1,
                    }
                })
                .then((res) => {
                    setPage(res.data.page);
                    setSearchResults(res.data);
                    // filter the FullHD quality file
                    const filtedVideosData = res.data.videos.filter((video: Video) => video.width >= 1920);
                    setVideoDatas([...videoDatas, ...filtedVideosData]);
                    setLoading(false);
                })
            }
        }
        window.addEventListener('scroll', scrollingFetch);
        return () => {
            window.removeEventListener('scroll', scrollingFetch);
        };
    }, [page, videoDatas, loading, searchResults]);

    return (
        <React.Fragment>
            <Head>
                <title>GSUS | Videos</title>
                <meta name="description" content={`Video courtesy Pexels`}/>
            </Head>
            <div className={styles.pageContainer}>
                <VideoItemsList
                    videos={videoDatas}
                    loading={loading}
                />
            </div>
        </React.Fragment>
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