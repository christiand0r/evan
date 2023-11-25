export const parseAreaData = (data) => {
    const {
        attributes: {
            featured_image: {
                data: {
                    attributes: { url: urlImg },
                },
            },
            id,
            epigraph,
            title,
            custom_title,
            short_description,
            button_title,
            button_class,
            button_url,
        },
    } = data;


    return {
        urlImg,
        id,
        epigraph,
        title,
        custom_title,
        short_description,
        button_title,
        button_class,
        button_url,
    };

}
