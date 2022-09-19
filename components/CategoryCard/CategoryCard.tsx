import Image from 'next/image';
import styles from './CategoryCard.module.css';

type Props = {
    title: string;
    image: string;
}

const CategoryCard = ({ title, image }: Props) => {
    return (
        <div className={styles.categoryContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src={image}
                    alt="Category image"
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                    priority={true}
                />
                <div className={styles.titleContainer}>{title}</div>
            </div>
        </div>
    );
}

export default CategoryCard;