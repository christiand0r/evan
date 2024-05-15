'use client'

import React, { useState } from 'react';

import styles from './VideoBanner.module.css'
import Button from '../Button';
import Video from '../Video';


const VideoBanner = (props) => {

    const { urlVideo, titleBanner, infoButtons } = props;
    const [muted, setMuted] = useState(true);

    function mute() {
        setMuted(!muted)
    }

    return (
        <div className={styles.bannerVideo}>
            <Video link={urlVideo} muted={muted} autoplay={true} loop={true}/>
            <div className='container position-relative'>
                <div className={styles.infoBanner}>
                    <h1 className="display-small text-center">{titleBanner}</h1>
                    <div className={styles.buttonsBanner}>
                        {infoButtons && infoButtons.map((item, index) => {
                            return (

                                <Button
                                    key={item.id}
                                    style={styles.buttonBanner}
                                    label={item.title_button}
                                    target={item.target_button}
                                    url={item.url_button}
                                    type={item.type_button}
                                />
                            );
                        })}
                    </div>
                    <p className={`btn-toggle_volumen mb-0 ${styles.btnToggleVolumen}`} onClick={mute}>
                        {muted ? (<i className="bi bi-volume-mute"></i>) : (<i className="bi bi-volume-up"></i>)}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default VideoBanner;



