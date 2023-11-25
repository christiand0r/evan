'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import CardImage from '@/components/Areas/CardImage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


export const RelatedArea = (props) => {

    const { dataAreas, host } = props;

    return (
        <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={32}
            slidesPerView={3}
            pagination={{ clickable: true }}
            breakpoints={{
                0: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2.5,
                },
                992: {
                  slidesPerView: 3,
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
                                attributes: { url: urlImg },
                            },
                        },
                        epigraph,
                        title,
                        custom_title,
                        short_description,
                        button_title,
                        button_class,
                        button_url,
                    },
                } = area;

                return (

                    <SwiperSlide key={`${id}-${index}`}>
                        <CardImage
                            key={id}
                            img={host + urlImg}
                            epigraph={epigraph}
                            title={custom_title ?? title}
                            excerpt={short_description}
                            buttonProps={{
                                label: button_title,
                                customClass: button_class,
                                url: button_url,
                            }}
                        />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
