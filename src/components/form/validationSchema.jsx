import { z } from 'zod';

const isPhoneNumber = (value) => /^\+?\d{1,4}[\s.-]?\d{1,15}$/.test(value);

export const validationSchema  = z.object({
    //subjet: z.string(),
    name: z.string().min(2, { message: 'Ingrese un nombre válido (mayor a 2 caracteres)' }).max(50, { message: 'Ingrese un nombre válido (menor a 50 caracteres)' }),
    phone: z.string().refine(isPhoneNumber, { message: 'Ingrese un número de teléfono válido' }),
    email: z.string().email({ message: 'Ingrese una dirección de correo electrónico válida' }),
    emailValidate: z.string().refine((value) => value === email.value, { message: 'Los correos electrónicos no coinciden' }),
    //emailValidate: z.string().email({ message: 'Ingrese una dirección de correo electrónico válida' }),
    comments: z.string(),
});