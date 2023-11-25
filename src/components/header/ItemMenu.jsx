'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";


import style from './Header.module.css'


const ItemMenu = (props) => {

    const { id, children, item, icon, classes, target, url } = props;
    //const combinedClasses = `${style.AnchorFit} ${classes || ''}`;

    const [isActive, setIsActive] = useState(false);
    const [hasChildren, setHasChildren] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.body.classList.contains('menu_open');
        }
        return false;
    });

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.remove('menu_open');
        } 
    }, [isMenuOpen]);


    //Referencia a los los padres
    const handleItemClick = () => {
        if(window.innerWidth < 992) {
            setIsActive(prevState => !prevState);
        }

        setHasChildren(prevStateChildren => !prevStateChildren);
    }

    //Este solo aplica a los Link de pirmer nivel
    const handleBodyClick = () => {
        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
    }
    

    const renderIcon = (iconItem) => {
        if (iconItem) {
            return <span dangerouslySetInnerHTML={{ __html: iconItem }} />;
        }
        return null;
    };

    const urlLink = url === '#' ? (<button className={`${style.buttonNav} ${classes} ${isActive ? style.activeAccordion : ''}`} onClick={handleItemClick}>{item} {renderIcon(icon)}</button>) : (<Link href={url} target={target} className={classes} onClick={handleBodyClick}>{item} {renderIcon(icon)}</Link>);

    return (
        <li key={id} className={`nav-item ${hasChildren ? style.Show : ''}`} >

            {urlLink}

            {children.length > 0 && (
                <ul className={style.Submenu}>
                    {children.map((child) => (
                        <ItemSubMenu key={child.id} children={child.children} item={child.title} url={child.url} classes={child.class} target={child.target} />
                    ))}
                </ul>
            )}
        </li>
    );
}


const ItemSubMenu = (props) => {

    const { item, classes, target, url } = props;

    return (
        <li className='nav-item'>
            <Link href={url || '#'} target={target} className={classes} >
                {item}
            </Link>
        </li>
    );
};




export default ItemMenu;



