export const removeSpecialChar = (item) => {
    let modifiedString = item.replace(/\*\*/g, '');
    return modifiedString;
}