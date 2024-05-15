import VideoBanner from "@/components/video-banner/VideoBanner";
import Areas from '@/components/Areas/Areas';
import GridServicios from '@/components/grid-servivios/GridServicios';
import BannerMiddle from '@/components/banner-middle/BannerMiddle';
import SplitRow from "@/components/split-row/SliptRow";
import BannerGradient from '@/components/banner-gradient/BannerGradient';
import LineStep from "@/components/line-steps/LineSteps";
import SplitGradient from "@/components/split-gradient/SplitGradient";
import styles from './page.module.css';

import { getDataHome } from "./Apis";
import { parseVideoData, parseBannerMiddleData, parseSplitRowData, parseBannerGradient, parseSplitGradient, parseInfographicSteps } from "./DataParser";

export const metadata = {
  title: 'Evanhub Home',
  description: 'Evanhub website home page',
}

const CMS_HOST_URL = process.env.CMS_HOST;

const Home = async () => {

  const dataResponse = await getDataHome();

  const videoData = parseVideoData(dataResponse.data.attributes.banner_video);
  const bannerMiddleData = parseBannerMiddleData(dataResponse.data.attributes.banner_middle);
  const splitRowData = parseSplitRowData(dataResponse.data.attributes.split_row);
  const bannerGradientData = parseBannerGradient(dataResponse.data.attributes.banner_gradient);
  const splitGradientData = parseSplitGradient(dataResponse.data.attributes.split_gradient);
  const stepsData = parseInfographicSteps(dataResponse.data.attributes.steps);

  //console.log(dataResponse.data.attributes.banner_gradient);
  //console.log(bannerGradientData);
  return (
    <main className='main'>
      <div className='fullwidth'>
        <VideoBanner 
            urlVideo={videoData.urlVideo} 
            titleBanner={videoData.titleVideo} 
            infoButtons={videoData.buttons}
        />
        <Areas
            title_section='Conoce nuestras áreas de especialización' 
            slideLg={4} 
            slideMd={2.3} 
            slideSm={1.3} 
            extraClass='pt-xxl' 
        />
        <GridServicios />
        <SplitGradient 
            urlImage={CMS_HOST_URL + splitGradientData.urlImage}
            title={splitGradientData.title}
            bgImage={CMS_HOST_URL + splitGradientData.bgImage}
            bgImageMobile={CMS_HOST_URL + splitGradientData.bgImageMobile}
        />
        <LineStep 
            steps={stepsData.steps} 
            titleSection={stepsData.title_section}
            showButton={stepsData.show_button}
            labelButton={stepsData.label_button}
            urlButton={stepsData.url_button}
            targetButton={stepsData.target_button}
            typeButton={stepsData.type_button}
        />
        <BannerMiddle 
            banner={CMS_HOST_URL + bannerMiddleData.urlBannerLg} 
            banner_sm={CMS_HOST_URL + bannerMiddleData.urlBannerSm} 
            title={bannerMiddleData.title_banner} 
            image={CMS_HOST_URL + bannerMiddleData.iconBanner} 
            customClass={bannerMiddleData.classes} 
        />
        <SplitRow 
            image={CMS_HOST_URL + splitRowData.urlImage} 
            title={splitRowData.title} 
            description={splitRowData.description} 
            url_button={splitRowData.url_button} 
            label_button={splitRowData.label_button} 
            type_button={splitRowData.type_button} 
        />
        <BannerGradient 
            title={bannerGradientData.title} 
            type_gradient={bannerGradientData.gradientType} 
            type_button={bannerGradientData.buttonType} 
            label_button={bannerGradientData.buttonLabel} 
            url_button={bannerGradientData.buttonUrl} 
            target_button={bannerGradientData.buttonTarget} 
            class_button={bannerGradientData.buttonClass} 
            custom_class={styles.BannerGradient}
            bg_image={CMS_HOST_URL + bannerGradientData.bgImage}
            bg_image_mobile={CMS_HOST_URL + bannerGradientData.bgImageMobile}
        />
      </div>
    </main>
  )
}


export default Home;
