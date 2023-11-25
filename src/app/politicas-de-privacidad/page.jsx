import Banner from "@/components/banner/Banner";
import BlockText from "@/components/block-text/BlockText";
import { parseBlockContentText, parseBannerData } from "@/app/DataParser";
import { getDataPrivacyPolicies } from "@/app/Apis";

const CMS_HOST_URL = process.env.CMS_HOST;

export const metadata = {
    title: 'Políticas de privacidad',
    description: 'Evanhun website politicas de privacidad',
}

const PrivacyPolicies = async () => {

    const dataResponse = await getDataPrivacyPolicies();
    const data = dataResponse.data.attributes;

    const blockContent = parseBlockContentText(data.main_content);
    const banner = parseBannerData(data.banner);

    return (
        <>
            <Banner
                src={CMS_HOST_URL + banner.urlBannerLg}
                src_sm={CMS_HOST_URL + banner.urlBannerSm}
                title={banner.title_banner}
                customName={banner.title_banner}
            />
            <div className="container">
                <BlockText
                    content={blockContent.content_text}
                />
            </div>
        </>
    )
};

export default PrivacyPolicies;