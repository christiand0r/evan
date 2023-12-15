import styles from './BannerGradient.module.css'
import Button from '../Button';

const BannerGradient = (props) => {

    const { title, type_gradient, type_button, label_button, url_button, target_button, class_button, custom_class, bg_image } = props;

    let gradientClass = '';

    if (type_gradient == 'gradient 1') {
        gradientClass = ' gradient_01';
    } else if (type_gradient == 'gradient 1') {
        gradientClass = ' gradient_02';
    } else if (type_gradient == 'gradient 3') {
        gradientClass = ' gradient_03';
    } else if (type_gradient == 'gradient 4') {
        gradientClass = ' gradient_04';
    } else if (type_gradient == 'gradient 5') {
        gradientClass = ' gradient_05';
    } else {
        gradientClass = ' gradient_01';
    }

    const styleImage = {
        backgroundImage: `${bg_image ? `url(${bg_image})` : 'none'}, linear-gradient(90deg, #9CB78E 5.73%, #556F69 45.83%, #2E3C71 85.94%)`,
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
    };

    return (
        <div className={`${styles.BannerGradient} ${gradientClass} banner_gradient ${custom_class}`} style={bg_image && styleImage} >
            <div className="container">
                <div className={styles.InnerContainer}>
                    <h2 className="secondary-font color-10 display-large mb-xm text-center">{title}</h2>
                    <Button label={label_button} style={class_button} url={url_button} target={target_button} type={type_button} />
                </div>
            </div>
        </div>
    )
}


export default BannerGradient;