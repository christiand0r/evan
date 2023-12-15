import Button from '../Button';
import styles from './LineSteps.module.css'

const LineStep = (props) => {

    const {titleSection, steps, showButton, labelButton, urlButton, targetButton, typeButton} = props || {};

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
                            return(
                                <div key={step.id} className={styles.itemStep}>
                                    <h3>{ index + 1 /*(index + 1).toString().padStart(2, '0')*/}</h3>
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
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 789 225">
                            <defs>
                                <linearGradient id="Degradado_sin_nombre" data-name="Degradado sin nombre" x1="-.1" y1="113.6" x2="788.9" y2="113.61" gradientTransform="translate(0 226) scale(1 -1)" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" style={{ stopColor: '#9cb78e' }} />
                                    <stop offset=".41" style={{ stopColor: '#556f69' }} />
                                    <stop offset="1" style={{ stopColor: '#454795' }} />
                                </linearGradient>
                            </defs>
                            <path style={{ fill: 'none', stroke: 'url(#Degradado_sin_nombre)', strokeWidth: '3px' }} d="m0,2h197c26.51,0,48,21.49,48,48v125c0,26.51,21.49,48,48,48h192c26.51,0,48-21.49,48-48v-78.63c0-26.51,21.49-48,48-48h208" />
                        </svg>
                    </div>
                    <div className={`${styles.stepModule} d-block d-sm-block d-md-none`}>
                        <svg width="276" height="579" viewBox="0 0 276 579" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="paint0_linear_1981_11675" x1="2" y1="577.5" x2="274.001" y2="577.5" gradientUnits="userSpaceOnUse">
                                    <stop style={{ stopColor: '#9CB78E' }} />
                                    <stop offset="0.412554" style={{ stopColor: '#556F69' }} />
                                    <stop offset="1" style={{ stopColor: '#454795' }} />
                                </linearGradient>
                            </defs>
                            <path style={{ stroke: 'url(#paint0_linear_1981_11675)', strokeWidth: '3' }} d="M31 2H226C252.51 2 274 23.4903 274 50V241.5C274 268.01 252.51 289.5 226 289.5H50C23.4903 289.5 2 310.99 2 337.5V529.5C2 556.01 23.4903 577.5 50 577.5H245.5" />
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