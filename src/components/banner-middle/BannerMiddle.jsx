import Image from "next/image";

import styles from './BannerMiddle.module.css'

const BannerMiddle = (props) => {
    const { image, title, banner, customClass } = props;

    const bannerBg = {
        backgroundImage: `url(${banner})`,
    };

    return (
        <section className={`banner-middle mt-xxl ${customClass, styles.bannerMiddle}`} style={bannerBg}>
            <div className="container">
                <div className={styles.innerContainer}>
                    <h2 className="h1 display-small secondary-font">{title}</h2>
                    <Image src={image} alt={title} width={849} height={853} style={{ width: "100%", height: "auto" }} />
                </div>
            </div>
        </section>
    );
}

export default BannerMiddle;