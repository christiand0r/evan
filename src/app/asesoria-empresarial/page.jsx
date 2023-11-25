import Banner from "@/components/banner/Banner";
import SplitRow from "@/components/split-row/SliptRow";
import FormGeneral from "@/components/form/FormGeneral";

import './page.css';

const businessConsulting = () => {
    return (
        <>
            <Banner
                src="https://evanhub.somosforma.dev/_next/image?url=https%3A%2F%2Fevanhub-cms.somosforma.dev%2Fuploads%2Fpoliticas_de_privacidad_lg_6b97f77bbc.jpg&w=3840&q=75"
                src_sm="https://evanhub.somosforma.dev/_next/image?url=https%3A%2F%2Fevanhub-cms.somosforma.dev%2Fuploads%2Fpoliticas_de_privacidad_lg_6b97f77bbc.jpg&w=3840&q=75"
                title="Asesoría Empresarial"
                description_banner="Un personal capacitado y saludable es sinónimo de una empresa eficiente"
            />

            <div className="container">
                <SplitRow
                    image="https://evanhub.somosforma.dev/_next/image?url=https%3A%2F%2Fevanhub-cms.somosforma.dev%2Fuploads%2Fasesoria_empresarial_ab2b6a96ed.png&w=1920&q=75"
                    title_section="El rendimiento laboral y la salud mental van de la mano"
                    description="Para lograr los objetivos que tu empresa se propone, ofrecemos servicios de evaluación de alta calidad. Según destacó el World Economic Forum en 2019 “las intervenciones en salud mental en el lugar de trabajo pueden retornar hasta cuatro dólares por cada dólar invertido, gracias a una mejor productividad y menor ausentismo”. La promoción por la salud mental también puede ser parte de tu cultura organizacional. Contáctanos para conocer las necesidades de tu empresa, organización o entidad."
                />
                <div className="container-s mb-xxl">
                    <FormGeneral
                        title="¿Necesitas asesoría?"
                        subtitle="Completa nuestro formulario para saber más sobre nuestros servicios y beneficios."
                        subject="Asesoría Empresarial"
                    />
                </div>
            </div>
        </>
    );
};

export default businessConsulting;