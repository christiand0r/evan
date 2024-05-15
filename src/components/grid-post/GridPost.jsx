import CardPost from "@/components/card-post/CardPost";
import styles from "./GridPost.module.css";
import Skeleton from 'react-loading-skeleton';

const CMS_HOST_URL = process.env.NEXT_PUBLIC_CMS_HOST_URL;

const GridPost = (props) => {

    const { dataBlog, dataPagination, dataFilter } = props;

    return (
        <div className={styles.gridBlogPosts}>
            <div className={styles.GridPost}>
                {dataBlog ? (
                    dataBlog && dataBlog.map((item, index) => {

                        const imageItem = item.attributes.featured_image.data?.attributes.url;
                        const urlImage = imageItem ? CMS_HOST_URL + imageItem : null;

                        return (
                            <CardPost
                                key={`${item.id}-${index}`}
                                urlImage={urlImage}
                                title={item.attributes.title}
                                categories={item.attributes.categories}
                                date={item.attributes.publishedAt}
                                short_content={item.attributes.short_content}
                                tags={item.attributes.etiquetas}
                            />
                        );
                    })
                ) : (
                    // Renderizar esqueletos mientras se carga la data
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className={styles.skeletonContainer}>
                            <Skeleton height={400} />
                        </div>
                    ))
                )
                }
            </div>
        </div>
    );
}

export default GridPost;