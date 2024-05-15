'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import style from './Header.module.css';

const ItemMenu = ({ id, children, item, icon, classes, target, url }) => {
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest(`.${style.MainContainer}`)) {
      setIsHovered(false);
    }
  };

  const handleSubmenuMouseEnter = () => setIsHovered(true);

  const handleSubmenuMouseLeave = (e) => {
    if (!e.relatedTarget || typeof e.relatedTarget.closest !== 'function' || !e.relatedTarget.closest(`.${style.MainContainer}`)) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth < 1200 && document.body.classList.contains('menu_open'));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = () => {
    if (window.innerWidth < 1200) {
      setIsActive((prev) => !prev);
    }
  };

  const handleBodyClick = () => {
    document.body.classList.remove('menu_open');
    setIsMenuOpen((prev) => !prev);
  };

  const handleSubMenuClick = () => {
    setIsHovered(false);
    document.body.classList.remove('menu_open');
  };

  const renderSubMenuLink = (child) => {
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

  const urlLink =
    url === '#' ? (
      <button
        className={`${style.buttonNav} ${classes || ''} ${isActive ? style.activeAccordion : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleItemClick}
      >
        {item} {renderIcon(icon)}
      </button>
    ) : (
      <Link href={url} target={target} className={classes} onClick={handleBodyClick}>
        {item} {renderIcon(icon)}
      </Link>
    );

  return (
    <li key={id} className={`nav-item nav_id_4${id} ${isHovered ? style.Show : ''}`}>
      {urlLink}
      {children.length > 0 && (
        <ul
          className={style.Submenu}
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
          onClick={handleSubMenuClick}
        >
          {children.map((child) => (
            <li key={child.id} className='nav-item'>
              {renderSubMenuLink(child)}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default ItemMenu;