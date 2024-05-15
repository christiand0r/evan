//Video banner
export const parseVideoData = (data) => {

    return {
        urlVideo: data.url,
        titleVideo: data.title,
        buttonVideo: data.title_button,
        targetButtonVideo: data.target_button,
        typeButtonvideo: data.type_button,
        buttons: data.buttons,
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
                attributes: { url: urlImage } = {},
            } = {},
        } = {},
        title,
        description,
        type_button,
        label_button,
        url_button,
        title_section
    } = data;

    return {
        urlImage,
        title,
        description,
        type_button,
        label_button,
        url_button,
        title_section
    };
};

//Middle banner
export const parseBannerMiddleData = (data) => {
    const {
        banner_desktop: {
            data: {
                attributes: { url: urlBannerLg } = {},
            } = {},
        } = {},
        banner_mobile: {
            data: {
                attributes: { url: urlBannerSm } = {},
            } = {},
        } = {},
        icon: {
            data: {
                attributes: { url: iconBanner } = {},
            } = {},
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
    const {
        bg_image:{
            data:{
                attributes: { url: bgImage },
            } = {},
        } = {},
        bg_img_mobile: {
            data: {
                attributes: { url: bgImageMobile },
            } = {},
        } = {},
        id,
        title,
        type_button: buttonType,
        label_button: buttonLabel,
        url_button: buttonUrl,
        target_button: buttonTarget,
        class_button: buttonClass,
        type_gradient: gradientType
    } = data || {};

    return {
        bgImage,
        bgImageMobile,
        id,
        title,
        buttonType,
        buttonLabel,
        buttonUrl,
        buttonTarget,
        buttonClass,
        gradientType,
    };
};

//Split-gradient
export const parseSplitGradient = (data) => {

    const {
        image: {
            data: {
                attributes: { url: urlImage },
            },
        },
        bgImage:{
            data:{
                attributes: { url: bgImage },
            } = {},
        } = {},
        bgImageMobile:{
            data:{
                attributes: { url: bgImageMobile },
            } = {},
        } = {},
        title,
    } = data;

    return {
        urlImage,
        title,
        bgImage,
        bgImageMobile
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

//Grid Teams
export const parseGraphicTitle = (data) => {

    return {
        title: data.title,
        prefix: data.prefix,
        quantity_number: data.quantity_number
    };
}

//Quote
export const parseQuote = (data) => {

    if (!data) {
        return {
            author_image: null,
            author_name: null,
            author_position: null,
            author_message: null,
        };
    }

    const {
        imagen_quote: {
            data: {
                attributes: { url: author_image } = {},
            } = {},
        } = {},
        author_name,
        author_position,
        author_message,
    } = data;

    return {
        author_image,
        author_name,
        author_position,
        author_message,
    };
}