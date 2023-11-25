//Video banner
export const parseVideoData = (data) => {

    return {
        urlVideo: data.url,
        titleVideo: data.title,
        buttonVideo: data.title_button,
        targetButtonVideo: data.target_button,
        typeButtonvideo: data.type_button
    };
};


//Banner Normal
export const parseBannerData = (data) => {

    const {
        banner_desktop: {
            data: {
                attributes: { url: urlBannerLg = '' } = {},
            } = {},
        } = {},
        banner_mobile: {
            data: {
                attributes: { url: urlBannerSm = '' } = {},
            } = {},
        } = {},
        image_banner: {
            data: imageData = {},
        } = {},
        title_banner = '',
        description_banner = '',
        button_title = '',
        button_url = '',
        button_target = '',
        button_class = '',
    } = data || {};

    const urlImage = imageData && imageData.attributes ? imageData.attributes.url || '' : '';

    

    return {
        urlBannerLg,
        urlBannerSm,
        urlImage,
        title_banner,
        description_banner,
        button_title,
        button_url,
        button_target,
        button_class,
    };

};


//Split row
export const parseSplitRowData = (data) => {

    const {
        image: {
            data: {
                attributes: { url: urlImage },
            },
        },
        title,
        description,
        type_button,
        label_button,
        url_button
    } = data;

    return {
        urlImage,
        title,
        description,
        type_button,
        label_button,
        url_button
    };
};


//Middle banner
export const parseBannerMiddleData = (data) => {
    const {
        banner_desktop: {
            data: {
                attributes: { url: urlBannerLg },
            },
        },
        banner_mobile: {
            data: {
                attributes: { url: urlBannerSm },
            },
        },
        icon: {
            data: {
                attributes: { url: iconBanner },
            },
        },
        title_banner,
        classes
    } = data;

    return {
        urlBannerLg,
        urlBannerSm,
        iconBanner,
        title_banner,
        classes
    };
};


//Bannergradient
export const parseBannerGradient = (data) => {

    return {
        id: data.id,
        title: data.title,
        typeButton: data.type_button,
        labelButton: data.label_button,
        urlButton: data.url_button,
        targetButton: data.target_button,
        classButton: data.class_button,
        typeGradient: data.type_gradient
    };
}


//Split-gradient
export const parseSplitGradient = (data) => {

    const {
        image: {
            data: {
                attributes: { url: urlImage },
            },
        },
        title,
    } = data;

    return {
        urlImage,
        title
    };
}



//Infographic steps
export const parseInfographicSteps = (data) => {

    const {
        step: steps,
        title_section,
        show_button,
        label_button,
        url_button,
        target_button,
        type_button
    } = data;

    return {
        steps,
        title_section,
        show_button,
        label_button,
        url_button,
        target_button,
        type_button
    };
}

//Block Content
export const parseBlockContent = (data) => {

    return {
        title_block: data.title_block,
        content_block_rich: data.content_block_rich,
    };
}


//Block Content Text
export const parseBlockContentText = (data) => {

    return {
        content_text: data.content_text,
    };
}


//Grid Teams
export const parseGridTeams = (data) => {

    return {
        title_section: data.title_section,
        items_team: data.items_team
    };
}