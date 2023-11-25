import Image from "next/image";
import Button from "../Button";

import styles from './Areas.module.css'

const CardImage = (props) => {
    const { img, title, epigraph, excerpt, buttonProps } = props;

    return (
        <div className={styles.CardEvanhub}>
            <figure className="mb-0">
                <Image src={img} width={280} height={208} style={{ width: '100%', height: 'auto' }} alt={`imagen ${title}`} quality={75} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </figure>
            <div className={styles.InfoCard}>
                <div className="inner-infocard">
                    <h6>{epigraph}</h6>
                    <h3>{title}</h3>
                    <p>{excerpt}</p>
                </div>
                <Button {...buttonProps} />
            </div>
        </div>
    );
}

export default CardImage;