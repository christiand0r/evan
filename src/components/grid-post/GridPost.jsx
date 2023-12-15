import CardPost from "@/components/card-post/CardPost";
import styles from "./GridPost.module.css";
const CMS_HOST_URL = process.env.NEXT_PUBLIC_CMS_HOST_URL;

const GridPost = (props) => {

    const { dataBlog, dataPagination, dataFilter } = props;

    return (
        <div className={styles.gridBlogPosts}>
            <div className={styles.GridPost}>
                {dataBlog && dataBlog.map((item, index) => {

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
                    )
                })}
            </div>
        </div>
    );
}

export default GridPost;