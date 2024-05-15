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

    const [initialPage, setInitialPage] = useState(1);
    const [initialCategory, setInitialCategory] = useState('Todas las categorias');
    const [initialTag, setInitialTag] = useState('Filtrar por etiqueta');

    const [page, setPage] = useState(initialPage);
    const [filtersChanged, setFiltersChanged] = useState(false);
    const [dataBlog, setDataBlog] = useState([]);
    const [dataPagination, setDataPagination] = useState({ pageSize: 1, total: 0 });
    const [dataCategories, setdataCategories] = useState([]);
    const [buttonTitle, setButtonTitle] = useState(initialTag);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [panelTags, setPanelTags] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);


    useEffect(() => {
        if (typeof window !== "undefined") {
            const queryParams = new URLSearchParams(window.location.search);
            setInitialPage(parseInt(queryParams.get('page')) || 1);
            setInitialCategory(queryParams.get('category') || 'Todas las categorias');
            setInitialTag(queryParams.get('tag') || 'Filtrar por etiqueta');
        } else {
            setInitialPage(1);
            setInitialCategory('Todas las categorias');
            setInitialTag('Filtrar por etiqueta');
        }
    }, []);


    useEffect(() => {

        if (typeof window !== "undefined") {
            const newUrl = '/noticias';
            const queryParams = new URLSearchParams();

            if (selectedCategory !== 'Todas las categorias') {
                queryParams.set('category', Slugify(selectedCategory));
            }

            if (buttonTitle !== 'Filtrar por etiqueta') {
                queryParams.set('tag', Slugify(buttonTitle));
            }

            if (page > 1) {
                queryParams.set('page', page);
            }

            window.history.replaceState({}, '', `${newUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
        }
    }, [page, selectedCategory, buttonTitle]);



    const fetchData = async () => {
        try {
            setLoading(true);

            let requestData = {
                page: page,
                pageSize: dataPagination ? dataPagination.pageSize : 1
            };

            if (buttonTitle !== 'Filtrar por etiqueta') {
                requestData.tag = buttonTitle;

                // Si estamos en una página diferente a la 1 y no hay categoría seleccionada, eliminar 'page'
                if (page > 1 && !selectedCategory) {
                    window.history.replaceState({}, '', `/noticias?tag=${buttonTitle}`);
                }
            }

            if (selectedCategory !== 'Todas las categorias') {
                requestData.category = selectedCategory;

                // Si estamos en una página diferente a la 1 y no hay etiqueta seleccionada, eliminar 'page'
                if (page > 1 && !buttonTitle) {
                    window.history.replaceState({}, '', `/noticias?category=${selectedCategory}`);
                }
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

    const handlePanelTags = () => {
        setPanelTags(true);
        document.body.classList.add('open_tags');
    }

    const handleClosePanelTags = () => {
        setPanelTags(false);
        document.body.classList.remove('open_tags');
    }


    const handleSelect = (selectedItem) => {

        setButtonTitle(selectedItem);


        if (page !== 1) {
            setPage(1);
            return;
        }
    };

    const handleCategoryClick = (category) => {
        if (category === 'Todas las categorias') {
            setSelectedCategory('Todas las categorias');
            setButtonTitle('Filtrar por etiqueta');
        } else {
            setSelectedCategory(category);
            if (page !== 1) {
                setPage(1);
                return;
            }
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
        // Solo cambia la página si es diferente
        if (newPage !== page) {
            setPage(newPage);
        }
    };

    const dataFeaturedPost = dataCategories && dataCategories.filter((item) => item.attributes.featured_post === true).splice(0, 1)[0];

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

    return (
        <>
            <BannerSplitGradient
                src={dataFeaturedPost && CMS_HOST_URL + dataFeaturedPost.attributes.featured_image.data?.attributes.url}
                title={dataFeaturedPost && dataFeaturedPost.attributes.title}
                description_banner={dataFeaturedPost && dataFeaturedPost.attributes.short_content}
                gradient=""
                buttonProps={{
                    label: 'Leer artículos',
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
                            <div className="d-block d-sm-block d-md-none">
                                <button type="button" className={styles.Dropdown} onClick={handlePanelTags}>
                                    <i className="bi bi-filter d-block d-sm-block d-md-none"></i>
                                    <span>Filtrar por etiqueta</span>
                                    {buttonTitle !== 'Filtrar por etiqueta' && (
                                        <span className={styles.selected__numb}>1</span>
                                    )}
                                    <i className="bi bi-chevron-down d-none d-sm-none d-md-block"></i>
                                </button>

                                <div className={`${styles.panel__tags} ${panelTags ? styles.panelTagsActive : ''}`}>
                                    <div className={styles.header__panel} >
                                        <p>Filtrar por etiqueta</p>
                                        <i className="bi bi-x-lg" onClick={handleClosePanelTags}></i>
                                    </div>
                                    <div className={styles.subheader__panel}>
                                        <p>Selecciona una opción</p>
                                    </div>
                                    <div className={styles.body__panel}>
                                        {sortedTags.map((tag, index) => (
                                            <div key={index} className={styles.item__tag}>
                                                <input type="radio" name="tag" id={`tag-${index + 1}`} className="panel__tag-input" onChange={() => handleSelect(tag.name)} />
                                                <label htmlFor={`tag-${index + 1}`} className="panel__tag-label">{tag.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                    {buttonTitle !== 'Filtrar por etiqueta' && (
                                        <div className={styles.footer__panel}>
                                            <button onClick={handleClosePanelTags} className="evanhub-btn mx-w-250 btn-full__primary">Mostrar resultados</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="d-none d-sm-none d-md-block">
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
                        </div>
                    )}


                    {loading ? (
                        <div className={styles.GridPost}>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div className={styles.loading}>
                                    <article className="card-post">
                                        <div className="placeholder-glow">
                                            <span className="placeholder col-12" style={{ height: 388 }}></span>
                                        </div>
                                        <div>
                                            <div className="card-cat placeholder-glow d-flex gap-3 mt-3">
                                                <span className="placeholder col-2" style={{ height: 38 }}></span>
                                                <span className="placeholder col-2" style={{ height: 38 }}></span>
                                            </div>
                                            <div className="card-date placeholder-glow mt-2">
                                                <span class="placeholder col-6"></span>
                                            </div>
                                            <div className="card-title placeholder-glow mt-2">
                                                <span className="placeholder col-6"></span>
                                            </div>
                                            <div className="card-tag placeholder-glow d-flex gap-3 mt-2">
                                                <span className="placeholder col-3"></span>
                                                <span className="placeholder col-3"></span>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            ))}
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