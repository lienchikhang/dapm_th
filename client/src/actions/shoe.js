export const viewingShoe = (idShoe) => {
    return {
        type: 'VIEW_SHOE',
        payload: idShoe
    }
}

export const addToCartShoe = (shoe) => {
    return {
        type: 'ADD_TO_CART',
        payload: shoe
    }
}