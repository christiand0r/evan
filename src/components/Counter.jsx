'use client';

import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const Counter = (props) => {

    const { prefix, quantity } = props;
    const [count, setCount] = useState(0);

    const formattedQuantity = quantity;

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {quantity && <h3><span className='counter'><CountUp end={formattedQuantity} start={0} duration={2} prefix={prefix} separator="." /></span></h3>}
        </>
    );
};


export default Counter;