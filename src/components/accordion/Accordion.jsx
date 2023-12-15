'use client'

import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import markdownToHtml from '@/lib/markdownToHtml';

import styles from './Accordion.module.css';

const AccordionsEhub = (props) => {

    const { title_section, content } = props;
    const [plots, setPlots] = useState([]);

    useEffect(() => {
        const fetchPlots = async () => {
            const newPlots = await Promise.all(content.map(item => markdownToHtml(item.content)));
            setPlots(newPlots);
        };

        fetchPlots();
    }, [content]);

    return (
        <section className={`${styles.Accordion} accordion_evanhub mb-xxl`}>
            {title_section && <h2 className='text-center display-large color-01 secondary-font mb-xl'>{title_section}</h2>}
            <div className="accordion">
                <Accordion defaultActiveKey="0">
                    {content && content.map((item, index) => (
                        <Accordion.Item eventKey={index} key={index} className={styles.AccordionItem}>
                            <Accordion.Header>{item.title}</Accordion.Header>
                            <Accordion.Body dangerouslySetInnerHTML={{ __html: plots[index] || '' }}></Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default AccordionsEhub;