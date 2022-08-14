import type { NextPage } from 'next'
import Image from 'next/image';
import { User } from "@nextui-org/react";
import styles from '../styles/About.module.css'
import { GrLinkedin } from 'react-icons/gr'

const AboutPage: NextPage = () => {
    return (
        <div className={styles.pageContainer}>
            {/* <div className={styles.pictureContainer}>
                <Image 
                    src='http://source.unsplash.com/l90zRbWvCoE'
                    alt='about picture'
                    layout='fill'
                    objectFit='contain'
                ></Image>
            </div> */}
            <div className={styles.title}>
                <h1>Co-Founder</h1>
            </div>
            <div className={styles.profileContainer}>
                <div className={styles.myPhotoContainer}>
                    <Image 
                        src='/my-photo.png'
                        alt='my photo'
                        layout='fill'
                        objectFit='contain'
                    ></Image>
                </div>
                <div className={styles.profileDetail}>
                    <div>
                        <h3>Vic Chang</h3>
                        <p>Front end Developer</p>
                    </div>
                    <a 
                        target="_blank" 
                        rel="noreferrer" 
                        href='https://www.linkedin.com/in/vic-chang-228213206/'
                    >
                        <GrLinkedin/>
                        Linkedin
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;