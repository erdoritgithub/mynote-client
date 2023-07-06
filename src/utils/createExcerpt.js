const createExcerpt = ( str, limit ) => {
    let shortText = str;
    shortText = shortText.substr( 0, shortText.lastIndexOf( ' ', limit ) ) + '...';

    return shortText;
}

export default createExcerpt