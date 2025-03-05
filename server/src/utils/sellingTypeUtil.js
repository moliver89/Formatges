const sellingTypeUtil = (stock, sellingType) => {
    if (sellingType.toUpperCase() === 'PIEZA') {
        return stock % 0.25 === 0;
    }
    return true; // Si es por kg, cualquier número es válido
};

export default sellingTypeUtil;
