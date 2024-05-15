'use client'

import { usePathname } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, A11y } from 'swiper/modules';
import CardImage from '@/components/Areas/CardImage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CMS_HOST_URL = process.env.NEXT_PUBLIC_CMS_HOST_URL

export const SlideArea = (props) => {

    const { dataAreas, slideLg, slideMd, slideSm } = props;

    const perViewLg = slideLg ?? 3;
    const perViewMd = slideMd ?? 2;
    const perViewSm = slideSm ?? 1;

    const currentPath = usePathname();

    return (
        <Swiper
            modules={[Pagination, Navigation, A11y]}
            spaceBetween={32}
            slidesPerView={perViewLg}
            threshold={20}
            //loop={dataAreas.length >= perViewLg * 2 ? true : false}
            navigation
            pagination={{ 
                clickable: true,  
                type: 'fraction'
            }}
            breakpoints={{
                0: {
                    slidesPerView: perViewSm,
                    loop: true,
                },
                768: {
                    slidesPerView: perViewMd,
                    loop: true,
                },
                1024: {
                    slidesPerView: perViewLg,
                    loop: dataAreas.length >= perViewLg * 2 ? true : false,
                },
            }}
        //onSwiper={(swiper) => console.log(swiper)}
        //onSlideChange={() => console.log('slide change')}
        >
            {dataAreas.map((area, index) => {
                const {
                    id,
                    attributes: {
                        featured_image: {
                            data: {
                                attributes: { url: urlImg } = {},
                            } = {},
                        } = {},
                        url,
                        epigraph,
                        title,
                        custom_title,
                        short_description,
                        button_title,
                        button_class,
                        button_url,
                    },
                } = area;

                const areaUrl = currentPath.includes('areas/') ? url.replace('areas/', '') : `areas/${url}`;

                return (

                    <SwiperSlide key={`${id}-${index}`}>
                        <CardImage
                            key={id}
                            img={CMS_HOST_URL + urlImg}
                            epigraph={epigraph}
                            title={custom_title ?? title}
                            excerpt={short_description}
                            buttonProps={{
                                label: 'Conocer más',
                                customClass: button_class,
                                url: areaUrl,
                            }}
                        />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
