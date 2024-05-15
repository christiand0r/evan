import Button from '../Button';
import styles from './LineSteps.module.css'

const LineStep = (props) => {

    const { titleSection, steps, showButton, labelButton, urlButton, targetButton, typeButton } = props || {};

    return (
        <section className={`${styles.lineSteps} mt-xxl mb-xxl `}>

            {titleSection &&
                <div className="container-m">
                    <h2 className="text-center display-large color-01 secondary-font"> {titleSection} </h2>
                </div>
            }

            <div className="container-s">
                <div className={styles.innerLineSteps}>
                    <div className='Steps'>

                        {steps && steps.map((step, index) => {
                            //console.log(step);
                            return (
                                <div key={step.id} className={styles.itemStep}>
                                    <h3>{index + 1 /*(index + 1).toString().padStart(2, '0')*/}</h3>
                                    <span className={styles.dotStep}></span>
                                    <div className={styles.stepDetails}>
                                        {step.title_step && <h4>{step.title_step}</h4>}
                                        <div className={styles.contentStep}>
                                            {step.content_step && <p>{step.content_step}</p>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className={`${styles.stepModule} d-none d-sm-none d-md-block`}>
                        <svg width="100%" height="234" viewBox="0 0 789 234" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 2H197C223.51 2 245 23.4903 245 50V184C245 210.51 266.49 232 293 232H485C511.51 232 533 210.51 533 184V98.2589C533 71.7492 554.49 50.2589 581 50.2589H789" stroke="url(#paint0_linear_648_27502)" strokeWidth="3" />
                            <defs>
                                <linearGradient id="paint0_linear_648_27502" x1="0" y1="232" x2="789.002" y2="231.991" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#454795" />
                                    <stop offset="0.412554" stopColor="#556F69" />
                                    <stop offset="1" stopColor="#9CB78E" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className={`${styles.stepModule} d-block d-sm-block d-md-none`}>
                        <svg width="276" height="597" viewBox="0 0 276 597" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31 2H226C252.51 2 274 23.4903 274 50V250.242C274 276.752 252.51 298.242 226 298.242H50C23.4903 298.242 2 319.733 2 346.242V547C2 573.51 23.4903 595 50 595H245.5" stroke="url(#paint0_linear_1981_11675)" strokeWidth="3" />
                            <defs>
                                <linearGradient id="paint0_linear_1981_11675" x1="2" y1="595" x2="274.001" y2="595" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#454795" />
                                    <stop offset="0.412554" stopColor="#556F69" />
                                    <stop offset="1" stopColor="#9CB78E" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>

            {showButton === true && (
                <div className="container-s d-flex justify-content-center">
                    <Button
                        label={labelButton ?? labelButton}
                        url={urlButton ?? urlButton}
                        target={targetButton ?? targetButton}
                        type={typeButton ?? typeButton}
                    />
                </div>
            )}
        </section>
    )
}

export default LineStep;