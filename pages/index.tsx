import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Header from '../components/Header/Header'

const Home: NextPage = () => {
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        controls
        style={{ width: '1000px' }}
      >         
        <source 
          src='https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile_id=175&oauth2_token_id=57447761'
          type="video/mp4"
        />
      </video>
    </div>
  )
}

export default Home
