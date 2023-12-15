import Image from "next/image";
import Button from "../Button";

import styles from './Areas.module.css'

const CardImage = (props) => {
    const { img, title, epigraph, excerpt, buttonProps } = props;

    return (
        <div className={styles.CardEvanhub}>
            <figure className="mb-0">
                <Image src={img} width={280} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`imagen ${title}`} quality={75} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </figure>
            <div className={styles.InfoCard}>
                <div className="inner-infocard">
                    <h2 className="h6">{epigraph}</h2>
                    <h3>{title}</h3>
                    <p>{excerpt}</p>
                </div>
                <Button {...buttonProps} />
            </div>
        </div>
    );
}

export default CardImage;