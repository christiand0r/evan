import CardImage from './CardImage';
import { SlideArea } from './SlideArea';
import styles from './Areas.module.css'

import { getDataAreas } from '@/app/Apis';

const CMS_HOST_URL = process.env.CMS_HOST;
//import '../../styles/components/areas.css'

const Areas = async (props) => {

    const {dataAreasFilter, slideLg, slideMd, slideSm, extraClass } = props;

    const dataResponse = await getDataAreas()
    const dataAreas = (dataResponse.data);

    return (
        <div className={`container ${extraClass}`}>
            <h2 className="text-center display-large color-01 secondary-font">Conoce nuestras áreas de especialización</h2>
            <div className='mt-xl column-gap-32'>
                <SlideArea 
                    dataAreas={dataAreasFilter ?? dataAreas} 
                    host={CMS_HOST_URL} 
                    slideLg={slideLg} 
                    slideMd={slideMd} 
                    slideSm={slideSm}
                />
            </div>
        </div>
    );
}

export default Areas;