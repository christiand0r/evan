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
            subject: `${subject}`,
            html: `<h3>Hello</h3> ${comments} ${name} ${phone} ${email}`
        }

        const adminMailOptions = {
            from: 'noreply@evanhub.cl',
            to: 'admin@example.com',
            subject: `Nuevo mensaje del formulario de contacto ${subject}`,
            html: `<p>Nombre: ${name}</p><p>Teléfono: ${phone}</p><p>Email: ${email}</p><p>Asunto: ${subject}</p><p>Comentarios: ${comments}</p>`
        }

        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to Send" }, { status: 500 })
    }


}