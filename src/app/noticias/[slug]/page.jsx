import { getAllPosts } from "@/app/Apis";
import Slugify from "@/components/Slugify";
import styles from "./page.module.css";
import markdownToHtml from '@/lib/markdownToHtml';
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs";
import Sharer from "@/components/Sharer";
import RelatedPosts from "./RelatedPost";

const CMS_HOST_URL = process.env.CMS_HOST;

export const generateMetadata = async ({ params }) => {
    const { slug } = params;
    const { data } = await getAllPosts();

    const post = data.find((item) => Slugify(item.attributes.title) === slug);

    if (!post) {
        return {
            title: 'Post no encontrado',
            description: 'La publicación que buscas no existe.',
        };
    }

    const image = CMS_HOST_URL + post.attributes.featured_image.data?.attributes.url;

    const metadata = {
        title: post.attributes.title,
        description: 'Descripción de tu post',
        openGraph: {
            type: 'article',
            title: post.attributes.title,
            description: 'Descripción de tu post para Open Graph',
            images: [{ url: image, alt: post.attributes.title }],
        },
        // Otros metadatos que desees agregar
    };

    return metadata;
};

const SinglePost = async ({ params }) => {

    const { slug } = params;
    const { data } = await getAllPosts();

    const currentPost = data.find(item => Slugify(item.attributes.title) === slug);
    const category = currentPost?.category;
    const dataRelatedPost = data.filter(item => item.category === category && Slugify(item.attributes.title) !== slug).slice(0, 2);

    const contentSingle = await Promise.all(data.map(async (item) => {

        if (Slugify(item.attributes.title) === slug) {

            const content = await markdownToHtml(item.attributes.content);
            const image = CMS_HOST_URL + item.attributes.featured_image.data?.attributes.url;
            const categoriesRes = item.attributes.categories.data;
            const tagsRes = item.attributes.etiquetas.data;

            const fechaString = item.attributes.publishedAt;
            const fecha = new Date(fechaString);

            const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric' };
            const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesDeFormato);

            const fechaFormateada = formatoFecha.format(fecha);

            return (
                <> 
                    <div key={item.id} className="container">
                        <Breadcrumb customClass={styles.Breadcrumb} />
                        <div className="container-l">
                            {categoriesRes.length > 0 && (
                                <div className={styles.Categories}>
                                    {categoriesRes.map((item) => (
                                        <span key={item.id}>{item.attributes.name}</span>
                                    ))}
                                </div>
                            )}

                            <h1>{item.attributes.title}</h1>

                            {fechaString && (
                                <div className={styles.Date}>
                                    <span>{fechaFormateada}</span>
                                </div>
                            )}

                        </div>

                        {image && (
                            <div className={styles.image_post}>
                                <Image 
                                    src={image} 
                                    alt={item.attributes.title} 
                                    width={item.attributes.featured_image.data?.attributes.width} 
                                    height={item.attributes.featured_image.data?.attributes.height} 
                                />
                            </div>
                        )}

                        <div dangerouslySetInnerHTML={{ __html: content || '' }}></div>

                        {tagsRes.length > 0 && (
                            <div className={styles.Tags}>
                                <h4>Etiquetas</h4>
                                {tagsRes.map((item, index) => (
                                    <div className={styles.itemTag} key={index}>
                                        <span key={`${item.id}`}>{item.attributes.name}</span>

                                        {index < tagsRes.length - 1 && (
                                            <span key={`${item.id}-separator`} className={styles.TagsSeparator}>-</span>
                                        )}
                                    </div>
                                ))}

                            </div>
                        )}

                        <Sharer />
                    </div>
                </>

            )
        }

        //console.log(item.attributes);
        //console.log(item.attributes.publishedAt);
    }));

    return (
        <>
            <div className={styles.mainSingleBlog}>
                {contentSingle}
            </div>
            <RelatedPosts
                data={dataRelatedPost}
            />
        </>
    );
}

export default SinglePost;