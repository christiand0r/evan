'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from './GridPost.module.css';
import Slugify from 'Slugify';

const FilterCategoriesPost = (props) => {

    const { dataBlog, dataFilter } = props;
    const dataPool = dataFilter ? dataFilter : dataBlog;
    const router = usePathname();

    const allCategories = dataPool.flatMap((item) =>
        item.attributes.categories.data.map((category) => ({
            name: category.attributes.name,
            id: category.id
        }))
    );
    const uniqueCategories = Array.from(new Set(allCategories.map(category => category.id)))
        .map(id => allCategories.find(category => category.id === id));


    const sortedCategories = uniqueCategories.sort((a, b) => a.id - b.id);

    //console.log(uniqueCategories);
    //console.log(allCategories);
    //console.log(uniqueTags);
    return (
        <div className={`${styles.filterCategories} pb-xl mb-xl`}>
            <Link href="/noticias" className={`${router === '/noticias' ? 'current' : ''} ${styles.filterCategory}`}>
                Todas las categorias
            </Link>
            {sortedCategories.map((category, index) => (
                <Link key={index} href={`/noticias/category/${Slugify(category.name)}`} className={`${`/noticias/category/${Slugify(category.name)}` === router ? 'current' : ''} ${styles.filterCategory}`}>
                    {category.name}
                </Link>
            ))}
        </div>

    );
};

export default FilterCategoriesPost;