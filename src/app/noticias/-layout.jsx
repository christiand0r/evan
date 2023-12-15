import '@/app/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BannerSplitGradient from '@/components/banner-split-gradient/BannerSplitGradient';

export default function RootLayout({ children }) {
    return (
        <>
            <BannerSplitGradient
                src="https://evanhub.somosforma.dev/_next/image?url=https%3A%2F%2Fevanhub-cms.somosforma.dev%2Fuploads%2Fpoliticas_de_privacidad_lg_6b97f77bbc.jpg&w=3840&q=75"
                src_mobile="https://evanhub.somosforma.dev/_next/image?url=https%3A%2F%2Fevanhub-cms.somosforma.dev%2Fuploads%2Fpoliticas_de_privacidad_lg_6b97f77bbc.jpg&w=3840&q=75"
                title="Neuroeficiencia laboral"
                description_banner="La importante conexión de la salud metal con el rendimiento en el trabajo."
                gradient=""
                buttonProps={{
                    label: 'Ver más',
                    target: '_self',
                    url: '#',
                    type: 'outline secondary'
                }}
            />
            {children}
        </>
    )
}

