import Banner from "@/components/banner/Banner";
import BlockColor from "@/components/block-color/BlockColor";
import Quote from "@/components/quote/Quote";
import SplitingRow from "@/components/spliting-row/SplitingRow";
import BannerGradient from "@/components/banner-gradient/BannerGradient";
import GraphicTitle from "@/components/graphic-title/GraphicTitle";
import { getAboutPage } from "../Apis";
import { parseBannerData, parseGraphicTitle, parseBlockContentText, parseQuote, parseBannerGradient } from "../DataParser";
import './page.css'

const CMS_HOST_URL = process.env.CMS_HOST;

const About = async () => {

    const dataResponse = await getAboutPage();
    const data = dataResponse.data.attributes;

    const banner = parseBannerData(data.banner);
    const graphic = parseGraphicTitle(data.graphic_title);
    const blockContent = parseBlockContentText(data);
    const quote = parseQuote(data.quote);
    const splitingRows = data.spliting_rows;
    const bannerGradient = parseBannerGradient(data.banner_gradient);

    //console.log(bannerGradient.bgImage);

    return (
        <div className="">
            <Banner
                src={CMS_HOST_URL + banner.urlBannerLg}
                src_sm={CMS_HOST_URL + banner.urlBannerSm}
                title={banner.title_banner}
                description_banner={banner.description_banner}
                customClass="banner_about"
            />
            <div className="container-m">
                <GraphicTitle
                    title={graphic.title}
                    prefix={graphic.prefix}
                    quantity={graphic.quantity_number}
                />
            </div>
            <div className="container">
                <BlockColor
                    content={blockContent.content_text.content_block_rich}
                />
            </div>
            <div className="container-l">
                <Quote
                    author_image={CMS_HOST_URL + quote.author_image}
                    author_name={quote.author_name}
                    author_position={quote.author_position}
                    author_message={quote.author_message}
                />
            </div>
            <div className="container">
                <SplitingRow
                    content={splitingRows}
                />
            </div>
            <BannerGradient
                custom_class="pb-xxl pt-xxl banner_gradient_about"
                bg_image={CMS_HOST_URL + bannerGradient.bgImage}
                bg_image_mobile={CMS_HOST_URL + bannerGradient.bgImageMobile}
                title={bannerGradient.title}
                type_gradient={bannerGradient.gradientType}
                type_button={bannerGradient.buttonType}
                label_button={bannerGradient.buttonLabel}
                url_button={bannerGradient.buttonUrl}
            />
        </div>
    );
};



export default About;