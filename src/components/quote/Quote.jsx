import Image from "next/image";
import styles from './Quote.module.css';

const Quote = (props) => {

    const { author_image, author_name, author_position, author_message, custom_class } = props;

    return (
        <div className={`${styles.quote} mb-xxl ${custom_class}`}>
            <div className={styles.quote__image}>
                {author_image && <Image src={author_image} alt="Quote" width={312} height={438} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div className={styles.quote__content}>
                {author_message &&
                    <>
                        <i className="bi bi-quote"></i>
                        <p className={styles.quote__text}>
                            {author_message}
                        </p>
                    </>
                }
                <div className="quote__author">
                    {author_name && <h2>{author_name}</h2>}
                    {author_position && <p>{author_position}</p>}
                </div>
            </div>
        </div>
    )
}
export default Quote;