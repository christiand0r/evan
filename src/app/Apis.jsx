export const CMS_HOST_URL = process.env.CMS_HOST;

//Menú principal
export const getDataMenuPrimary = async () => {
    try {

        const res = await fetch(`${CMS_HOST_URL}/api/menus/1?populate[Items][populate][0]=children`);

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

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/intranet`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data top menu');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
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

        const res = await fetch(`${CMS_HOST_URL}/api/areas?populate=*`);

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
            throw new Error('❌ Failed to fetch data home page');
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
            throw new Error('❌ Failed to fetch data home page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Políticas de privacidad
export const getDataCookiesPolicies = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/politica-de-cookies?populate[banner][populate]=*&populate[main_content][populate]`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data home page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}

//Términos y condiciones
export const getDataTermsAndConditions = async () => {

    try {

        const res = await fetch(`${CMS_HOST_URL}/api/terminos-y-condiciones?populate[banner][populate]=*&populate[sidenav_group][populate]=*`);

        if (!res.ok) {
            throw new Error('❌ Failed to fetch data home page');
        }

        const data = await res.json();

        return data;

    } catch (err) {
        console.error(err);
    }
}