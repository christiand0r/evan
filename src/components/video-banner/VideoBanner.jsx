'use client'

import React, {useState } from 'react';

import styles from './VideoBanner.module.css'
import Button from '../Button';
import Video from '../Video';


const VideoBanner = (props) => {

    const { urlVideo, titleBanner, titleButton, targetButton, typeButton } = props;
    const [muted,setMuted] = useState(true);

    function mute() {
        setMuted(!muted)
     }
    
    return (
        <div className={styles.bannerVideo}>
            <Video link={urlVideo} muted={muted} autoplay={true} loop={true} />
            <div className='container'>
                <div className={styles.infoBanner}>
                    <h1 className="display-small text-center">{titleBanner}</h1>
                    <Button 
                        style={styles.buttonBanner} 
                        label={titleButton} 
                        href={targetButton} 
                        type={typeButton}
                    />
                    <p className={`btn-toggle_volumen mb-0 ${styles.btnToggleVolumen}`} onClick={mute}>
                        {muted ? (<i className="bi bi-volume-mute"></i>) : (<i className="bi bi-volume-up"></i>)}
                    </p> 
                </div>
            </div>
        </div>
    );
};


export default VideoBanner;



