import Banner from "@/components/banner/Banner";
import SplitRow from "@/components/split-row/SliptRow";
import ContactForm from "@/components/form/formCMS";

import { getDatabusinessConsultingPage } from "../Apis";
import { parseBannerData, parseSplitRowData } from "../DataParser";

import styles from './page.css';

const CMS_HOST_URL = process.env.CMS_HOST;

const businessConsulting = async () => {

    const dataResponse = await getDatabusinessConsultingPage();
    const data = dataResponse.data.attributes;

    const banner = parseBannerData(data.banner);
    const splitRow = parseSplitRowData(data.split_row);
    const form = data.form;

    return (
        <>
            <Banner
                src={CMS_HOST_URL + banner.urlBannerLg}
                src_sm={CMS_HOST_URL + banner.urlBannerSm}
                title={banner.title_banner}
                description_banner={banner.description_banner}
            />

            <div className="container">
                <SplitRow
                    image={CMS_HOST_URL + splitRow.urlImage}
                    title_section={splitRow.title_section}
                    description={splitRow.description}
                    customClass="split_row asesoria_split_row"
                />
                {form.form_activation && (
                    <div className="container-s mb-xxl">
                        <ContactForm
                            title={form.title}
                            subtitle={form.descripcion}
                            subject={form.subject}
                        />
                    </div>
                )}

            </div>
        </>
    );
};

export default businessConsulting;