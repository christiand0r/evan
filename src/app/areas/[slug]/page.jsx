import { getDataAreas } from "@/app/Apis";
import { parseBannerData, parseInfographicSteps, parseQuote } from "@/app/DataParser";
import Image from "next/image";
import { notFound } from "next/navigation";

import styles from './SingleAreas.module.css';

import Banner from "@/components/banner/Banner";
import Content from "@/components/Content";
import Areas from "@/components/Areas/Areas";
import ContactForm from "@/components/form/formCMS";
import markdownToHtml from "@/lib/markdownToHtml";
import LineStep from "@/components/line-steps/LineSteps";
import SplitingRow from "@/components/spliting-row/SplitingRow";
import GridBenefits from "@/components/grid-benefits/GridBenefits";
import Quote from "@/components/quote/Quote";

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


    // Utilizamos Promise.all para esperar a que todas las conversiones de markdown a HTML se completen
    const components = await Promise.all(filteredAreas.map(async (area) => {

        const attrData = area.attributes;
        const banner = parseBannerData(attrData.banner);
        const form = attrData.form;
        const steps = attrData.steps && parseInfographicSteps(attrData.steps);
        const splitingRow = [attrData?.splitrow]; //Se agrega el splitingRow a un array para que el componente SplitingRow pueda leerlo de esa forma
        const benefits = attrData?.benefits;
        const quote = parseQuote(attrData?.quote);

        const plot = await markdownToHtml(area.attributes.general_content);

        //console.log(attrData.title);
        //console.log(benefits);
        //console.log(benefits.length);

        return (
            <div key={area.id}>
                {banner.urlBannerLg &&
                    <Banner
                        src={CMS_HOST_URL + banner.urlBannerLg}
                        src_sm={CMS_HOST_URL + banner.urlBannerSm}
                        title={banner.title_banner}
                        description_banner={banner.description_banner}
                        customClass={styles.classBanner}
                        customName={attrData.title}
                        buttonProps={{
                            label: banner.button_title,
                            customClass: banner.button_class,
                            url: banner.button_url,
                        }}
                    />
                }
                <div className="container">

                    <div className={styles.evanHubContent}>
                        <Content content={plot} customClass={styles.primaryContent} />
                    </div>

                    {benefits && benefits.length > 0 &&
                        <GridBenefits
                            content={benefits}
                        />
                    }

                    {quote.author_image &&
                        <div className="container-m">
                            <Quote
                                author_image={quote.author_image && CMS_HOST_URL + quote?.author_image}
                                author_name={quote?.author_name}
                                author_position={quote?.author_position}
                                author_message={quote?.author_message}
                                custom_class={styles?.quote_area}
                            />
                        </div>
                    }

                    {splitingRow && splitingRow[0] !== null &&
                        <SplitingRow
                            content={splitingRow}
                            customClass={`${styles.splitingRow}`}
                        />
                    }
                    {steps &&
                        <LineStep
                            titleSection={steps.title_section}
                            steps={steps.steps}
                            showButton={steps.show_button}
                            labelButton={steps.label_button}
                            urlButton={steps.url_button}
                            targetButton={steps.target_button}
                            typeButton={steps.type_button}
                        />
                    }

                    {form?.form_activation === true &&
                        <div className="container-s pb-xxl">
                            <ContactForm
                                title={form.title && form.title}
                                subtitle={form.descripcion && form.descripcion}
                                subject={form.subject != null ? form.subject : area.attributes.title}
                            />
                        </div>
                    }

                </div>

                <section className={styles.relatedArea}>
                    <Areas
                        title_section='Otras áreas de especialización'
                        dataAreasFilter={otherAreas}
                        slideLg={3}
                        slideMd={2}
                        slideSm={1.3}
                        extraClass='container-m'
                    />
                </section>
            </div>
        );
    }));

    return components;
};


export default SingleArea;
