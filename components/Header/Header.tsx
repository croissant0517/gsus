import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from 'next/router';
import { useTheme } from '@nextui-org/react'
import { BsFillSunFill } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import styles from './Header.module.css';
import { useEffect } from 'react';

const Header = () => {
    const { setTheme } = useNextTheme();
    const { type } = useTheme();
    const router = useRouter();
    
    return (
        <header className={styles.headerContainer}>
            <Link href='/'>
                <div className={styles.logoContainer}>
                    <Image 
                        src="/jesus.svg" 
                        alt="Gsus Logo" 
                        width={50} 
                        height={50} 
                        style={{
                            filter: `${type === 'dark' ? 'invert(1)' : 'invert(0)'}`
                        }}
                    />
                    <span className={styles.logo}>
                        Gsus
                    </span>
                </div>
            </Link>
            <div className={styles.linksContainer}>
                <Link href='/about'>
                    <div className={router.pathname.includes('/about') ? styles.linksItemActive : styles.linksItem}>
                        About
                    </div>
                </Link>
                <Link href='/video'>
                    <div className={router.pathname.includes('/video') ? styles.linksItemActive : styles.linksItem}>
                        Video
                    </div>
                </Link>
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.button}>
                    <Button auto shadow>
                        Sign in
                    </Button>
                </div>
                <div className={styles.button}>
                    <Button auto shadow>
                        Sign up
                    </Button>
                </div>
                <div className={styles.icon} onClick={() => setTheme(type === 'dark' ? 'light' : 'dark')}>
                    {type === 'dark' ? <BsFillSunFill/> : <MdDarkMode/>}
                </div>
            </div>
        </header>
    );
}

export default Header;