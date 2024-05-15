'use client';

import { useState, useEffect } from "react";
import markdownToHtml from "@/lib/markdownToHtml";

const Description = (props) => {

    const {description} = props;

    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await markdownToHtml(description);
                setContent(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [description]);

    if (typeof description === 'undefined') {
        return null;
    }

    return <p className="mt-m" dangerouslySetInnerHTML={{ __html: content }} />
}

export default Description;