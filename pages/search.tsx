import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import axios from 'axios';
import { Video, SearchData } from './video';
import VideoItemsList from '../components/VideoItemsList/VideoItemsList';
import styles from '../styles/Search.module.css'

const SearchBar = dynamic(
    () => {
      return import('../components/SearchBar/SearchBar');
    },
    { ssr: false }
);

const initialSearchData = {
    page: 0,
    per_page: 0,
    videos: [],
    total_results: 0,
    next_page: ''
}

const SearchPage: NextPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchData>();
    const [videoDatas, setVideoDatas] = useState<Video[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!!router.query.keyword) {
            setSearchResults(initialSearchData);
            setLoading(true);
            setSearchTerm(router.query.keyword as string);
            const keyword = router.query.keyword as string;
            if (!!keyword && keyword !== '') {
                axios(`/api/get-search/${keyword}`)
                .then((res) => {
                    setSearchResults(res.data);
                    setVideoDatas(res.data.videos);
                    setLoading(false);
                })
            }
        }
    }, [router.query])

    useEffect(() => {
        const scrollingFetch = () => {
            if(((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1080) && !loading && !!searchResults?.next_page) {
                setLoading(true);
                axios(`/api/get-search/${searchTerm}`, {
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
    }, [page, videoDatas, loading, searchTerm, searchResults]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            router.push(`/search?keyword=${searchTerm}`)
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div
                onKeyDown={handleDown}
            >
                <SearchBar
                    value={searchTerm}
                    placeholder={'Search'}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.resultContainer}>
                <div className={styles.resultAreaHeader}>
                    <div>
                        {`共 ${searchResults?.total_results ?? '0'} 部作品`}
                    </div>
                </div>
                <div className={styles.result}>
                    <VideoItemsList
                        videos={videoDatas}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;