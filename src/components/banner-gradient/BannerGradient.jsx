import styles from './BannerGradient.module.css'
import Button from '../Button';

const BannerGradient = (props) => {

    const { title, type_gradient, type_button, label_button, url_button, target_button, class_button } = props;

    let gradientClass = '';

    if (type_gradient == 'gradient 1') {
        gradientClass = ' gradient_01';
    } else if (type_gradient == 'gradient 1') {
        gradientClass = ' gradient_02';
    } else if (type_gradient == 'gradient 3') {
        gradientClass = ' gradient_03';
    } else if (type_gradient == 'gradient 4') {
        gradientClass = ' gradient_04';
    } else {
        gradientClass = ' gradient_01';
    }


    return (
        <div className={styles.BannerGradient + gradientClass}>
            <div className="container">
                <div className={styles.InnerContainer}>
                    <h2 className="secondary-font color-10 display-large mb-xm text-center">{title}</h2>
                    <Button label={label_button} style={class_button} url={url_button} target={target_button} type={type_button}/>
                </div>
            </div>
        </div>
    )
}

export default BannerGradient;