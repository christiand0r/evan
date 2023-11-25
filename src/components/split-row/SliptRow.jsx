import Image from "next/image";
import Link from "next/link";

import Button from "../Button";

import styles from './SplitRow.module.css'

const SplitRow = (props) => {

    const { title_section, image, title, description, url_button, label_button, type_button } = props;

    let buttonClasses = 'mt-xm';

    return (
        <section className={` ${styles.PreviewTeam} split_row pt-xxl pb-xxl`}>
            <div className="container-m">
                {title_section && <h2 className="secondary-font color-01 display-large mb-xl text-center">{title_section}</h2>}
            </div>
            <div className="container">
                <div className="InnerContainer">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            {image && <Image src={image} alt={`Imagen ${title}`} width={700} height={500} style={{ width: '100%', height: 'auto' }} />}
                        </div>
                        <div className="col-md-6 col-sm-12">
                            {title && <h2 className="secondary-font color-01 display-large mb-m">{title}</h2>}
                            {title && <div className={`${styles.SeparatorTitle} separator_title`}></div>}
                            {description && <p className="mt-m">{description}</p>}
                            {url_button && label_button && type_button && (
                                <Button
                                    label={label_button}
                                    style={buttonClasses}
                                    url={url_button}
                                    type={type_button}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SplitRow