const initialState = {
    navItem: [],
    selectedCate: '',
    qPrice: 0,
}

const navbarReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case 'QUERY_PRICE': {
            return {
                ...state,
                qPrice: payload
            }
        }
        case 'UPDATE_CATES': {
            return {
                ...state,
                navItem: payload
            }
        }
        case 'REMOVE_CATE': {
            let cloneCate = [...state.navItem]
            const indexRemove = cloneCate.findIndex((item) => item === payload)
            if(indexRemove != -1) cloneCate.splice(indexRemove, 1) 
            return {
                ...state,
                navItem: [...cloneCate]
            }
        }
        case 'SELECT_CATE': {
            return {
                ...state,
                navItem: [payload],
                selectedCate: payload
            }
        }
        case 'SELECT_COLOR': {
            return {
                ...state,
                navItem: [...state.navItem, payload]
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default navbarReducer