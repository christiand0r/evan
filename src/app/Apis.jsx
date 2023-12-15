export const CMS_HOST_URL = process.env.CMS_HOST;
export const PUBLIC_CMS_HOST_URL = process.env.NEXT_PUBLIC_CMS_HOST_URL;

//Menú principal
export const getDataMenuPrimary = async () => {
    try {

        const res = await fetch(`${PUBLIC_CMS_HOST_URL}/api/menus/1?populate[Items][populate][0]=children`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data menu primary');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Top menú
export const getDataTopMenu = async () => {

    //console.log('Fetching data...');
    try {

        const res = await fetch(`${PUBLIC_CMS_HOST_URL}/api/intranet`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data top menu');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
        throw err;
    }

}

//Menú footer
export const getDataMenuFoot = async () => {

    try {

        const resFoot1 = await fetch(`${CMS_HOST_URL}/api/menus/2?nested&populate=*`)
        const resFoot2 = await fetch(`${CMS_HOST_URL}/api/menus/3?nested&populate=*`)
        const resFoot3 = await fetch(`${CMS_HOST_URL}/api/menus/4?nested&populate=*`)
        const resFoot4 = await fetch(`${CMS_HOST_URL}/api/menus/5?nested&populate=*`)

        if (!resFoot1.ok || !resFoot2.ok || !resFoot3.ok || !resFoot4.ok) {
            throw new Error('❌ Failed to fetch data menu foot')
        }

        const data1 = await resFoot1.json();
        const data2 = await resFoot2.json();
        const data3 = await resFoot3.json();
        const data4 = await resFoot4.json();

        return { data1, data2, data3, data4 };

    } catch (err) {
        console.error(err);
    }
}



//Áreas
export const getDataAreas = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/areas?populate[banner][populate]=*&populate[featured_image]=*&populate[form][populate]=*&populate[steps][populate]=*&populate[splitrow][populate][split_image][populate]=*&populate[benefits][populate]=*&populate[quote][populate]=*`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data areas');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Servicios
export const getDataServicios = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/servicios?populate=*`)

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data servicios');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Noticias
export const getDataBlog = async ({ page = 1, category = '', tag = '' }) => {

    try {

        const formattedTag = tag.replace(/-/g, ' ');

        const res = await fetch(`${PUBLIC_CMS_HOST_URL}/api/posts?populate=*&_sort=publishedAt&pagination[pageSize]=6&pagination[page]=${page}${category ? `&filters[categories][name][$eq]=${category}` : ''}${formattedTag ? `&filters[etiquetas][name][$eq]=${formattedTag}` : ''}`)

        if (!res.ok) {
            throw new Error(`❌ Failed to fetch data noticias page. Status: ${res.status}`);
        }

        const { data, meta } = await res.json();
        const { pagination } = meta;

        return { data, pagination };


    } catch (err) {
        console.error(err);
        throw new Error('❌ Failed to fetch data noticias page. See console for details.');
    }
}

export const getAllPosts = async () => {
    const response = await fetch(`${PUBLIC_CMS_HOST_URL}/api/posts?populate=*`);
    const data = await response.json();
    return data;
};




/* --- PAGES --- */

//Home Page
export const getDataHome = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/home?populate[banner_middle][populate]=*&populate[split_row][populate]=*&populate[banner_video][populate]=*&populate[split_gradient][populate]=*&populate[steps][populate]=*&populate=banner_gradient`)

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data home page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Equipo
export const getDataEquipo = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/equipo?populate[banner][populate]=*&populate[block_content][populate]=*&populate[team][populate][items_team][populate]=*&populate[split_row][populate][image][populate]`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data equipo page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}



//Políticas de privacidad
export const getDataPrivacyPolicies = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/politica-de-privacidad?populate[banner][populate]=*&populate[main_content][populate]`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data políticas de privacidad page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Políticas de cookies
export const getDataCookiesPolicies = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/politica-de-cookies?populate[banner][populate]=*&populate[main_content][populate]`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data políticas de cookie page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Términos y condiciones page
export const getDataTermsAndConditions = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/terminos-y-condiciones?populate[banner][populate]=*&populate[sidenav_group][populate]=*`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data términos y condiciones page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}


//Contacto Page
export const getDataContactPage = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/contacto?populate[banner][populate]=*&populate[form][populate]=*`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data contacto page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Términos y condiciones
export const getDataFaqPage = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/pregunta-frecuente?populate[banner][populate]=*&populate[accordions][populate]=*&populate[banner_gradient][populate]=*`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data preguntas frecuentes page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Asesoría Empresarial
export const getDatabusinessConsultingPage = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/asesoria-empresarial?populate[banner][populate]=*&populate[split_row][populate]=*&populate[form][populate]=*`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data Asesoría empresarial page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}


//Sobre Evanhub
export const getAboutPage = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/sobre-evanhub?populate[banner][populate]=*&populate[graphic_title][populate]=*&populate[content_text][populate]=*&populate[quote][populate]=*&populate[spliting_rows][populate]=*&populate[banner_gradient][populate]=*
        `);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data Sobre Evanhub page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//404
export const getNotFound = async () => {
    const response = await fetch(`${PUBLIC_CMS_HOST_URL}/api/not-found?populate=*`);
    const data = await response.json();
    return data;
};


