import Image from "next/image";
import styles from './SplitGradient.module.css'

const SplitGradient = (props) => {

    const {urlImage, title} = props;

    return (
        <section className={`${styles.splitGradient} mt-xxl mb-xxl`}>
            <div className="container-l">
                <div className="innerSplit">
                    <div className={`${styles.splitRow} row g-0`}>
                        <div className={`${styles.splitLeft} col-md-6 col-sm-12`}>
                            {title && <h2>{title}</h2>}
                        </div>
                        <div className={`${styles.splitRight} col-md-6 col-sm-12`}>
                            <Image src={urlImage}  alt={`Imagen ${title}`} width={547} height={348} style={{ width: "100%", height: "auto" }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SplitGradient;