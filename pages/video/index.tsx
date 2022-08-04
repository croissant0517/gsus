import type { NextPage } from 'next'
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import styles from '../styles/Home.module.css'

const Video: NextPage = () => {
    return (
        <div>
            <Link href='/video/1'>
                <Button auto color="primary">video 1</Button>
            </Link>
            <Link href='/video/2'>
                <Button auto color="primary">video 2</Button>
            </Link>
        </div>
    );
}

export default Video;