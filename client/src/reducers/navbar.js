const initialState = {
    navItem: [],
    selectedCate: ''
}

const navbarReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case 'UPDATE_CATES': {
            return {
                ...state,
                navItem: [...state.navItem, payload]
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
        default: {
            return {
                ...state
            }
        }
    }
}

export default navbarReducer