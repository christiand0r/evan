
import styles from './Footer.module.css'
import Logo from '../../../public/evanhub_logo_footer.svg';
import Link from 'next/link';
import Image from 'next/image';

import { getDataMenuFoot } from '@/app/Apis';

const renderIcon = (iconItem) => {
    if (iconItem) {
        return <span dangerouslySetInnerHTML={{ __html: iconItem }} />;
    }
    return null;
};

const renderMenuItems = (items) => {
    return items.map((item) => (
        <li key={item.id} className='nav-item'>
            <Link href={item.url} target={item.target} className={item.class}>
                {renderIcon(item.icon)} {item.title}
            </Link>
        </li>
    ));
};

const Footer = async () => {

    const dataResponse = await getDataMenuFoot();
    const titleFoot1 = dataResponse.data1.data.attributes.Title;
    const menuFoot1 = dataResponse.data1.data.attributes.Items;

    const titleFoot2 = dataResponse.data2.data.attributes.Title;
    const menuFoot2 = dataResponse.data2.data.attributes.Items;

    const titleFoot3 = dataResponse.data3.data.attributes.Title;
    const menuFoot3 = dataResponse.data3.data.attributes.Items;

    const titleFoot4 = dataResponse.data4.data.attributes.Title;
    const menuFoot4 = dataResponse.data4.data.attributes.Items;

    return (
        <footer className={styles.Footer}>
            <div className='main-footer'>
                <div className={styles.topFooter}>
                    <div className='container'>
                        <div className={styles.innerContainer}>

                            <Link href='/' aria-label='Logo Evanhub'>
                                <Image src={Logo} alt="Logo Footer" width={225} height={79} />
                            </Link>

                        </div>
                    </div>
                </div>
                <div className={styles.centerFooter}>
                    <div className='container'>
                        <div className='row'>
                            <div className={`${styles.Column} col-md-3 col-sm-12`}>
                                <p className='body-large mb-0'>{titleFoot1}</p>
                                <ul className='menu'>
                                    {renderMenuItems(menuFoot1)}
                                </ul>
                            </div>
                            <div className={`${styles.Column} col-md-3 col-sm-12`}>
                                <p className='body-large mb-0'>{titleFoot2}</p>
                                <ul className='menu'>
                                    {renderMenuItems(menuFoot2)}
                                </ul>
                            </div>
                            <div className={`${styles.Column} col-md-3 col-sm-12`}>
                                <p className='body-large mb-0'>{titleFoot3}</p>
                                <ul className='menu'>
                                    {renderMenuItems(menuFoot3)}
                                </ul>
                            </div>
                            <div className={`${styles.Column} col-md-3 col-sm-12`}>
                            <p className='body-large mb-0'>{titleFoot4}</p>
                                <ul className='menu'>
                                    {renderMenuItems(menuFoot4)}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.bottomFooter}>
                    <div className='container'>
                        <div className={styles.innerContainer}>
                            <p>Copyright © <span id="currentYear">{new Date().getFullYear()}</span>. Todos los derechos reservados.</p>
                            <p>Diseño y Desarrollo <a href='https://www.somosforma.com/' target='_blank'>Forma</a> | <a href='https://moovmediagroup.com/' target='_blank'>Moovmedia Group</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;