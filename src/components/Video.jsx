const Video = (props) => {
    const { link = '', autoplay = false, muted = false, loop = false } = props;
  
    return (
      <video width="100%" height="auto" autoPlay={autoplay} muted={muted} loop={loop} playsInline>
        <source src={link} type="video/mp4" />
        {/*Se coloca el elemento track a pedido de google, pero no tenemos subtitulos */}
        <track kind="captions" src="empty.vtt" srcLang="es" label="Sin subtítulos" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    );
  };
  
  export default Video;