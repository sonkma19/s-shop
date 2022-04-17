
const initialProduct = {
    listProduct: JSON.parse(localStorage.getItem("product")) || null,
    imgProduct: null,
    searchProduct: false
}

const productReducer = (state = initialProduct, action) => {
    switch (action.type) {
        case "PRODUCT": {
            let newListProduct = state.listProduct
            newListProduct = action.payload
            localStorage.setItem("product", JSON.stringify(newListProduct))
            return {
                ...state,
                listProduct: newListProduct,
                imgProduct: null
            }
        }
        case "IMG": {
            let newImg = state.imgProduct
            newImg = action.payload
            return {
                ...state,
                imgProduct: newImg
            }
        }
        case "CHECKSEARCH": {
            let checkSearch = state.searchProduct
            checkSearch = action.payload
            return {
                ...state,
                searchProduct: checkSearch
            }
        }
        default:
            return state
    }

}

export default productReducer