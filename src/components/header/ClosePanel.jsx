'use client'

import { useState, useEffect } from "react";

import styles from '@/components/header/Header.module.css'

const ClosePanel = () => {

    const [openIsMenu, setOpenIsMenu] = useState(() => {
        if (typeof window !== 'undefined') {
            !document.body.classList.contains('menu_open');
        }
        return false;
    })

    const handleMenuClick = () => {
        setOpenIsMenu(prevOpenIsMenu => !prevOpenIsMenu);
    }

    useEffect(() => {
        if (openIsMenu) {
            document.body.classList.remove('menu_open');
            setOpenIsMenu(false);
        }
    },[openIsMenu]);


    return (
        <div className="close-panel" onClick={handleMenuClick}>
            <div className={styles.closePanelIcon}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}

export default ClosePanel;
