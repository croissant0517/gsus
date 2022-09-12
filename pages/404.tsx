import Image from 'next/image';
import styles from '../styles/404.module.css'

export default function Custom404() {

    return (
        <div className={styles.pageContainer}>
            <div 
                className={styles.errorImageContainer}
            >
                <Image
                    className={styles.errorImageContainer}
                    src='/A040Lxr.png'
                    alt="error image"
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
            </div>
            <h1 className={styles.title}>Sorry, this Page is Lost in Space...</h1>
        </div>
    );
}