import Image from "next/image";

import Button from "../Button";
import styles from './BannerSplitGradient.module.css'
import Breadcrumb from "../Breadcrumbs";

const BannerSplitGradient = (props) => {
    const { src, src_sm, title, description_banner, image, buttonProps, customName } = props;

    return (
        <section className={`${styles.Banner} banner_section mb-xxl`}>
            <Breadcrumb 
                customName={customName}
                customClass={styles.Breadcrumb}
            />

            <div className={`${styles.container} container`}>
                <div className={`${styles.row} row`}>
                    <div className={`${styles.infoBanner} col-md-6 col-sm-12`}>
                        <div className={styles.innerInfoBanner}>
                            {!!title && <h1 className="title-page">{title}</h1>}
                            {!!description_banner && <p>{description_banner}</p>}
                            {buttonProps && <Button {...buttonProps} />}
                        </div>
                    </div>
                    <div className={`${styles.imgBanner} col-md-6 col-sm-12`}>
                        {src && (
                            <>
                                <Image src={src} width={1440} height={560} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={`Banner ${title}`} className="d-none d-sm-none d-md-block" priority />

                                {src_sm ? (
                                    <Image src={src_sm} width={360} height={494} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={`Banner ${title}`} className="d-block d-sm-block d-md-none" priority />
                                ) : (
                                    <Image src={src} width={1440} height={560} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={`Banner ${title}`} className="d-block d-sm-block d-md-none" priority />
                                )}

                            </>
                        )}
                    </div>
                </div>
            </div>



        </section>
    );
}

export default BannerSplitGradient;