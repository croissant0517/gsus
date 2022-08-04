import type { NextPage } from 'next'
import { User } from "@nextui-org/react";
import styles from '../styles/Home.module.css'

const AboutPage: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1>About</h1>
            <User
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                name="Ariana Wattson"
                size="xl"
            />
        </div>
    );
}

export default AboutPage;