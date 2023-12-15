'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const Breadcrumb = ({ customClass, customName }) => {
    const router = usePathname();
    const path = router.split('/').filter((x) => x);
    let lastPath = path[path.length - 1];

    // Si estamos en una página de paginación, tomamos 'noticias' como lastPath
    if (path[1] === 'page' || path[1] === 'category') {
        lastPath = path[0];
    }

    //console.log(path[1]);

    const separator = '/';

    return (
        <div className={`breadcrumbs ${customClass}`}>
            <div className='container'>
                <nav aria-label="Breadcrumb">
                    <ol>
                        <li key="home-list">
                            <Link href="/">
                                <span><i className="bi bi-house"></i></span>
                            </Link>
                        </li>

                        {path[0] === 'noticias' && path[1] != undefined && (
                            <li key="news-list">
                                <span className='separator'>{separator}</span>
                                <span>Noticias</span>
                            </li>
                        )}

                        <li key={lastPath + `-list`}>
                            <span className='separator'>{separator}</span>
                            <span>{customName ? customName : capitalizeFirstLetter(lastPath).replace(/-/g, ' ')}</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    );
};

export default Breadcrumb;