import HamburgerMenu from './HamburgerMenu';
import styles from '@/components/header/Header.module.css'
import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
import HeaderTop from './TopHeader';
import Logo from '../../../public/logo-evanhub.svg';
import PanelMobile from './panelMobile';

const Header = ({ isSticky }) => {

    return (
        <>
            <header className={`${styles.Header} ${isSticky ? styles.sticky : ''}`}>
                <div className='fullwidth'>
                    <HeaderTop />
                    <div className={styles.HeaderMain}>
                        <div className='container'>
                            <div className={styles.InnerContainer}>
                                <div className={styles.HeaderLeft}>
                                    <div className="logo-container">
                                        <Link href='/' aria-label='Logo Evanhub'>
                                            <Image src={Logo} width={122} height={43} quality={100} unoptimized={true} alt="Logo Evanhub" />
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.HeaderRight}>
                                    <nav className={styles.menuDesktop}>
                                        <Menu />
                                    </nav>

                                    <div className={styles.menuMobile}>
                                        <HamburgerMenu />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.menuMobile}>
                <PanelMobile />

                {/*}
                <div className={`${styles.panelMenu} panel_menu`}>
                    <div className={styles.panel_menu_header}>
                        <img src="/evanhub-logo.png" alt="Logo Evanhub" />
                        <ClosePanel />
                    </div>
                    <div className={styles.panel_menu_body}>
                        <Menu />
                    </div>
                </div>
    */ }
            </div>
        </>
    );
};

export default Header;