import CardImage from './CardImage';
import { SlideArea } from './SlideArea';
import styles from './Areas.module.css'

import { getDataAreas } from '@/app/Apis';

const Areas = async (props) => {

    const {dataAreasFilter, slideLg, slideMd, slideSm, extraClass, title_section } = props;

    const dataResponse = await getDataAreas()
    const dataAreas = (dataResponse.data);

    return (
        <div className={`container ${extraClass}`}>
            {title_section && <h2 className="text-center display-large color-01 secondary-font">{title_section}</h2>}
            <div className='mt-xl column-gap-32'>
                <SlideArea 
                    dataAreas={dataAreasFilter ?? dataAreas} 
                    slideLg={slideLg} 
                    slideMd={slideMd} 
                    slideSm={slideSm}
                />
            </div>
        </div>
    );
}

export default Areas;