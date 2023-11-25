import Image from "next/image";
import style from './GirdServicios.module.css';

const CardIcon = (props) => {
    const { icon, title, excerpt} = props;

    return (
        <div className={`${style.CardIcon} card br-8`}>
            <div className='inner-card'>
                <Image src={icon} width={100} height={100} className="mb-xm" alt={`Icon ${title}`} style={{ width: "100%", height: "auto" }}/>
                <h3 className="color-02">{title}</h3>
                <p>{excerpt}</p>
            </div>
        </div>
    );
}

export default CardIcon;