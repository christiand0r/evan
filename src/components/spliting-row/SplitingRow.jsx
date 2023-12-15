'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './SplitingRow.module.css';
import markdownToHtml from '@/lib/markdownToHtml';

const CMS_HOST_URL = process.env.NEXT_PUBLIC_CMS_HOST_URL;

const SplitingRow = (props) => {
    const { content, customClass } = props;
    const [splitContent, setSplitContent] = useState([]);

    useEffect(() => {
        const fetchSplitContent = async () => {
            const splitContentPromises = content.map(async (item) => {
                const imgSplit = CMS_HOST_URL + item?.split_image?.data?.attributes?.url;
                const contentSplit = await markdownToHtml(item?.split_content);
                return { imgSplit, contentSplit };
            });

            const resolvedSplitContent = await Promise.all(splitContentPromises);
            setSplitContent(resolvedSplitContent);
        };

        fetchSplitContent();
    }, [content]);

    return (
        content ? (
            <section className={`${customClass} spliting_row_evanhub mb-xxl`}>
                {splitContent.map((item, index) => (
                    <div key={index} className={`${styles.spliting_row} ${item.split_orientation !== 'normal' ? styles.rowReverse : ''}  ${item.split_image?.data == null ? styles.noImage : ''}`}>
                        <div className="spliting-row__content" dangerouslySetInnerHTML={{ __html: item.contentSplit }}></div>
                        {item.imgSplit && item.imgSplit !== CMS_HOST_URL + 'undefined' &&
                            <div className="spliting-row__image">
                                <Image src={item.imgSplit} width={520} height={318} style={{ width: '100%', height: '100%' }} alt="Imagen evanhub" />
                            </div>
                        }
                    </div>
                ))}
            </section>
        ) : null
    );

};

export default SplitingRow;