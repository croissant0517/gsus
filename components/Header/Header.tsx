import Image from 'next/image'
import Link from 'next/link'
import { Button, Text, useTheme, Navbar, Dropdown, Avatar } from "@nextui-org/react";
import { Link as CustomLink} from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from 'next/router';
import { BsFillSunFill } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';

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
    const [user, setUser] = useState(false);
    
    return (
        // <header className={styles.headerContainer}>
        //     <Link href='/'>
        //         <div className={styles.logoContainer}>
        //             <Image 
        //                 src="/jesus.svg" 
        //                 alt="Gsus Logo" 
        //                 width={50} 
        //                 height={50} 
        //                 style={{
        //                     filter: `${type === 'dark' ? 'invert(1)' : 'invert(0)'}`
        //                 }}
        //             />
        //             <span className={styles.logo}>
        //                 Gsus
        //             </span>
        //         </div>
        //     </Link>
        //     <div className={styles.linksContainer}>
        //         <Link href='/about'>
        //             <div className={router.pathname.includes('/about') ? styles.linksItemActive : styles.linksItem}>
        //                 About
        //             </div>
        //         </Link>
        //         <Link href='/video'>
        //             <div className={router.pathname.includes('/video') ? styles.linksItemActive : styles.linksItem}>
        //                 Video
        //             </div>
        //         </Link>
        //     </div>
        //     <div className={styles.buttonsContainer}>
        //         <div className={styles.button}>
        //             <Button auto shadow>
        //                 Sign in
        //             </Button>
        //         </div>
        //         <div className={styles.button}>
        //             <Button auto shadow>
        //                 Sign up
        //             </Button>
        //         </div>
        //         <div className={styles.icon} onClick={() => setTheme(type === 'dark' ? 'light' : 'dark')}>
        //             {type === 'dark' ? <BsFillSunFill/> : <MdDarkMode/>}
        //         </div>
        //     </div>
        // </header>
        <Navbar variant="sticky">
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
                css={{
                    "@xs": {
                    w: "12%",
                    },
                }}
            >
                <Image 
                    src="/jesus.svg" 
                    alt="Gsus Logo" 
                    width={30} 
                    height={30} 
                    style={{
                        filter: `${type === 'dark' ? 'invert(1)' : 'invert(0)'}`,
                        margin: '0'
                    }}
                />
                <Text b color="inherit" hideIn="xs" css={{ margin: '1rem' }}>
                    GSUS
                </Text>
            </Navbar.Brand>
            <Navbar.Content
                hideIn="xs"
            >
                {/* <Navbar.Link color="inherit" isActive={router.pathname.includes('/about')} href="/about">
                    About
                </Navbar.Link>
                <Navbar.Link color="inherit" isActive={router.pathname.includes('/video')} href="/video">
                    Video
                </Navbar.Link> */}
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
            {user ?
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
                        <Dropdown.Item key="settings">
                            My Settings
                        </Dropdown.Item>
                        <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                        <Dropdown.Item key="analytics" withDivider>
                            Analytics
                        </Dropdown.Item>
                        <Dropdown.Item key="system">System</Dropdown.Item>
                        <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
                        <Dropdown.Item key="help_and_feedback" withDivider>
                            Help & Feedback
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
            <Navbar.Collapse>
                {collapseItems.map((item: CollapseItem, index: number) => (
                    <Navbar.CollapseItem
                        key={item.name}
                        activeColor="primary"
                        isActive={router.pathname.includes(item.path)}
                    >
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
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;