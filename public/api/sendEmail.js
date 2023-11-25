import { getMailOptions, transporter } from '~/components/form/emailConfig';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        try {
            // Configura y envía el correo electrónico
            const mailOptions = getMailOptions(data);
            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Correo electrónico enviado exitosamente' });
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).json({ message: 'Error interno del servidor al enviar el correo electrónico' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}