const Video = (props) => {
    const { link = '', autoplay = false, muted = false, loop = false } = props;
  
    return (
      <video width="100%" height="auto" autoPlay={autoplay} muted={muted} loop={loop} playsInline>
        <source src={link} type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>
    );
  };
  
  export default Video;