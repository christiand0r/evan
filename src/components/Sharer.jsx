'use client';

/*
Este componente esta optimizado para el uso en los componentes de noticias (Post), 
ya que se esta usando metadatos dinamicos los cuales es lo que busca 

document.title

Si se desea usar en otra página esta debe tener como minimo el document.title
*/

const Sharer = (props) => {

    const { title, url } = props;

    const shareFacebook = () => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            window.open(`https://www.facebook.com/sharer.php?s=100&p[url]=${encodeURIComponent(window.location.href)}`, 'sharer', 'toolbar=0,status=0,width=620,height=280');
        }
    };

    const shareLinkedIn = () => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            window.open(`http://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`, 'sharer', 'scrollbars=yes,width=800,height=400');
        }
    };

    const shareWhatsApp = () => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${document.title} - ${window.location.href}`)}&title=`, 'sharer', 'scrollbars=yes,width=800,height=400');
        }
    };

    const shareTwitter = () => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}&hashtags=conectamayor&via=ConectaMayor&related=twitterapi,twitter`, 'sharer', 'scrollbars=yes,width=800,height=400');
        }
    };

    return (
        <div className="social-share-wrap">
            <h5 className="text-center fw-bold tertiary__color">Compartir</h5>
            <ul className="social-profile s-rounded s-secondary s-md">
                <li>
                    <button onClick={shareTwitter}>
                        <i className="bi bi-twitter-x"></i>
                    </button>
                </li>
                <li>
                    <button onClick={shareLinkedIn}>
                        <i className="bi bi-linkedin"></i>
                    </button>
                </li>
                <li>
                    <button onClick={shareFacebook}>
                        <i className="bi bi-facebook"></i>

                    </button>
                </li>
                <li>
                    <button onClick={shareWhatsApp} data-action="share/whatsapp/share">
                        <i className="bi bi-whatsapp"></i>
                    </button>
                </li>

            </ul>
        </div>
    );
};

export default Sharer;
