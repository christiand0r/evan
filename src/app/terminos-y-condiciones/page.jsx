import Banner from "@/components/banner/Banner";
import BlockSideNav from "@/components/block-sidenav/BlockSideNav";
import { parseBannerData } from "@/app/DataParser";
import { getDataTermsAndConditions } from "@/app/Apis";
import './page.css';

const CMS_HOST_URL = process.env.CMS_HOST;

export const metadata = {
    title: 'Términos y condiciones',
    description: 'Evanhun website Términos y condiciones',
}

const TermsAndConditions = async () => {

    const dataResponse = await getDataTermsAndConditions();
    const data = dataResponse.data.attributes;

    const sideNavGroup = data.sidenav_group;

    const sideNavGroupItems = sideNavGroup.map((item) => {
        const sideNavSubItems = item.item_sidenav.map((subItem) => {
            return {
                title: subItem.title_item,
                content: subItem.content_item,
            }
        });
        return {
            title: item.title_group,
            content: item.content_group,
        }
    });

    //console.log(data.sidenav_group);
    //const blockContent = parseBlockContentText(data.main_content);
    const banner = parseBannerData(data.banner);

    return (
        <>
            <Banner 
                src={CMS_HOST_URL + banner.urlBannerLg}
                src_sm={CMS_HOST_URL + banner.urlBannerSm}
                title={banner.title_banner}
                customName={banner.title_banner}
            />
                <BlockSideNav
                    content={sideNavGroup}
                />
        </>
    )
};

export default TermsAndConditions;