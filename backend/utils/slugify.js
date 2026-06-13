const slugify = (value) => {

    return value
        .toString()
        .normalize('NFD')//Suppression des accents
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')//Suppression des caractères spéciaux
        .replace(/\s+/g, '-') //Nettoyage des doubles tirets
        .replace(/-+/g, '-');

};

export default slugify;