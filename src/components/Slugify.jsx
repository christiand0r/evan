const Slugify = (text) => {
    if (typeof text !== 'string') {
        return '';
    }

    const from = "ÁÉÍÓÚáéíóú";
    const to = "AEIOUaeiou";

    const newText = text.split('').map((char, i) =>
        from.indexOf(char) !== -1 ? to[from.indexOf(char)] : char
    ).join('');

    return newText
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

export default Slugify;