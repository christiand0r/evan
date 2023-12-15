'use client'

import { useEffect, useState } from "react";
import { getDataBlog, getAllPosts } from "../Apis";
import GridPost from "@/components/grid-post/GridPost";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '@/components/grid-post/GridPost.module.css';
import Slugify from '@/components/Slugify';
import BannerSplitGradient from "@/components/banner-split-gradient/BannerSplitGradient";

const CMS_HOST_URL = process.env.NEXT_PUBLIC_CMS_HOST_URL;

const BlogPage = () => {
    const [page, setPage] = useState(1);
    const [dataBlog, setDataBlog] = useState([]);
    const [dataPagination, setDataPagination] = useState({ pageSize: 1, total: 0 });
    const [dataCategories, setdataCategories] = useState([]);
    const [buttonTitle, setButtonTitle] = useState('Filtrar por etiqueta');
    const [selectedCategory, setSelectedCategory] = useState('Todas las categorias');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            let requestData = {
                page: page,
                pageSize: dataPagination ? dataPagination.pageSize : 1
            };

            if (buttonTitle !== 'Filtrar por etiqueta') {
                requestData.tag = buttonTitle;
            }

            if (selectedCategory !== 'Todas las categorias') {
                requestData.category = selectedCategory;
            }

            const { data: dataBlog, pagination: fetchedPagination } = await getDataBlog(requestData);
            const { data: dataAllCat } = await getAllPosts();
            setDataBlog(dataBlog);
            setDataPagination(fetchedPagination);
            setdataCategories(dataAllCat);
            setSearchPerformed(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [buttonTitle, selectedCategory, page]);

    const handleSelect = (selectedItem) => {
        setButtonTitle(selectedItem);
    };

    const handleCategoryClick = (category) => {
        //console.log(category);
        if (category === 'Todas las categorias') {
            setSelectedCategory('Todas las categorias');
            setButtonTitle('Filtrar por etiqueta');
        } else {
            setSelectedCategory(category);
        }
    };

    const allTags = dataCategories && dataCategories.flatMap((item) =>
        item.attributes.etiquetas.data.map((tag) => ({
            name: tag.attributes.name,
            id: tag.id
        }))
    );

    const allCategories = dataCategories.flatMap((item) =>
        item.attributes.categories.data.map((category) => ({
            name: category.attributes.name,
            id: category.id
        }))
    );

    const uniqueCategories = Array.from(new Set(allCategories.map(category => category.id)))
        .map(id => allCategories.find(category => category.id === id));

    const uniqueTags = Array.from(new Set(allTags && allTags.map(tag => tag.id)))
        .map(id => allTags.find(tag => tag.id === id));

    const sortedCategories = uniqueCategories.sort((a, b) => a.id - b.id);
    const sortedTags = uniqueTags && uniqueTags.sort((a, b) => a.id - b.id);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(dataPagination.total / dataPagination.pageSize)) {
            setPage(newPage);
        }
    };

    const dataFeaturedPost = dataBlog && dataBlog.filter((item) => item.attributes.featured_post === true).splice(0, 1)[0];

    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(dataPagination.total / dataPagination.pageSize);
        const currentPage = page;

        const pageButtons = [];

        // Establecer el rango de números de página que se mostrarán (hasta 5)
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button key={i} onClick={() => handlePageChange(i)} className={`${i === currentPage ? styles.PageCurrent : ''} ${styles.PageNumber}`}>
                    {i}
                </button>
            );
        }

        return pageButtons;
    };

    //console.log(dataPagination);

    return (
        <>
            <BannerSplitGradient
                src={dataFeaturedPost && CMS_HOST_URL + dataFeaturedPost.attributes.featured_image.data?.attributes.url}
                title={dataFeaturedPost && dataFeaturedPost.attributes.title}
                description_banner={dataFeaturedPost && dataFeaturedPost.attributes.short_content}
                gradient=""
                buttonProps={{
                    label: 'Leer artículo',
                    target: '_self',
                    url: dataFeaturedPost && `/noticias/${Slugify(dataFeaturedPost.attributes.title)}`,
                    type: 'outline secondary'
                }}
            />
            <div className={styles.blogPosts}>
                <div className="container-m">
                    <h2 className="secondary-font color-01 display-large mb-xl text-center">Conoce las noticias sobre la salud mental</h2>

                    <div className={`${styles.filterCategories} pb-xl mb-xl`}>
                        <span onClick={() => handleCategoryClick('Todas las categorias')} className={`${'Todas las categorias' === selectedCategory ? styles.CategoryCurrent : ''} ${styles.filterCategory}`}>
                            Todas las categorias
                        </span>
                        {sortedCategories.map((category, index) => (
                            <span key={index} onClick={() => handleCategoryClick(category.name)} className={`${`${category.name}` === selectedCategory ? styles.CategoryCurrent : ''} ${styles.filterCategory}`}>
                                {category.name}
                            </span>
                        ))}
                    </div>

                    {sortedTags && (
                        <div className={`${styles.drop} drop mb-xl`}>
                            <Dropdown onSelect={handleSelect} className={styles.Dropdown}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    <i className="bi bi-filter d-block d-sm-block d-md-none"></i>
                                    <span>{buttonTitle}</span>
                                    <i className="bi bi-chevron-down d-none d-sm-none d-md-block"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={styles.DropdownToggle}>
                                    {sortedTags.map((tag, index) => (
                                        <Dropdown.Item key={index} eventKey={tag.name} className={`dopdown_item__${Slugify(tag.name)}`} >
                                            {tag.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}

                    {loading ? (
                        <div className={styles.Loading}>
                            <span className={styles.Loader}></span>
                        </div>
                    ) : (
                        <>
                            <GridPost dataBlog={dataBlog} />

                            {searchPerformed && !dataBlog.length && (
                                <div className={styles.noResultsMessage}>
                                    No se encontraron resultados.
                                </div>
                            )}

                            {dataPagination.pageCount > 1 && (
                                <div className={styles.Pagination}>
                                    <button className={styles.PageNumber} onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                                        <i className="bi bi-chevron-left"></i>
                                    </button>

                                    {renderPaginationButtons()}

                                    <button className={styles.PageNumber} onClick={() => handlePageChange(page + 1)} disabled={page === Math.ceil(dataPagination.total / dataPagination.pageSize)}>
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                </div>
            </div>
        </>
    );
}

export default BlogPage;