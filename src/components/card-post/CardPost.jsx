import Image from "next/image";
import Link from "next/link";
import styles from "./CardPost.module.css";

const slugify = (text) => {
    if (typeof text !== 'string') {
        return '';
    }

    const from = "ÁÉÍÓÚáéíóú";
    const to   = "AEIOUaeiou";

    const newText = text.split('').map((char, i) => 
        from.indexOf(char) !== -1 ? to[from.indexOf(char)] : char
    ).join('');

    return newText
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

const CardPost = (props) => {

    const { urlImage, title, categories, date, short_content, tags} = props;

    const categoriesRes = categories.data;
    const tagsRes = tags.data;

    const fechaString = date;
    const fecha = new Date(fechaString);

    const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesDeFormato);

    const fechaFormateada = formatoFecha.format(fecha);

    return (
        <article className="card-post">
            <div className={styles.CardImage}>
                {urlImage && (
                    <Link href={`/noticias/${slugify(title)}`}>
                        <Image
                            src={urlImage}
                            alt={` Imagen ${title} noticia`}
                            width={600}
                            height={400}
                        />
                    </Link>
                )}
            </div>
            <div className={styles.CardInfoContent}>
                {categoriesRes.length > 0 && (
                    <div className={styles.CardCategory}>
                        {categoriesRes.map((item) => (
                            <span key={item.id}>{item.attributes.name}</span>
                        ))}
                    </div>
                )}
                {date && (
                    <div className={styles.CardDate}>
                        <span>{fechaFormateada}</span>
                    </div>
                )}
                {title && (
                    <div className={styles.CardTitle}>
                        <Link href={`/noticias/${slugify(title)}`}>
                            <h3>{title}</h3>
                        </Link>
                    </div>
                )}
                <div className={styles.CardShortContent}>
                    <p>
                        {short_content}
                    </p>
                </div>

                {tagsRes.length > 0 && (
                    <div className={styles.CardTags}>
                        {tagsRes.map((item, index) => (
                            <div className={styles.itemTag} key={index}>
                                <span key={`${item.id}`}>{item.attributes.name}</span>

                                {index < tagsRes.length - 1 && (
                                    <span key={`${item.id}-separator`} className={styles.TagsSeparator}>-</span>
                                )}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </article>
    );
};

export default CardPost;