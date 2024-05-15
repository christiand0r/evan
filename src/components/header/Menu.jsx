import Link from 'next/link';

import { getDataMenuPrimary } from '@/app/Apis';
import ItemMenu from './ItemMenu';

import style from './Header.module.css';

export default async function Menu() {
  try {
    const dataResponse = await getDataMenuPrimary();
    const menuPrimary = dataResponse.data.attributes;
    const menuItems = menuPrimary.Items;

    const lastTwoItems = menuItems.slice(-2);

    const renderMenuItems = (items) => {
      return items.map((item, index) => (
        <ItemMenu key={index} id={item.id} children={item.children} item={item.title} icon={item.icon} url={item.url} classes={item.class} target={item.target} />
      ));
    };

    const renderExtraItems = (items) => {
      return items.map((item, index) => (
        <ItemMenu key={index} id={item.id} children={item.children} item={item.title} icon={item.icon} url={item.url} classes={item.class} target={item.target} />
      ))
    }

    return (
      <>

        <ul className={style.Menu}>
          {renderMenuItems(menuItems)}
        </ul>

        <ul className={`${style.extraMenu} d-block d-sm-block d-md-block d-lg-none`}>
          {renderExtraItems(lastTwoItems)}
        </ul>
      </>
    );
  } catch (error) {
    console.error('Error loading menu:', error);
    return <div>Error loading menu</div>;
  }
}