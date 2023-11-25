import styles from './BlockText.module.css';
import markdownToHtml from '@/lib/markdownToHtml';

const BlockText = async(props) => {

    const {content} = props;
    const plotContent = await markdownToHtml(content);

    return (
        <div className={`${styles.blockText} block_text mb-xxl`} dangerouslySetInnerHTML={{ __html: plotContent }}></div>
    )
}

export default BlockText;