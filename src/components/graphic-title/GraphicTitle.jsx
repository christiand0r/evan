import styles from './GraphicTitle.module.css';
import Counter from '../Counter';

const GraphicTitle = (props) => {

    const { title, prefix, quantity } = props;

    return (
        <section className={`${styles.graphic_title} mb-xxl`}>
            <div className={styles.InnerGraphic}>
                <div className="graphic_vector">
                    {quantity && <Counter prefix={prefix} quantity={quantity} /> }
                    <svg width="312" height="158" viewBox="0 0 312 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2223_29337)">
                            <path d="M13.1535 0H0V157.576H13.1535V0Z" fill="#4C6F6A" />
                            <path d="M13.1535 129.418H0V157.576H13.1535V129.418Z" fill="url(#paint0_linear_2223_29337)" />
                            <path d="M312 0H298.847V157.576H312V0Z" fill="#4C6F6A" />
                            <path d="M312 19.9023H298.847V157.561H312V19.9023Z" fill="url(#paint1_linear_2223_29337)" />
                            <path d="M62.964 0H49.8105V157.576H62.964V0Z" fill="#4C6F6A" />
                            <path d="M62.964 103.441H49.8105V157.574H62.964V103.441Z" fill="url(#paint2_linear_2223_29337)" />
                            <path d="M112.774 0H99.6201V157.576H112.774V0Z" fill="#4C6F6A" />
                            <path d="M112.774 95.8047H99.6201V157.574H112.774V95.8047Z" fill="url(#paint3_linear_2223_29337)" />
                            <path d="M212.394 0H199.24V157.576H212.394V0Z" fill="#4C6F6A" />
                            <path d="M212.394 61.4961H199.24V157.563H212.394V61.4961Z" fill="url(#paint4_linear_2223_29337)" />
                            <path d="M262.203 0H249.05V157.576H262.203V0Z" fill="#4C6F6A" />
                            <path d="M262.203 47.5781H249.05V157.573H262.203V47.5781Z" fill="url(#paint5_linear_2223_29337)" />
                            <path d="M162.583 0H149.43V157.576H162.583V0Z" fill="#4C6F6A" />
                            <path d="M162.583 81.2617H149.43V157.577H162.583V81.2617Z" fill="url(#paint6_linear_2223_29337)" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_2223_29337" x1="6.56987" y1="166.82" x2="6.56987" y2="76.8927" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4C6F6A" />
                                <stop offset="0.03" stopColor="#52746E" />
                                <stop offset="0.22" stopColor="#759488" />
                                <stop offset="0.41" stopColor="#91AC9C" />
                                <stop offset="0.6" stopColor="#A4BEAA" />
                                <stop offset="0.8" stopColor="#B0C9B2" />
                                <stop offset="1" stopColor="#B4CCB5" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_2223_29337" x1="305.43" y1="173.481" x2="305.43" y2="18.7485" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4C6F6A" />
                                <stop offset="0.03" stopColor="#52746E" />
                                <stop offset="0.22" stopColor="#759488" />
                                <stop offset="0.41" stopColor="#91AC9C" />
                                <stop offset="0.6" stopColor="#A4BEAA" />
                                <stop offset="0.8" stopColor="#B0C9B2" />
                                <stop offset="1" stopColor="#B4CCB5" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_2223_29337" x1="56.3804" y1="173.48" x2="56.3804" y2="18.7472" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4C6F6A" />
                                <stop offset="0.03" stopColor="#52746E" />
                                <stop offset="0.22" stopColor="#759488" />
                                <stop offset="0.41" stopColor="#91AC9C" />
                                <stop offset="0.6" stopColor="#A4BEAA" />
                                <stop offset="0.8" stopColor="#B0C9B2" />
                                <stop offset="1" stopColor="#B4CCB5" />
                            </linearGradient>
                            <linearGradient id="paint3_linear_2223_29337" x1="106.19" y1="167.793" x2="106.19" y2="68.3196" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4C6F6A" />
                                <stop offset="0.03" stopColor="#52746E" />
                                <stop offset="0.22" stopColor="#759488" />
                                <stop offset="0.41" stopColor="#91AC9C" />
                                <stop offset="0.6" stopColor="#A4BEAA" />
                                <stop offset="0.8" stopColor="#B0C9B2" />
                                <stop offset="1" stopColor="#B4CCB5" />
                            </linearGradient>
                            <linearGradient id="paint4_linear_2223_29337" x1="205.81" y1="173.483" x2="205.81" y2="18.7506" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4C6F6A" />
                                <stop offset="0.03" stopColor="#52746E" />
                                <stop offset="0.22" stopColor="#759488" />
                                <stop offset="0.41" stopColor="#91AC9C" />
                                <stop offset="0.6" stopColor="#A4BEAA" />
                                <stop offset="0.8" stopColor="#B0C9B2" />
                                <stop offset="1" stopColor="#B4CCB5" />
                            </linearGradient>
                            <linearGradient id="paint5_linear_2223_29337" x1="255.62" y1="170.279" x2="255.62" y2="46.6578" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4C6F6A" />
                                <stop offset="0.03" stopColor="#52746E" />
                                <stop offset="0.22" stopColor="#759488" />
                                <stop offset="0.41" stopColor="#91AC9C" />
                                <stop offset="0.6" stopColor="#A4BEAA" />
                                <stop offset="0.8" stopColor="#B0C9B2" />
                                <stop offset="1" stopColor="#B4CCB5" />
                            </linearGradient>
                            <linearGradient id="paint6_linear_2223_29337" x1="156" y1="179.994" x2="156" y2="-38.1426" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4C6F6A" />
                                <stop offset="0.03" stopColor="#52746E" />
                                <stop offset="0.22" stopColor="#759488" />
                                <stop offset="0.41" stopColor="#91AC9C" />
                                <stop offset="0.6" stopColor="#A4BEAA" />
                                <stop offset="0.8" stopColor="#B0C9B2" />
                                <stop offset="1" stopColor="#B4CCB5" />
                            </linearGradient>
                            <clipPath id="clip0_2223_29337">
                                <rect width="312" height="157.576" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                {title && <h2 className="secondary-font color-01 display-large mb-m">{title}</h2>}
            </div>
        </section>
    )
}
export default GraphicTitle;