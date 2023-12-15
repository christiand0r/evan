import styles from './BlockSideNav.module.css';
import markdownToHtml from '@/lib/markdownToHtml';
import DropdownSelector from './Dropdown';

const slugify = (text) => {
    if (typeof text !== 'string') {
        return '';
    }

    const from = "ÁÉÍÓÚáéíóú";
    const to   = "AEIOUaeiou";

    const newText = text.split('').map((char, i) => 
        from.indexOf(char) !== -1 ? to[from.indexOf(char)] : char
    ).join('');

    return newText
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

const BlockSideNav = async (props) => {

    const { content, containerClass = 'container' } = props;

    //console.log(content);

    const itemsDropdown = content.map(area => {
        return {
            title_group: area.title_group,
            items: area.item_sidenav.map(item => item.title_item)
        };
    });

    return (
        <div className='block_sidebar mb-xxl'>

            <div className='d-block d-sm-block d-md-none'>
                <DropdownSelector 
                itemsDropdown={itemsDropdown}
                />
            </div>

            <div className={containerClass}>
                <div className='row'>
                    <div className={`col-12 col-md-4 ${styles.sideColumn} d-none d-sm-none d-md-block`}>
                        <div className='sidebar'>
                            <div className={styles.sidebar__content}>
                                <ul>
                                    {await Promise.all(content.map(async (area) => {
                                        return (
                                            <li key={area.id}>
                                                <a href={`#group_sidenav__${slugify(area.title_group)}`} className={`group_sidenav__${slugify(area.title_group)}`}>
                                                    {area.title_group}
                                                </a>
                                                <ul>
                                                    {area.item_sidenav.map((item) => {
                                                        return (
                                                            <li key={item.id}>
                                                                <a href={`#item_sidenav__${slugify(item.title_item)}`} className={`item_sidenav__${slugify(item.title_item)}`}>
                                                                    {item.title_item}
                                                                </a>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </li>
                                        );
                                    }))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-8'>

                        {await Promise.all(content.map(async (area) => {
                            const plot = await markdownToHtml(area.content_group);
                            return (
                                <div id={`group_sidenav__${slugify(area.title_group)}`} className={`group_sidenav__${slugify(area.title_group)} ${styles.groupContent}`} key={area.id}>
                                    <h2>{area.title_group}</h2>
                                    <div className={styles.blockText} dangerouslySetInnerHTML={{ __html: plot }} ></div>
                                    <div className={styles.subitems_navigations}>
                                        {area.item_sidenav.map((item) => {
                                            return (
                                                <div id={`item_sidenav__${slugify(item.title_item)}`} className={`item_sidenav__${slugify(item.title_item)} ${styles.subItem}`} key={item.id}>
                                                    <h3>{item.title_item}</h3>
                                                    <div className={styles.blockText} dangerouslySetInnerHTML={{ __html: item.content_item }} ></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlockSideNav;