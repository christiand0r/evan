import styles from './BlockColor.module.css';
import markdownToHtml from '@/lib/markdownToHtml';

const BlockColor = async(props) => {

    const {title, content} = props;

    const plotContent = await markdownToHtml(content);

    return (
        <section className={`${styles.blockColor} block-color mb-xxl`}>
            {title && <h2 className="text-center display-large color-01 secondary-font">{title}</h2>}
            <div className={styles.blockColorContent} dangerouslySetInnerHTML={{ __html: plotContent }}></div>
        </section>
    )
}

export default BlockColor;