import { getDataAreas } from "@/app/Apis";
import Banner from "@/components/banner/Banner";
import Content from "@/components/Content";
import Areas from "@/components/Areas/Areas";
import styles from './SingleAreas.module.css';

import FormGeneral from "@/components/form/FormGeneral";

import Image from "next/image";
import { notFound } from "next/navigation";

import markdownToHtml from "@/lib/markdownToHtml";

const CMS_HOST_URL = process.env.CMS_HOST;

const SingleArea = async ({ params }) => {
    const dataResponse = await getDataAreas();
    const dataAreas = dataResponse.data;

    const filteredAreas = dataAreas.filter(
        (area) => area.attributes.url === params.slug
    );

    if (filteredAreas.length === 0) {
        return notFound();
    }

    const otherAreas = dataAreas.filter(
        (area) => area.attributes.url !== params.slug
    );

    //console.log(dataAreas);

    // Utilizamos Promise.all para esperar a que todas las conversiones de markdown a HTML se completen
    const components = await Promise.all(filteredAreas.map(async (area) => {

        const plot = await markdownToHtml(area.attributes.general_content);
        const plotAux = await markdownToHtml(area.attributes.auxiliar_content);

        //console.log(area.attributes.custom_title);

        return (
            <div key={area.id}>
                <Banner
                    src={CMS_HOST_URL + area.attributes.banner_desktop.data.attributes.url}
                    title={area.attributes.title}
                    description_banner={area.attributes.description_banner}
                    customName={area.attributes.custom_title}
                    buttonProps={{
                        label: area.attributes.button_title,
                        customClass: area.attributes.button_class,
                        url: area.attributes.button_url,
                    }}
                />

                <div className="container">
                    <div className={styles.evanHubContent}>
                        <Content content={plot} customClass={styles.primaryContent} />
                        <Content content={plotAux} customClass={styles.auxContent} />
                    </div>
                </div>

                {area.attributes.form_activation === true &&
                    <div className="container-m pt-xxl pb-xxl">
                        <FormGeneral title="Título formulario" subtitle="Para saber más acerca de nuestros servicios en evaluación jurídica rellena nuestro formulario:" subject={area.attributes.title}/>
                    </div>
                }

                <section className={styles.relatedArea}>
                    <Areas dataAreasFilter={otherAreas} slideLg={3} slideMd={2} slideSm={1.3} extraClass='container-m' />
                </section>



            </div>
        );
    }));

    return components;
};

export default SingleArea;
