'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getDataMenuPrimary } from '@/app/Apis';
import styles from '@/components/header/Header.module.css';

const PanelMobile = () => {

    const activeAccordionRef = useRef(null);

    const [menuItems, setMenuItems] = useState([]);
    const [openIsMenu, setOpenIsMenu] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataResponse = await getDataMenuPrimary();
                const menuPrimary = dataResponse.data.attributes;
                const items = menuPrimary.Items;
                setMenuItems(items);
            } catch (error) {
                console.error('Error loading menu:', error);
            }
        };

        fetchData();
    }, []);

    const lastTwoItems = menuItems.slice(-2);

    const [isActive, setIsActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = (e) => {
        if (!e.relatedTarget || !e.relatedTarget.closest(`.${styles.MainContainer}`)) {
            setIsHovered(false);
        }
    };

    const handleSubmenuMouseEnter = () => setIsHovered(true);

    const handleSubmenuMouseLeave = (e) => {
        const targetElement = e.relatedTarget || e.toElement;
    
        if (targetElement && typeof targetElement.closest === 'function') {
            if (!targetElement.closest(`.${styles.MainContainer}`)) {
                setIsHovered(false);
            }
        } else {
  
            let current = targetElement;
            while (current && current.classList && !current.classList.contains(styles.MainContainer)) {
                current = current.parentNode;
            }
    
            if (!current || !current.classList || !current.classList.contains(styles.MainContainer)) {
                setIsHovered(false);
            }
        }
    };
    useEffect(() => {
        setIsActive(false);
    }, []);

    const handleItemClick = (e, id) => {
        if (window.innerWidth < 1200) {
            setMenuItems(items =>
                items.map(item => ({
                    ...item,
                    isActive: item.id === id ? !item.isActive : item.isActive
                }))
            );

            const clickedElement = e.currentTarget;

            if (activeAccordionRef.current !== clickedElement) {
                if (activeAccordionRef.current) {
                    activeAccordionRef.current.classList.remove(styles.activeAccordion);
                }
                activeAccordionRef.current = clickedElement;
                clickedElement.classList.add(styles.activeAccordion);
            } else {
                activeAccordionRef.current = null;
                clickedElement.classList.remove(styles.activeAccordion);
            }
        }
    };


    const handleBodyClick = () => {
        document.body.classList.remove('menu_open');
        setIsMenuOpen((prev) => !prev);

        if (activeAccordionRef.current) {
            activeAccordionRef.current.classList.remove(styles.activeAccordion);
        }

        activeAccordionRef.current = null;
    };

    const handleSubMenuClick = () => {
        setIsHovered(false);
        document.body.classList.remove('menu_open');
    };

    const handleMenuClick = () => {
        if (openIsMenu) {
            document.body.classList.remove('menu_open');
        }
        setOpenIsMenu((prevOpenIsMenu) => !prevOpenIsMenu);
    };

    const renderSubMenuLink = (child, url) => {
        const handleClick = (event) => {
            handleItemClick(event, child.id);
        };

        return (
            <Link href={child.url || '#'} target={child.target} className={child.class} onClick={handleClick}>
                {child.title && child.title}
            </Link>
        );
    };

    const renderIcon = (iconItem) => (iconItem ? <span dangerouslySetInnerHTML={{ __html: iconItem }} /> : null);

    const urlLink = (url, target, classes, item, icon, id) => {
             
        return '#' === url ? (
            <button
                className={`${styles.buttonNav} ${classes || ''} ${isActive ? styles.activeAccordion : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={e => handleItemClick(e, id)}
               
            >
                {item} {renderIcon(icon)}
            </button>
        ) : (
            <Link href={url} target={target} className={classes} onClick={handleBodyClick}>
                {item} {renderIcon(icon)}
            </Link>
        );
    };


    const renderMenuItems = (items) => {
        return items.map((item, index) => (
            //console.log('item', item),
            <li key={index} className={`nav-item nav_id_4${item.id} ${isHovered ? styles.Show : ''}`}>
                {urlLink(item.url, item.target, item.class, item.title, item.icon, item.id)}
                {item.children.length > 0 && (
                    <ul
                        className={styles.Submenu}
                        onMouseEnter={handleSubmenuMouseEnter}
                        onMouseLeave={handleSubmenuMouseLeave}
                        onClick={handleSubMenuClick}
                    >
                        {item.children.map((child) => (
                            <li key={child.id} className='nav-item'>
                                {renderSubMenuLink(child, item.url)}
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        ));
    };

    useEffect(() => {
        if (openIsMenu) {
            document.body.classList.remove('menu_open');
        }

        if (activeAccordionRef.current) {
            activeAccordionRef.current.classList.remove(styles.activeAccordion);
        }

        activeAccordionRef.current = null;
    }, [openIsMenu]);

    return (
        <>
            <div className={`${styles.panelMenu} panel_menu`}>
                <div className={styles.panel_menu_header}>
                    <img src="/evanhub-logo.png" alt="Logo Evanhub" />
                    <div className="close-panel" onClick={handleMenuClick}>
                        <div className={styles.closePanelIcon}>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.panel_menu_body}>
                    <ul className={styles.Menu}>{renderMenuItems(menuItems)}</ul>

                    <ul className={`${styles.extraMenu} d-block d-sm-block d-md-block d-lg-none`}>
                        {renderMenuItems(lastTwoItems)}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PanelMobile;
