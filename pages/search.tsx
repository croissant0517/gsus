import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import axios from 'axios';
import { Video } from './video';
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

interface SearchData {
    page: number
    per_page: number
    videos: Video[]
    total_results: number
    next_page: string
}

const SearchPage: NextPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchData>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!!router.query.keyword) {
            setSearchResults(initialSearchData);
            setLoading(true);
            setSearchTerm(router.query.keyword as string);
            const keyword = router.query.keyword as string;
            if (!!keyword) {
                axios(`/api/get-search/${keyword}`)
                .then((res) => {
                    setSearchResults(res.data);
                    setLoading(false);
                })
            }
        }
    }, [router.query])

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
                        videos={searchResults?.videos}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;