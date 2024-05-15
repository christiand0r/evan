import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {

    try {
        const { name, phone, email, emailValidate, comments, subject } = await request.json();

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PW,
            },
        });

        const userMailOptions = {
            from: 'noreply@evanhub.cl',
            to: `${email}`,
            subject: `Gracias por tu consuta en Evanhub`,
            html: `<!DOCTYPE html>
                    <html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Mail Evanhub</title>
                    </head>

                    <body>
                        <div dir="ltr" style="background-color:#f7f7f7;margin:0;padding:15px 0;width:100%">
                            <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <div style="width:650px;background-color:#ffffff;border: 1px solid rgba(46,60,113,0.15);">
                                                <table style="width: 100%; padding:16px 38px 16px 38px;background-color:#ffffff; border-bottom: 1px solid rgba(46, 60, 113, 0.15);">
                                                    <tr>
                                                        <td style="width: 50%;">
                                                            <div style="margin: 0 auto">
                                                                <img src="https://evanhub-cms.somosforma.dev/uploads/logo_mail_86d38232b3.png" alt="Logo evanhub" style="height:auto;width:120px;">
                                                            </div>
                                                        </td>
                                                        <td style="width: 50%;">
                                                            <div style="text-align: right;">
                                                                <p style="text-decoration: none; color: #353538;font-weight: 600;font-size: 15px;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
                                                                    ${subject}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>

                                                <!--body mail-->

                                                <div style="padding:48px 58px 48px 58px;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left;">

                                                    <table style="margin: 0 auto;background-color:#ffffff;width:100%;color:#000000;">
                                                        <tr style="text-align:left;">
                                                            <td style="vertical-align: baseline;">
                                                                <h1 style="font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:28px;font-weight: 300; color: #4C6F6A;">
                                                                    ¡Muchas gracias!</h1>
                                                                <p
                                                                    style="font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:16px;font-weight: 300; color: #4B4C4E;">
                                                                    Recibimos correctamente su consulta.</p>

                                                                <!--Datos form -->
                                                                <p style="font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:18px;line-height:normal;font-weight:700;text-align:left;color: #4C6F6A;border-bottom: 1px solid rgba(46, 60, 113, 0.15);padding-bottom: 15px;">
                                                                    Resumen consulta:</p>

                                                                <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                                    Nombre<br>
                                                                    <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                        ${name}
                                                                    </span>
                                                                </p>

                                                                <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                                    Teléfono<br>
                                                                    <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                        ${phone}
                                                                    </span>
                                                                </p>

                                                                <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                                    Correo<br>
                                                                    <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                        ${email}
                                                                    </span>
                                                                </p>

                                                                <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                                    Confirmación de correo<br>
                                                                    <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                        ${email}
                                                                    </span>
                                                                </p>

                                                                <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                                    Consulta<br>
                                                                    <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                        ${comments} 
                                                                    </span>
                                                                </p>

                                                                <div style="border-top:1px solid rgba(46, 60, 113, 0.15)">
                                                                    <p style="line-height:25px;text-decoration:none;color:#4C6F6A;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 16px;font-weight: 300;">
                                                                        Responderemos a su consulta en la brevedad posible
                                                                    </p>

                                                                    <p style="line-height:normal;text-decoration:none;color:#4C6F6A;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 16px;font-weight: 500;margin-bottom: 0;">
                                                                        Atentamente,<br>
                                                                        Equipo Evanhub
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>

                                                <!--footer mail-->
                                                <table style="width: 100%;">
                                                    <tr>
                                                        <td style="text-align: center;"> 
                                                            <div style="border-top: 1px solid rgba(46, 60, 113, 0.15); width: 100%;padding: 24px 0;">
                                                                <img src="https://evanhub-cms.somosforma.dev/uploads/icon_evanhub_mail_8c0060693d.png" height="80" width="80" alt="Icon Evanhub">
                                                            </div>
                                                            <div style="border-top: 1px solid rgba(46, 60, 113, 0.15); padding: 24px 0;">
                                                            <p style="line-height:normal;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 16px;font-weight: 400;margin: 0 auto;width: 410px;">
                                                                    Si tienes alguna consulta contáctate con nuestro equipo
                                                                </p>
                                                                <p style="margin-bottom: 0;">
                                                                    <a style="font-size: 14px; color:#4B4C4E;font-weight: 400;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;text-decoration: none;margin-right: 48px;" href="mailto:correo@gmail.com" target="_blank">
                                                                        <img style="vertical-align: middle;margin-top: -1px;" src="https://evanhub-cms.somosforma.dev/uploads/icon_mail_3d4b441ea0.png" width="30" height="30"/>
                                                                        correo@gmail.com
                                                                    </a>
                                                                    <a style="font-size: 14px; color:#4B4C4E;font-weight: 400;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;text-decoration: none;" href="tel:+562000000000" target="_blank">
                                                                        <img style="vertical-align: middle;margin-top: -1px;" src="https://evanhub-cms.somosforma.dev/uploads/icon_phone_30694fd70b.png" width="30" height="30"/>
                                                                        +562 000 000 00
                                                                    </a>
                                                                </p>
                                                            </div>
                                                            <div style="border-top: 1px solid rgba(46, 60, 113, 0.15); width: 100%;padding: 16px 0;">
                                                                <p style="text-align: center;color:#4B4C4E; font-size: 11px;font-weight: 400;font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;margin: 0;">Copyright © 2023. Todos los derechos reservados.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </body>
                    </html>`
        }

        const adminMailOptions = {
            from: 'noreply@evanhub.cl',
            to: 'matias@somosforma.com',
            subject: `Nuevo mensaje del formulario de contacto ${subject}`,
            html: `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Mail Evanhub</title>
            </head>

            <body>
                <div dir="ltr" style="background-color:#f7f7f7;margin:0;padding:15px 0;width:100%">
                    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                        <tbody>
                            <tr>
                                <td align="center" valign="top">
                                    <div style="width:650px;background-color:#ffffff;border: 1px solid rgba(46,60,113,0.15);">
                                        <table style="width: 100%; padding:16px 38px 16px 38px;background-color:#ffffff; border-bottom: 1px solid rgba(46, 60, 113, 0.15);">
                                            <tr>
                                                <td style="width: 50%;">
                                                    <div style="margin: 0 auto">
                                                        <img src="https://evanhub-cms.somosforma.dev/uploads/logo_mail_86d38232b3.png" alt="Logo evanhub" style="height:auto;width:120px;">
                                                    </div>
                                                </td>
                                                <td style="width: 50%;">
                                                    <div style="text-align: right;">
                                                        <p style="text-decoration: none; color: #353538;font-weight: 600;font-size: 15px;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
                                                            ${subject}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        <!--body mail-->

                                        <div style="padding:48px 58px 48px 58px;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left;">

                                            <table style="margin: 0 auto;background-color:#ffffff;width:100%;color:#000000;">
                                                <tr style="text-align:left;">
                                                    <td style="vertical-align: baseline;">
                                                        <h1 style="font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:28px;font-weight: 300; color: #4C6F6A;">
                                                            ¡Muchas gracias!</h1>
                                                        <p
                                                            style="font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:16px;font-weight: 300; color: #4B4C4E;">
                                                            Recibimos correctamente su consulta.</p>

                                                        <!--Datos form -->
                                                        <p style="font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:18px;line-height:normal;font-weight:700;text-align:left;color: #4C6F6A;border-bottom: 1px solid rgba(46, 60, 113, 0.15);padding-bottom: 15px;">
                                                            Resumen consulta:</p>

                                                        <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                            Nombre<br>
                                                            <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                ${name}
                                                            </span>
                                                        </p>

                                                        <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                            Teléfono<br>
                                                            <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                ${phone}
                                                            </span>
                                                        </p>

                                                        <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                            Correo<br>
                                                            <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                ${email}
                                                            </span>
                                                        </p>

                                                        <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                            Confirmación de correo<br>
                                                            <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                ${email}
                                                            </span>
                                                        </p>

                                                        <p style="line-height:25px;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 15px;font-weight: 500;">
                                                            Consulta<br>
                                                            <span style="color:#4B4C4E;font-size:16px;font-weight: 300;display: block; margin-top: 5px;">
                                                                ${comments} 
                                                            </span>
                                                        </p>

                                                        <div style="border-top:1px solid rgba(46, 60, 113, 0.15)">
                                                            <p style="line-height:25px;text-decoration:none;color:#4C6F6A;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 16px;font-weight: 300;">
                                                                Responderemos a su consulta en la brevedad posible
                                                            </p>

                                                            <p style="line-height:normal;text-decoration:none;color:#4C6F6A;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 16px;font-weight: 500;margin-bottom: 0;">
                                                                Atentamente,<br>
                                                                Equipo Evanhub
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>

                                        <!--footer mail-->
                                        <table style="width: 100%;">
                                            <tr>
                                                <td style="text-align: center;"> 
                                                    <div style="border-top: 1px solid rgba(46, 60, 113, 0.15); width: 100%;padding: 24px 0;">
                                                        <img src="https://evanhub-cms.somosforma.dev/uploads/icon_evanhub_mail_8c0060693d.png" height="80" width="80" alt="Icon Evanhub">
                                                    </div>
                                                    <div style="border-top: 1px solid rgba(46, 60, 113, 0.15); padding: 24px 0;">
                                                    <p style="line-height:normal;text-decoration:none;color:#000000;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size: 16px;font-weight: 400;margin: 0 auto;width: 410px;">
                                                            Si tienes alguna consulta contáctate con nuestro equipo
                                                        </p>
                                                        <p style="margin-bottom: 0;">
                                                            <a style="font-size: 14px; color:#4B4C4E;font-weight: 400;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;text-decoration: none;margin-right: 48px;" href="mailto:correo@gmail.com" target="_blank">
                                                                <img style="vertical-align: middle;margin-top: -1px;" src="https://evanhub-cms.somosforma.dev/uploads/icon_mail_3d4b441ea0.png" width="30" height="30"/>
                                                                correo@gmail.com
                                                            </a>
                                                            <a style="font-size: 14px; color:#4B4C4E;font-weight: 400;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;text-decoration: none;" href="tel:+562000000000" target="_blank">
                                                                <img style="vertical-align: middle;margin-top: -1px;" src="https://evanhub-cms.somosforma.dev/uploads/icon_phone_30694fd70b.png" width="30" height="30"/>
                                                                +562 000 000 00
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div style="border-top: 1px solid rgba(46, 60, 113, 0.15); width: 100%;padding: 16px 0;">
                                                        <p style="text-align: center;color:#4B4C4E; font-size: 11px;font-weight: 400;font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;margin: 0;">Copyright © 2023. Todos los derechos reservados.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
            </html>`
        }

        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to Send" }, { status: 500 })
    }


}