'use client'

import { useState, useEffect } from "react";

import styles from './Header.module.css'

const HamburgerMenu = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(() => {
        if (typeof window !== 'undefined') {

           !document.body.classList.contains('menu_open');
        }

        return false;
    
    });

    const handleMenuClick = () => {
        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
    }

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu_open');
            setIsMenuOpen(false);
        } 
    }, [isMenuOpen]);


    return (
        <div className={styles.hamburgerMenu} onClick={handleMenuClick}>
            <div className={styles.hamburgerMenuLine}></div>
            <div className={styles.hamburgerMenuLine}></div>
            <div className={styles.hamburgerMenuLine}></div>
        </div>
    )
}

export default HamburgerMenu;