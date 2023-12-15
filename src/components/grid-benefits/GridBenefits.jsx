import Image from "next/image";
import styles from './GridBenefits.module.css';
import markdownToHtml from "@/lib/markdownToHtml";

const CMS_HOST_URL = process.env.CMS_HOST;

const GridBenefits = async ({ content }) => {

    const component = await Promise.all(content.map(async (item, index) => {

        const icono = CMS_HOST_URL + item?.icono?.data?.attributes?.url;
        const content = await markdownToHtml(item?.contenido);
        console.log(content);
        return (
            content &&
                <article key={index} className="grid-benefits__item">
                    <div className="inner-article">
                        <div className="grid-benefits__item__image">
                            <Image src={icono} width={83} height={83} alt='icono benefits Evanhub' />
                        </div>
                        <div className="grid-benefits__item__content" dangerouslySetInnerHTML={{ __html: content }}>
                        </div>
                    </div>
                </article>
        )
    }));


    return (
        <section className="grid-benefits mb-xxl">
            <div className={styles.inner_grid}>
                {component}
            </div>
        </section>
    );
}


export default GridBenefits;