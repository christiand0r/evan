'use client'

import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import styles from './BlockSideNav.module.css';

const slugify = (text) => {
    if (typeof text !== 'string') {
        return '';
    }

    const from = "ÁÉÍÓÚáéíóú";
    const to   = "AEIOUaeiou";

    const newText = text.split('').map((char, i) => 
        from.indexOf(char) !== -1 ? to[from.indexOf(char)] : char
    ).join('');

    return newText
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

const DropdownSelector = (props) => {

    const { itemsDropdown } = props;
    const [buttonTitle, setButtonTitle] = useState('Seleccione una opción');

    const handleSelect = (selectedItem) => {
        setButtonTitle(selectedItem);
    };

    //console.log(itemsDropdown);

    return (
        <Dropdown onSelect={handleSelect} className={styles.Dropdown}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <span>{buttonTitle}</span> <i className="bi bi-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.DropdownToggle}>
                {itemsDropdown.map((item, index) => {
                    return (
                        <div key={`${index}-group`}>
                            <Dropdown.Item eventKey={item.title_group} key={`${index}-group`} href={`#item_sidenav__${slugify(item.title_group)}`} className={`item_sidenav__${slugify(item.title_group)}`}>
                                {item.title_group}
                            </Dropdown.Item>

                            {item.items &&
                                item.items.map((subItem, subIndex) => {
                                    //console.log(subIndex);
                                    return (
                                        <Dropdown.Item eventKey={subItem} key={`${subIndex}-subitem`} href={`#item_sidenav__${slugify(subItem)}`} className={`item_sidenav__${slugify(subItem)}`}>
                                            {subItem}
                                        </Dropdown.Item>
                                    );
                                })
                            }
                        </div>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownSelector;