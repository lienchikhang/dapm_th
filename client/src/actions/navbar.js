export const changeCate = (cate) => {
    return {
        type: 'UPDATE_CATES',
        payload: cate,
    }
}

export const removeCate = (cate) => {
    return {
        type: 'REMOVE_CATE',
        payload: cate,
    }
}

export const selectedCate = (cate) => {
    return {
        type: 'UPDATE_CATES', //SELECT_CATE
        payload: cate,
    }
}

export const selectedColor = (color) => {
    return {
        type: 'UPDATE_CATES', //SELECT_COLOR
        payload: color
    }
}