import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HamburgerMenu from './HamburgerMenu';
import ClosePanel from './ClosePanel';

import styles from '@/components/header/Header.module.css'

import Link from 'next/link';

import Menu from './Menu';
import HeaderTop from './TopHeader';

const Header = () => {
    return (
        <>
            <header className={styles.Header}>
                <div className='fullwidth'>
                    <HeaderTop />
                    <div className={styles.HeaderMain}>
                        <div className='container'>
                            <div className={styles.InnerContainer}>
                                <div className={styles.HeaderLeft}>
                                    <div className="logo-container">
                                        <Link href='/' aria-label='Logo Evanhub'>
                                            <img src="/evanhub-logo.png" alt="Logo Evanhub" />
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.HeaderRight}>
                                    <nav className='d-none d-sm-none d-md-none d-lg-block'>
                                        <Menu />
                                    </nav>

                                    <div className='d-block d-sm-block d-md-block d-lg-none'>
                                        <HamburgerMenu />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className='d-block d-sm-block d-md-block d-lg-none'>
                <div className="panel_menu">
                    <div className={styles.panel_menu_header}>
                        <img src="/evanhub-logo.png" alt="Logo Evanhub" />
                        <ClosePanel />
                    </div>
                    <div className={styles.panel_menu_body}>
                        <Menu />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;