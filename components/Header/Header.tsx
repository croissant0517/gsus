import Image from 'next/image'
import Link from 'next/link'
import { Button, Text, useTheme, Navbar, Dropdown, Avatar } from "@nextui-org/react";
import { Link as CustomLink} from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from 'next/router';
import { BsFillSunFill } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import styles from './Header.module.css';
import React, { useEffect, useState } from 'react';

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
    const [isShowCollapse, setIsShowCollapse] = useState<boolean>(false);
    
    return (
        <Navbar variant="sticky">
            <Navbar.Toggle showIn="xs" onClick={() => setIsShowCollapse(!isShowCollapse)}/>
            <Navbar.Brand
                css={{
                    "@xs": {
                    w: "12%",
                    },
                }}
            >   
                <Link href="/">
                    <CustomLink color="text">
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
                    </CustomLink>
                </Link>
            </Navbar.Brand>
            <Navbar.Content
                hideIn="xs"
            >
                <Link href="/video">
                    <Navbar.Link isActive={router.pathname.includes('/video')} color="inherit">
                        Video
                    </Navbar.Link>
                </Link>
                <Link href="/about">
                    <Navbar.Link isActive={router.pathname.includes('/about')} color="inherit">
                        About
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
            {   user ?
                <Dropdown placement="bottom-right">
                    <Navbar.Item>
                        <Dropdown.Trigger>
                            <Avatar
                                bordered
                                as="button"
                                color="primary"
                                size="md"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </Dropdown.Trigger>
                    </Navbar.Item>
                    <Dropdown.Menu
                        aria-label="User menu actions"
                        color="primary"
                        onAction={(actionKey) => console.log({ actionKey })}
                    >
                        <Dropdown.Item key="profile">
                            <Link href="/">
                                <CustomLink color="inherit" css={{ minWidth: "100%" }}>
                                    Profile
                                </CustomLink>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item key="my_favourite">
                            <Link href="/">
                                <CustomLink color="inherit" css={{ minWidth: "100%" }}>
                                    My Favourite
                                </CustomLink>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item key="logout" withDivider color="error">
                            Log Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                :
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="#">
                        Login
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button auto flat as={CustomLink} href="#">
                            Sign Up
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
            }
            <div className={styles.icon} onClick={() => setTheme(type === 'dark' ? 'light' : 'dark')}>
                {type === 'dark' ? <BsFillSunFill/> : <MdDarkMode/>}
            </div>
            </Navbar.Content>
            {   isShowCollapse &&
                <Navbar.Collapse showIn='xs'>
                    {collapseItems.map((item: CollapseItem, index: number) => (
                        <Navbar.CollapseItem
                            key={item.name}
                            activeColor="primary"
                            isActive={router.pathname.includes(item.path)}
                        >
                            <div>
                                <Link href={item.path}>
                                    <CustomLink
                                        color="inherit"
                                        css={{
                                            minWidth: "100%",
                                        }}
                                    >
                                        {item.name}
                                    </CustomLink>
                                </Link>
                            </div>
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
            }
        </Navbar>
    );
}

export default Header;