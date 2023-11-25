import { getDataTopMenu } from "@/app/Apis";
import styles from '@/components/header/Header.module.css'

export default async function HeaderTop() {

    const dataResponse = await getDataTopMenu();

    if (dataResponse) {
        return (
            <div className={styles.HeaderTop}>
                <div className='container'>
                    <div className={styles.innerContainer}>
                        <a href={dataResponse.data.attributes.url} target={dataResponse.data.attributes.Target} className='access-intranet fw-semibold'>
                            <i className='bi bi-arrow-right-circle'></i> {dataResponse.data.attributes.Title}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};