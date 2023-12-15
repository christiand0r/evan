import Link from "next/link";
import styles from "./GridPost.module.css";

const Pagination = ({ pagination }) => {
    const { page, pageCount } = pagination;

    const isFirst = page === 1;
    const isLast = page === pageCount;

    const generatePageLinks = () => {
        const links = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(pageCount, startPage + 4);

        if (startPage > 1) {
            links.push(<span key="startEllipsis">...</span>);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageUrl = i === 1 ? `/noticias` : `/noticias/page/${i}`;
            links.push(
                <Link key={i} href={pageUrl} className={`page_numbers ${i === page ? styles.PageCurrent : ''} ${styles.PageNumber}`}>
                    {i}
                </Link>
            );
        }

        if (endPage < pageCount) {
            links.push(<span key="endEllipsis">...</span>);
        }

        return links;
    };

    return (
        pageCount > 1 && (
            <div className={`${styles.Pagination}`}>
                {isFirst ? (
                    <span className={`prev page_numbers disabled ${styles.PageNumber}`}>
                        <i className="bi bi-chevron-left"></i>
                    </span>
                ) : (
                    <Link href={page === 2 ? `/noticias` : `/noticias/page/${page - 1}`} className={`prev page_numbers ${styles.PageNumber}`}>
                        <i className="bi bi-chevron-left"></i>
                    </Link>
                )}
                {generatePageLinks()}
                {isLast ? (
                    <span className={`next page_numbers disabled ${styles.PageNumber}`}>
                        <i className="bi bi-chevron-right"></i>
                    </span>
                ) : (
                    <Link href={`/noticias/page/${page + 1}`} className={`next page_numbers ${styles.PageNumber}`}>
                        <i className="bi bi-chevron-right"></i>
                    </Link>
                )}
            </div>
        )
    );
};

export default Pagination;
