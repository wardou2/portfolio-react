// eslint-disable-next-line import/prefer-default-export
export const sanitizeArray = (array) => {
    if (array.length === 1 && array[0] === "") return [];
    return array;
};
