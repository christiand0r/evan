import GridTeam from "@/components/team-grid/TeamGrid";
import Banner from "@/components/banner/Banner";
import BlockColor from "@/components/block-color/BlockColor";
import SplitRow from "@/components/split-row/SliptRow";
import './page.css';

import { parseGridTeams, parseBlockContent, parseSplitRowData, parseBannerData } from "@/app/DataParser";
import { getDataEquipo } from "@/app/Apis";

const CMS_HOST_URL = process.env.CMS_HOST;

export const metadata = {
    title: 'Equipo',
    description: 'Evanhunb website equipo',
}

const pageEquipo = async () => {

    const dataResponse = await getDataEquipo();
    const data = dataResponse.data.attributes;

    const gridTeam = parseGridTeams(data.team);
    const blockContent = parseBlockContent(data.block_content);
    const splitRow = parseSplitRowData(data.split_row);
    const banner = parseBannerData(data.banner);

    return (
        <>
            <Banner
                src={CMS_HOST_URL + banner.urlBannerLg}
                src_sm={CMS_HOST_URL + banner.urlBannerSm}
                image={CMS_HOST_URL + banner.urlImage}
            />
            <div className="container">
                <BlockColor
                    title={blockContent.title_block}
                    content={blockContent.content_block_rich}
                />
                <GridTeam
                    titleSection={gridTeam.title_section}
                    members={gridTeam.items_team}
                    initialItems={19}
                    hostCms={CMS_HOST_URL}
                />
                <SplitRow
                    customClass="equipo_split_row"
                    image={CMS_HOST_URL + splitRow.urlImage}
                    title={splitRow.title}
                    description={splitRow.description}
                    url_button={splitRow.url_button}
                    label_button={splitRow.label_button}
                    type_button={splitRow.type_button}
                />
            </div>
        </>
    )
}

export default pageEquipo;