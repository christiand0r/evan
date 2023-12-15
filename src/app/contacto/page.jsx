import Banner from "@/components/banner/Banner";
import FormGeneral from "@/components/form/FormGeneral";

import { getDataContactPage } from "../Apis";
import { parseBannerData } from "../DataParser";

const CMS_HOST_URL = process.env.CMS_HOST;

const ContactPage = async () => {

    const dataResponse = await getDataContactPage();
    const data = dataResponse.data.attributes;

    const banner = parseBannerData(data.banner);
    const form = data.form;

    return (
        <>
            <Banner
                src={CMS_HOST_URL + banner.urlBannerLg}
                src_sm={CMS_HOST_URL + banner.urlBannerSm}
                title={banner.title_banner}
            />
            {form.form_activation && (
                <div className="container-s mb-xxl">
                    <FormGeneral
                        title={form.title}
                        subtitle={form.descripcion}
                        subject={form.subject}
                    />
                </div>
            )}
        </>
    );
};

export default ContactPage;