import AccordionsEhub from "@/components/accordion/Accordion";
import Areas from "@/components/Areas/Areas";
import Banner from "@/components/banner/Banner";
import BannerGradient from "@/components/banner-gradient/BannerGradient";
import './page.css';

import { getDataFaqPage } from "../Apis";
import { parseBannerGradient, parseBannerData } from "../DataParser";

const CMS_HOST_URL = process.env.CMS_HOST;

const FaqPage = async () => {

    const dataResponse = await getDataFaqPage();
    const data = dataResponse.data.attributes;

    const banner = parseBannerData(data.banner);
    const bannerGradientData = parseBannerGradient(data.banner_gradient);
    const AccordionData = data.accordions;

    return (
        <>
            <Banner
                src={CMS_HOST_URL + banner.urlBannerLg}
                src_sm={CMS_HOST_URL + banner.urlBannerSm}
                title={banner.title_banner}
            />
            <div className="container-l">
                <AccordionsEhub
                    title_section={AccordionData.title_section}
                    content={AccordionData.item_accordion}
                />
            </div>
            <div className="container">
                <BannerGradient
                    title={bannerGradientData.title}
                    type_gradient={bannerGradientData.typeGradient}
                    type_button={bannerGradientData.typeButton}
                    label_button={bannerGradientData.labelButton}
                    url_button={bannerGradientData.urlButton}
                    target_button={bannerGradientData.targetButton}
                    class_button={bannerGradientData.classButton}
                />
            </div>
            <div className="bg-neutral-15 pt-xxl pb-xxl">
                <Areas
                    slideLg="4"
                    slideMd="3"
                    slideSm="1.2"
                />
            </div>
        </>

    );
};

export default FaqPage;