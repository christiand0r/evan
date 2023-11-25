'use client'

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodError } from 'zod';
import { validationSchema } from './validationSchema';

import styles from './Forms.module.css'

const FormGeneral = (props) => {

    const { title, subtitle, subject } = props;

    //Funciones y estados necesarios
    const { register, handleSubmit, setError, setValue, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            emailValidate: '',
            comments: '',
        },
        resolver: zodResolver(validationSchema)
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageClass, setMessageClass] = useState('');

    //Enviamos los datos del formulario
    const sendMail = async (e) => {
        //e.preventDefault();
        try {
            const formData = {
                //subject: watch('subject'),
                subject: subject,
                name: watch('name'),
                phone: watch('phone'),
                email: watch('email'),
                emailValidate: watch('emailValidate'),
                comments: watch('comments'),
            };

            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: ({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setMessageClass(styles.successMessage);
                return '¡Formulario enviado con éxito!';
            } else {
                throw new Error('Error al enviar el formulario');
            }

        } catch (error) {
            setMessageClass(styles.errorMessage);
            return '¡Error al enviar el formulario! Por favor, inténtalo de nuevo.';
        }
    }


    //Al hacer submit, se imprimen errores o se envia form llamando a sendMail()
    const onSubmit = async (data) => {

        setIsLoading(!isLoading);
        //setMessage('');

        const resultMessage = await sendMail(data);
        setMessage(resultMessage);

        try {
            schema.parse(data);
            reset();
        } catch (error) {
            if (error instanceof ZodError) {
                error.errors.forEach((err) => {
                    const field = err.path[0];
                    const message = err.message;
                    setError(field, { type: 'manual', message });
                });
            }
        } finally {
            await delay(1000);
            setIsLoading(false);
            setMessageClass((prevClasses) => `${prevClasses} ${styles.fadeIn}`);
    
            await delay(3000);
            setMessageClass((prevClasses) => `${prevClasses} ${styles.fadeOut}`);
    
            await delay(500);
            setMessage('');
            setMessageClass('');
        }
    };

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <>
            {title && <h2 className='text-center display-large color-01 secondary-font mb-xl'>{title}</h2>}
            {subtitle && <p className='text-center mb-xl'>{subtitle}</p>}

            <form className={styles.formEvanhub} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.innerForm}>
                    <input type="hidden" name="subject" id="subject" value={subject && subject} />

                    <div className={`row ${styles.Row}`}>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="name">Nombre completo <span>*</span></label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ingresa tu nombre completo"
                                required
                                {...register('name')}
                            />
                            {errors.name && <span className={styles.inputError}>{errors.name.message}</span>}
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="phone">Teléfono <span>*</span></label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="+56 0000 0000"
                                required
                                {...register('phone')}
                            />
                            {errors.phone && <span className={styles.inputError}>{errors.phone.message}</span>}
                        </div>
                    </div>
                    <div className={`row ${styles.Row}`}>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="email">Correo electrónico <span>*</span></label>
                            <input
                                type="email"
                                id="email"
                                placeholder="correo@gmail.com"
                                required
                                {...register('email')}
                            />
                            {errors.email && <span className={styles.inputError}>{errors.email.message}</span>}
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="emailValidate">Confirma correo electrónico <span>*</span></label>
                            <input
                                type="email"
                                id="emailValidate"
                                placeholder="correo@gmail.com"
                                required
                                {...register('emailValidate')}
                            />
                            {errors.emailValidate && <span className={styles.inputError}>{errors.emailValidate.message}</span>}

                        </div>
                    </div>
                    <div className={`row ${styles.Row}`}>
                        <div className="col-sm-12 col-md-12">
                            <label htmlFor="comments">Consulta</label>
                            <textarea
                                id="comments"
                                placeholder="Ingresa el requerimiento de asesoría"
                                {...register('comments')}
                            />
                        </div>
                    </div>
                    <div className={`row mt-xl ${styles.Row}`}>
                        <div className="col-sm-12 col-md-12">
                            <button className="evanhub-btn btn-full__primary" type="submit" disabled={isLoading}>
                                {isLoading ? <span className={styles.loader}></span> : 'Enviar solicitud'}
                            </button>
                        </div>
                    </div>


                    <div className={`${styles.messageForm} ${messageClass}`}>
                        <p className="mb-0"> {message && message}</p>
                    </div>


                </div>
                {/*<pre>{JSON.stringify(watch(), null, 2)}</pre>*/}
            </form>
        </>
    );

}

export default FormGeneral;