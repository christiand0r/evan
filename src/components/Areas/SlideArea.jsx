'use client'

import { usePathname } from 'next/navigation'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import CardImage from '@/components/Areas/CardImage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


export const SlideArea = (props) => {

    const { dataAreas, host, slideLg, slideMd, slideSm } = props;

    const perViewLg = slideLg ?? 3;
    const perViewMd = slideMd ?? 2;
    const perViewSm = slideSm ?? 1;

    //console.log(dataAreas[0]);
    const currentPath = usePathname();
    //console.log(usePathname());
    return (
        <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={32}
            slidesPerView={perViewLg}
            //loop={dataAreas.length >= perViewLg * 2 ? true : false}
            pagination={{ clickable: true }}
            breakpoints={{
                0: {
                  slidesPerView: perViewSm,
                  loop: true,
                },
                768: {
                  slidesPerView: perViewMd,
                  loop: true,
                },
                992: {
                  slidesPerView: perViewLg, 
                  loop: dataAreas.length >= perViewLg * 2 ? true : false,
                },
              }}
            //onSwiper={(swiper) => console.log(swiper)}
            //onSlideChange={() => console.log('slide change')}
        >
            {dataAreas.map((area, index) => {

                ;
                const {
                    id,
                    attributes: {
                        featured_image: {
                            data: {
                                attributes: { url: urlImg },
                            },
                        },
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
                            img={host + urlImg}
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
