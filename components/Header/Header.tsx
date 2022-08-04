import Image from 'next/image'
import Link from 'next/link'
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import { BsFillSunFill } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import styles from './Header.module.css';

const Header = () => {
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();
    
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
                            backgroundColor: 'white',
                            borderRadius: '30%'
                        }}
                    />
                    <span className={styles.logo}>
                        Gsus
                    </span>
                </div>
            </Link>
            <div className={styles.linksContainer}>
                <Link href='/about'>
                    <div className={styles.linksItem}>
                        About
                    </div>
                </Link>
                <Link href='/video'>
                    <div className={styles.linksItem}>
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

                {/* The current theme is: {type}
                <BsFillSunFill style={{ fontSize: '30px' }}/>
                <Switch
                    checked={isDark}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                /> */}