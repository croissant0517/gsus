import type { NextPage, GetStaticProps, GetServerSideProps } from 'next'
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import styles from '../styles/Home.module.css'

const Video: NextPage = () => {
    return (
        <div>
            <Link href='/video/1'>
                video 1
                {/* <Button>video 1</Button> */}
            </Link>
            <Link href='/video/2'>
                video 2
                {/* <Button>video 2</Button> */}
            </Link>
        </div>
    );
}

// export const getStaticProps: GetStaticProps = async () => {
//     return {
//         props: {},
//     };
// }

export const getServerSideProps: GetServerSideProps = async (content) => {
    const req = content.req;
    const res = content.res;

    return {
        props: {},
    };
}

export default Video;