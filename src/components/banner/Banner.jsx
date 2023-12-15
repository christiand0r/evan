import Image from "next/image";

import Button from "../Button";
import styles from './Banner.module.css'
import Breadcrumb from "../Breadcrumbs";

const Banner = (props) => {
    const { src, src_sm, title, description_banner, image, buttonProps, customName, customClass } = props;
    return (
        <section className={`${styles.Banner} banner_section mb-xxl ${customClass}`}>
            <Breadcrumb customName={customName}/>

            {src && (
                <div className={styles.imgBanner}>

                    <Image src={src} width={1440} height={560} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={`Banner ${title}`} className="d-none d-sm-none d-md-block" priority />

                    {src_sm ? (
                        <Image src={src_sm} width={360} height={494} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={`Banner ${title}`} className="d-block d-sm-block d-md-none" priority />
                    ) : (
                        <Image src={src} width={1440} height={560} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={`Banner ${title}`} className="d-block d-sm-block d-md-none" priority />
                    )}

                </div>
            )}
          
            <div className={styles.infoBanner}>
                {image ? (
                    <div className={styles.innerImgBanner}>
                        <Image src={image} width={567} height={198} style={{ width: '100%', maxWidth: '570px', height: 'auto' }} alt={`Image float banner ${title}`} priority />
                    </div>
                ) : (
                    <div className={styles.innerInfoBanner}>
                        {!!title && <h1 className="title-page">{title}</h1>}
                        {!!description_banner && <p>{description_banner}</p>}
                        {buttonProps && <Button {...buttonProps} />}
                    </div>
                )}
            </div>

            {buttonProps && <Button {...buttonProps} />}
        </section>
    );
}

export default Banner;