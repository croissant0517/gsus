import React from 'react';
import { Loading } from '@nextui-org/react';
import TinyVideoPlayer from '../VideoPlayer/TinyVideoPlayer';
import { Video, VideoFile } from '../../pages/video';
import styles from './VideoItemsList.module.css'

type Props = {
    videos: Video[] | undefined
    loading: boolean
}

const VideoItemsList = ({ videos, loading }: Props) => {

    return (
        <React.Fragment>
            {
                videos?.map((video: Video) => {
                    // find the FullHD quality file
                    const srcLink = video.video_files.find((file: VideoFile) => file.width === 1920)
                    if (!!srcLink) {
                        return (
                            <div key={video.id} className={styles.videoContainer}>
                                <div>{video.id}</div>
                                <TinyVideoPlayer
                                    id={video.id}
                                    src={srcLink.link}
                                    userName={video.user.name}
                                    userLink={video.user.url}
                                    image={video.image}
                                />
                            </div>
                        )
                    }
                })
            }
            {loading &&
                <div className={styles.loadingContainer}>
                    <Loading />
                </div>
            }
        </React.Fragment>
    );
}

export default VideoItemsList;