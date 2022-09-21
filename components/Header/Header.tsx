import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Button, Text, useTheme, Navbar, Avatar } from "@nextui-org/react";
import { Link as CustomLink} from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from 'next/router';
import { BsFillSunFill } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import styles from './Header.module.css';

interface CollapseItem {
    name: string,
    path: string,
}

const collapseItems: CollapseItem[] = [
    {
        name: 'Video',
        path: '/video'
    },
    {
        name: 'About',
        path: '/about'
    },
];

const Header = () => {
    const { setTheme } = useNextTheme();
    const { type } = useTheme();
    const router = useRouter();
    const [user, setUser] = useState<boolean>(false);
    
    return (
        <Navbar maxWidth="fluid" variant="sticky">
            <Navbar.Toggle showIn="xs"/>
            <Navbar.Brand
                css={{
                    "@xs": {
                    w: "12%",
                    },
                }}
            >   
                <Link href="/">
                    <div className={styles.logoContainer}>
                        <Image
                            src="/jesus.svg"
                            alt="Gsus Logo"
                            width={30} 
                            height={30} 
                            style={{
                                filter: `${type === 'dark' ? 'invert(1)' : 'invert(0)'}`,
                            }}
                        />
                        <Text b color="inherit" hideIn="xs" css={{ margin: '1rem' }}>
                            GSUS
                        </Text>
                    </div>
                </Link>
            </Navbar.Brand>
            <Navbar.Content
                hideIn="xs"
            >
                <Link href="/video">
                    <Navbar.Link color="inherit" isActive={router.pathname.includes('/video')}>
                        Video
                    </Navbar.Link>
                </Link>
                <Link href="/search">
                    <Navbar.Link color="inherit" isActive={router.pathname.includes('/search')}>
                        Search
                    </Navbar.Link>
                </Link>
            </Navbar.Content>
            <Navbar.Content
                css={{
                    "@xs": {
                    w: "12%",
                    jc: "flex-end",
                    },
                }}
            >
                <div className={styles.icon} onClick={() => setTheme(type === 'dark' ? 'light' : 'dark')}>
                    {type === 'dark' ? <BsFillSunFill/> : <MdDarkMode/>}
                </div>
            </Navbar.Content>
            <Navbar.Collapse showIn='xs'>
                {collapseItems.map((item: CollapseItem, index: number) => (
                    <Navbar.CollapseItem
                        key={item.name}
                    >
                        <div>
                            <CustomLink href={item.path} color="inherit">
                                {item.name}
                            </CustomLink>
                        </div>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;