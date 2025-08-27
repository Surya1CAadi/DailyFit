exports.generateDuckId = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

exports.getCredit = (min, max, rate) => {
    return rate*(Math.floor(Math.random() * (max - min + 1)) + min)/100;
}

exports.isInDev = () => {
    return process.env.NODE_ENV === "development";
}

exports.isInProd = () => {
    return process.env.NODE_ENV !== "development";
}

