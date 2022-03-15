const currentID = window.location.pathname.split('/')[2]
const preferredCurrency = localStorage.getItem('preferredCurrency')
const initialState = {
    category: "all",
    productID: currentID,
    currency: preferredCurrency || "USD",
    bag: JSON.parse(localStorage.getItem("bag")) || []
}

const rootReducer = (state = initialState, action) => {
    if(action.type === "CATEGORY_UPDATE"){
        return {
            ...state,
            category: action.category
        }
    }

    if(action.type === "CURRENCY_UPDATE"){
        return {
            ...state,
            currency: action.currency
        }
    }

    if(action.type === "PRODUCT_ID_UPDATE"){
        return {
            ...state,
            productID: action.productID
        }
    }

    if(action.type === "ADD_TO_BAG"){
        return {
            ...state,
            bag: [...state.bag, action.product]
        }
    }

    if(action.type === "CLEAR_BAG"){
        return {
            ...state,
            bag: []
        }
    }

    

    //forgetting this next line made me almost quit the task :)
    else return state


}

export default rootReducer