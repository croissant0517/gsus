import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button } from "@nextui-org/react";
import CategoryCard from '../components/CategoryCard/CategoryCard';
import Carousel from '../components/Carousel/Carousel';
import initialCategories from '../initialCaregoriesData.json'
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.videoContainer}>
        <div className={styles.centerItemsContainer}>
          <div className={styles.itemsContainer}>
            <div className={styles.titleContainer}>
              <h1>Always Exploring</h1>
            </div>
            <div className={styles.searchButton}>
              <Button
                onClick={() => {
                  router.push('/search');
                }}
              >
                See more Videos
              </Button>
            </div>
          </div>
        </div>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          style={{ width: '100%' }}
        >         
          <source
            src='https://www.pexels.com/zh-tw/video/3568724/download/?fps=30.0&h=1080&w=1920'
            type="video/mp4"
          />
        </video>
      </div>

      {/* Carousel */}
      <div className={styles.categoriesContainer}>
        <div className={styles.categories}>
          <Carousel
            slides={
              initialCategories.data.map((category: any, index: number) => {
                return (
                  <CategoryCard
                    key={index}
                    title={category.title}
                    image={category.image}
                    onClick={() => {
                      router.push(`/search?keyword=${category.title}`)
                    }}
                  />
                );
              })
            }
            options={{
              loop: true,
              align: 'center',
              slidesToScroll: 1,
            }}
          />
        </div>
      </div>

    </div>
  )
}

export default Home
