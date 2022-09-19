import React, { ReactNode } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PrevButton, NextButton } from "../CarouselButton/CarouselButton";
import styles from './Carousel.module.css';

type PropType = {
  options?: EmblaOptionsType
  slides: ReactNode[]
}

const Carousel = (props: PropType) => {
    const { options, slides } = props;
    const [emblaRef, embla] = useEmblaCarousel(options);

    const scrollPrev = () => embla && embla.scrollPrev();
    const scrollNext = () => embla && embla.scrollNext();

    return (
        <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
                {slides.map((slide, index) => (
                <div className={styles.emblaSlide} key={index}>
                    {slide}
                </div>
                ))}
            </div>
            <PrevButton onClick={scrollPrev} enabled={true} />
            <NextButton onClick={scrollNext} enabled={true} />
        </div>
    )
}

export default Carousel;