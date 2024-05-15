import Image from "next/image";
import styles from './SplitGradient.module.css'

const SplitGradient = (props) => {

    const {urlImage, title, bgImage, bgImageMobile} = props;

    const styleImage = {
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
    };

    const styleImageSm = {
        backgroundImage: `${bgImageMobile ? `url(${bgImageMobile})` : ''}`,
    };

    const styleImageLg = {
        backgroundImage: `${bgImage ? `url(${bgImage})` : ''}`,
    };

    return (
        <section className={`${styles.splitGradient} mt-xxl mb-xxl`}>
            <div className="container-l">
                <div className="innerSplit">
                    <div className={`${styles.splitRow} row g-0`}>
                        <div className={`${styles.splitLeft} col-md-6 col-sm-12 d-none d-sm-none d-md-block`} style={bgImage && {...styleImage, ...styleImageLg} } >
                            {title && <h2>{title}</h2>}
                        </div>
                        <div className={`${styles.splitLeft} col-md-6 col-sm-12 d-block d-sm-block d-md-none`} style={bgImage && {...styleImage, ...styleImageSm} } >
                            {title && <h2>{title}</h2>}
                        </div>
                        <div className={`${styles.splitRight} col-md-6 col-sm-12`}>
                            <Image src={urlImage}  alt={`Imagen ${title}`} quality={100} unoptimized={true} width={547} height={348} style={{ width: "100%", height: "auto" }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SplitGradient;