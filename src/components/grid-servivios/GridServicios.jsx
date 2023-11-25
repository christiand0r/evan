//import '@/styles/components/gridservicios.css'


import CardIcon from './CardIcon';
import { getDataServicios } from '@/app/Apis';
import style from './GirdServicios.module.css';

const CMS_HOST_URL = process.env.CMS_HOST;

const GridServicios = async () => {

    const dataResponse = await getDataServicios();
    const dataServicios = dataResponse.data;

    //console.log(dataResponse);

    return (
        <section className='servicios pt-xxl'>
            <div className='container'>
                <h2 className='text-center display-large color-01 secondary-font mb-xl'>¿Porqué tomar una evaluación con Evanhub?</h2>
                <div className={` ${style.GridCard} grid-card-4 mt-xl`}>
                    {dataServicios.map((servicio) => {

                        const {
                            attributes: {
                                icon: {
                                    data: {
                                        attributes: { url: urlIcon },
                                    },
                                },
                                id,
                                title,
                                description,
                            },
                        } = servicio;


                        return (
                            <CardIcon
                                key={id}
                                icon={CMS_HOST_URL + urlIcon}
                                title={title}
                                excerpt={description}
                            />
                        );
                    })}

                </div>
            </div>
        </section>
    );
}

export default GridServicios;