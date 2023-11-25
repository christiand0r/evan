'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const Breadcrumb = (props) => {

    const { customName } = props;

    const router = usePathname();
    const path = router.split('/').filter((x) => x);
    const lastPath = path[path.length - 1];
    const separator = '/';

    //console.log(router);

    return (
        <div className='breadcrumbs'>
            <div className='container'>
                <nav aria-label="Breadcrumb">
                    <ol>
                        <li key="home-list">
                            <Link href="/">
                                <span><i className="bi bi-house"></i></span>
                            </Link>
                        </li>
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