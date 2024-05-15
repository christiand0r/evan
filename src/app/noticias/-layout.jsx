import '@/app/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BannerSplitGradient from '@/components/banner-split-gradient/BannerSplitGradient';
import { getDataBlog } from '../Apis';

export default async function RootLayout({ children }) {

    const fetchData = async () => {

        let requestData = {
            page: page,
            pageSize: dataPagination ? dataPagination.pageSize : 1
        };

        const { data: dataBlog, pagination: fetchedPagination } = await getDataBlog(requestData);
        const dataFeaturedPost = dataBlog && dataBlog.filter((item) => item.attributes.featured_post === true).splice(0, 1)[0];

        return dataFeaturedPost;
    };

    const dataFeaturedPost = await fetchData();

    return (
        <>
            <BannerSplitGradient
                src={dataFeaturedPost && CMS_HOST_URL + dataFeaturedPost.attributes.featured_image.data?.attributes.url}
                title={dataFeaturedPost && dataFeaturedPost.attributes.title}
                description_banner={dataFeaturedPost && dataFeaturedPost.attributes.short_content}
                gradient=""
                buttonProps={{
                    label: 'Leer artículo',
                    target: '_self',
                    url: dataFeaturedPost && `/noticias/${Slugify(dataFeaturedPost.attributes.title)}`,
                    type: 'outline secondary'
                }}
            />
            {children}
        </>
    )
}

