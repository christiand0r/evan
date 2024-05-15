'use client'

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';

import styles from './Forms.module.css';


const RECAPTCHA_PUBLIC_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY;
const CMS_HOST_URL_PUBLIC = process.env.NEXT_PUBLIC_CMS_HOST_URL;

const ContactForm = (props) => {

    const { title, subtitle, subject = 'Contacto Evanhub' } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageClass, setMessageClass] = useState('');
    const { register, handleSubmit, setError, clearErrors, formState: { errors, isValid, isDirty }, setValue, reset } = useForm();
    const [showRecaptcha, setShowRecaptcha] = useState(true);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [valuePhone, setValuePhone] = useState();
    const [isPhoneInputFocused, setIsPhoneInputFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [recaptchaKey, setRecaptchaKey] = useState(new Date().getTime());
    const [modalShow, setModalShow] = useState(false);

    const hasValueInitialState = {
        name: false,
        phone: false,
        email: false,
        emailValidate: false,
    };

    const [hasValue, setHasValue] = useState(hasValueInitialState);

    const resetHasValue = () => {
        setHasValue(hasValueInitialState);
    };

    const handleInputBlur = (fieldName, e) => {
        const value = e.target.value.trim();

        setValue(fieldName, value);

        setHasValue((prevValues) => ({
            ...prevValues,
            [fieldName]: value.length > 0,
        }));
    };


    const handlePhoneInputChange = (value) => {
        const phoneValue = String(value);
        setValuePhone(phoneValue);
        setIsPhoneInputFocused(Boolean(phoneValue));

        if (isValidPhoneNumber(phoneValue)) {
            clearErrors('phone');
        } else {
            setError('phone', { type: 'manual', message: 'Número de teléfono inválido' });
        }
    };

    const handlePhoneInputFocus = () => {
        setIsPhoneInputFocused(true);
    };

    const handlePhoneInputBlur = () => {
        setIsPhoneInputFocused(false);
    };

    /*const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };*/

    const sendMail = async (data) => {
        try {
            return 'Correo enviado exitosamente';
        } catch (error) {
            console.error('Error al enviar el correo:', error.message);
            throw new Error('Error al enviar el correo');
        }
    };

    const onSubmit = async (data) => {

        setIsLoading(!isLoading);

        const resultMessage = await sendMail(data);
        setMessage(resultMessage);

        try {

            if (!recaptchaValue) {
                console.log('reCAPTCHA not validated. Form not submitted.');
                return;
            }

            const response = await fetch(CMS_HOST_URL_PUBLIC + '/api/consultas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data:
                    {
                        origin: subject ? subject : 'Contacto Evanhub',
                        name: data.name,
                        email: data.email,
                        phone: valuePhone,
                        message: data.message,
                        'g-recaptcha-response': recaptchaValue,
                    }

                }),
            });


            if (!response.ok) {
                throw new Error('Error al enviar la consulta a Strapi');
            }

            const responseData = await response.json();
            //console.log('Response Data:', responseData);

            setIsLoading(false);

            if (response.ok) {
                setMessageClass(styles.successMessage);

                setModalShow(true);

                await delay(5000);
                setModalShow(false);
                reset();
                setValuePhone('');
                setIsPhoneInputFocused(false);
                setRecaptchaKey(new Date().getTime());
                resetHasValue();

                //return '¡Formulario enviado con éxito!';
            } else {
                throw new Error('Error al enviar el formulario');
            }

        } catch (error) {

            console.error('Error:', error.message);
            if (error.response) {
                // Si hay una respuesta del servidor, imprime detalles específicos.
                console.error('Server Response:', error.response.data);
            }

            setIsLoading(false);

            setMessageClass(styles.errorMessage);

            await delay(1000);
            setMessageClass((prevClasses) => `${prevClasses} ${styles.fadeIn}`);

            await delay(3000);
            setMessageClass((prevClasses) => `${prevClasses} ${styles.fadeOut}`);

            await delay(500);
            setMessage('');
            setMessageClass('');

            return '¡Error al enviar el formulario! Por favor, inténtalo de nuevo.';
        } 
    };

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function SuccessModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                id="modalSuccess"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Image src="/Evanhub-isotipo-degrade.svg" alt="Evanhub" width={115} height={115} quality={100} unoptimized={true} className="mx-auto d-block" />
                    <h4 className='h1 display-small text-center'>Consulta enviada</h4>
                    <p className='text-center'> Revisaremos tu solicitud y nos contactaremos contigo a la brevedad posible. </p>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            {title && <h2 className='text-center display-large color-01 secondary-font mb-xl'>{title}</h2>}
            {subtitle && <p className={`${styles.Subtitle} text-center mb-xl`}>{subtitle}</p>}

            <div className="rendered-form">
                <form id="contactos" className={styles.formEvanhub} onSubmit={handleSubmit(onSubmit)} method="post" noValidate>
                    <div className={styles.innerForm}>
                        <input type="hidden" className="form-control" name="origin" value={subject} id="origin" />

                        <div className={`row ${styles.Row}`}>
                            <div className="col-sm-12 col-md-6 position-relative">
                                <input
                                    id="name"
                                    type="text"

                                    {...register('name', {
                                        required: 'Este campo es obligatorio',
                                        maxLength: { value: 20, message: 'Máximo 20 caracteres' },
                                        minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                                    })}
                                    onBlur={(e) => handleInputBlur('name', e)}
                                    className={`${styles.input} ${hasValue.name ? styles.isValidate : ''}`}
                                />
                                <label htmlFor="name">Nombre y apellido <span>*</span></label>
                                {errors.name && <span className={styles.inputError}>{errors.name.message}</span>}
                            </div>
                            <div className="col-sm-12 col-md-6 position-relative">
                                <PhoneInput
                                    id="phone"
                                    name="phone"
                                    className={styles.input_flag}
                                    defaultCountry="CL"
                                    value={valuePhone}
                                    onChange={handlePhoneInputChange}
                                    onFocus={handlePhoneInputFocus}
                                    onBlur={handlePhoneInputBlur}
                                    //onMouseEnter={handleMouseEnter}
                                    //onMouseLeave={handleMouseLeave}
                                />
                                <label htmlFor="phone" className={`${isPhoneInputFocused || valuePhone || isHovered ? 'focused' : ''} ${valuePhone ? 'active' : ''} ${styles.phone_label}`}>
                                    Teléfono <span>*</span>
                                </label>
                                {errors.phone && <span className={styles.inputError}>{errors.phone.message}</span>}
                            </div>

                        </div>
                        <div className={`row ${styles.Row}`}>
                            <div className="col-sm-12 col-md-6 position-relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    {...register('email', {
                                        required: 'Este campo es obligatorio',
                                        pattern: { value: /^\S+@\S+$/i, message: 'Correo electrónico inválido' }
                                    })}
                                    onBlur={(e) => handleInputBlur('email', e)}
                                    className={`${styles.input} ${hasValue.email ? styles.isValidate : ''}`}
                                />
                                <label htmlFor="email">Correo electrónico <span>*</span></label>
                                {errors.email && <span className={styles.inputError}>{errors.email.message}</span>}
                            </div>
                            <div className="col-sm-12 col-md-6 position-relative">
                                <input
                                    id="emailValidate"
                                    type="email"
                                    name="emailValidate"
                                    {...register('emailValidate', {
                                        required: 'Este campo es obligatorio',
                                        pattern: { value: /^\S+@\S+$/i, message: 'Correo electrónico inválido' }
                                    })}
                                    onBlur={(e) => handleInputBlur('emailValidate', e)}
                                    className={`${styles.input} ${hasValue.emailValidate ? styles.isValidate : ''}`}
                                />
                                <label htmlFor="emailValidate">Confirma correo electrónico <span>*</span></label>
                                {errors.emailValidate && <span className={styles.inputError}>{errors.emailValidate.message}</span>}
                            </div>

                        </div>
                        <div className={`row ${styles.Row}`}>
                            <div className="col-sm-12 col-md-12 position-relative">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="message"
                                    placeholder="Escriba aquí su mensaje"
                                    {...register('message')}
                                />
                            </div>
                        </div>
                        {showRecaptcha && (
                            <div className="formbuilder-button form-group field-submit mt-xl">
                                <ReCAPTCHA
                                    key={recaptchaKey}
                                    sitekey={RECAPTCHA_PUBLIC_KEY}
                                    onChange={(value) => setRecaptchaValue(value)}
                                />
                            </div>
                        )}
                        <div className={`row mt-xl ${styles.Row}`}>
                            <div className="col-sm-12 col-md-12 position-relative">
                                <button className="evanhub-btn btn-full__primary" type="submit" disabled={isLoading}>
                                    {isLoading ? <span className={styles.loader}></span> : 'Enviar solicitud'}
                                </button>
                            </div>
                        </div>
                        <div className={`${styles.messageForm} ${messageClass}`}>
                            <p className="mb-0"> {message && message}</p>
                        </div>
                    </div>
                </form>
            </div>


            {/* Modal de éxito */}
            <SuccessModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            {/* Modal de éxito */}

        </>
    );
};

export default ContactForm;
