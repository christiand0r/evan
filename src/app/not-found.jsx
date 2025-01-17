import Link from 'next/link'
import styles from './not-found.module.css'
import { getNotFound } from '@/app/Apis'

const CMS_HOST_URL = process.env.CMS_HOST;

const NotFound = async () => {

    const data = await getNotFound();
    const dataRes = data.data.attributes;

    const bgImage = dataRes.background_image.data.attributes.url;

    return (
        <div className={`${styles.page404} page-404`} style={bgImage ? { backgroundImage: `url(${CMS_HOST_URL + bgImage})` } : ''} >
            <div className='container'>
                <div className='inner_container'>
                    {dataRes.title_404 && <h1 className="text-center">{dataRes.title_404}</h1>}
                    {dataRes.subtitle_404 && <h2 className="text-center display-large color-02 secondary-font">{dataRes.subtitle_404}</h2>}
                    {dataRes.content_404 && <p className='text-center'>{dataRes.content_404}</p>}
                    <div className={styles.backlinks}>
                        {dataRes.backlinks && dataRes.backlinks.map((item, index) => {
                            return (
                                <Link href={item.url_link} target={item.target_link} key={index}>{item.title_link}</Link>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;