'use client'

import React, {useState } from 'react';
//const toggleBtn = document.querySelector('.btn-toggle_volumen');


const BtnVolume = ({classModule, onMuteChange}) => {

    const [muted,setMuted] = useState(true);

    //let isMuted = true;

    function mute() {
        setMuted(!muted)
        onMuteChange(!muted);
     }
    

    return(
        <p className={`btn-toggle_volumen mb-0 ${classModule}`} onClick={mute}>
            {muted ? (<i className="bi bi-volume-mute"></i>) : (<i className="bi bi-volume-up"></i>)}
        </p> 
    )
}

export default BtnVolume;