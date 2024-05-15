import CardPost from "@/components/card-post/CardPost";
import Button from "@/components/Button";
import styles from "./page.module.css";

const CMS_HOST_URL = process.env.NEXT_PUBLIC_CMS_HOST_URL;

const RelatedPosts = (props) => {

    const { data } = props;

    //console.log(data);

    return (
        <div className={styles.related_posts}>
            <div className="container">
                <h2 className="secondary-font color-01 display-large mb-xl text-center">Artículos similares</h2>
                <div className={`${styles.grid_post} mb-xl`}>
                    {data.map((item, index) => {

                        const imageItem = item.attributes.featured_image.data?.attributes.url;
                        const urlImage = imageItem ? CMS_HOST_URL + imageItem : null;

                        return (
                            <CardPost
                                key={index}
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
                <div className="d-flex justify-content-center align-item-center">
                    <Button
                        label='Ir al blog'
                        target='_self'
                        type='full primary'
                        url='/noticias'
                    />
                </div>
            </div>
        </div>
    )
};

export default RelatedPosts;