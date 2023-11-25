import Link from "next/link";

const Button = (props) =>{
    const { label = 'Titulo botón', target = '_self', style , url = '#', icon, type } = props;

    //console.log(style);

    let buttonClasses = `evanhub-btn mx-w-250 ${style ?? ''}`;

    if (type === 'full primary') {
        buttonClasses += ' btn-full__primary';
    } else if (type === 'outline primary') {
        buttonClasses += ' btn-outline__primary';
    } else if (type === 'outline secondary') {
        buttonClasses += ' btn-outline__secondary';
    }else{
        buttonClasses += ' btn-full__primary';
    }

    return(
        <Link target={target} className={buttonClasses} href={url}>
            {label} {icon && <span>{icon}</span>}
        </Link>
    );
}

export default Button;