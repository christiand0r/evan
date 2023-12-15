// TitleComponent.js
import React, { useEffect, useState } from 'react';
import TitleContext from './titleContext';

const TitleComponent = () => {

    const [title, setTitle] = useState('');

    useEffect(() => {
        const titleElement = document.querySelector('.title-page');
    if (titleElement) {
        const titleText = titleElement.textContent.trim();
        setTitle(titleText);
    }
    }, []);

    return (
        <TitleContext.Provider value={title}>
            <h2 className='title-page'>{title}</h2>
        </TitleContext.Provider>
    );
};

export default TitleComponent;