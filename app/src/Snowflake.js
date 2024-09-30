import React, { useEffect, useRef } from 'react';
import './styles/Snowflake.css';

// source: https://www.youtube.com/watch?v=Qc24mWjS_XY
// I split into different files for better usage in seperate screens
const Snowflake = () => {
    const snowflakeRef = useRef(null);

    useEffect(() => {

        const snowflake = snowflakeRef.current;
        snowflake.style.paddingLeft = `${Math.random() * 10}px`;
        snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`;
        snowflake.style.opacity = `${(Math.random())}`;
        snowflake.style.left = `${Math.random() * 100}vw`;

        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    }, []);

    return <div ref={snowflakeRef} className="snowflake">*</div>;
};

export default Snowflake;
