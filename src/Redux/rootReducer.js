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
        localStorage.setItem("bag", JSON.stringify([...state.bag, action.product]))

        return {
            ...state,
            bag: [...state.bag, action.product]
        }
    }

    if(action.type === "CLEAR_BAG"){
        localStorage.removeItem("bag")
        return {
            ...state,
            bag: []
        }
    }

    if(action.type === "REMOVE_BAG_ITEM"){
        const newBag = state.bag.filter(bagItem => bagItem.id !== action.id)
        localStorage.setItem("bag", JSON.stringify(newBag))

        return {
            ...state,
            bag: newBag
        }
    }

    if(action.type === "QUANTITY_INC"){        

        const newBag = state.bag.map(item=>{
            if(item.id===action.id){
                if(item.quantity < 10){
                    return{
                        ...item,
                        quantity: Number(item.quantity)+1
                    } 
                } else return item
                

            } else return item
        })
        
        localStorage.setItem("bag", JSON.stringify(newBag))

        return {
            ...state,
            bag: newBag
        }
    }

    if(action.type === "QUANTITY_DEC"){        

        const newBag = state.bag.map(item=>{
            if(item.id===action.id){
                if(item.quantity > 1){
                    return{
                        ...item,
                        quantity: Number(item.quantity)-1
                    } 
                } else return item
                

            } else return item
        })
        

        localStorage.setItem("bag", JSON.stringify(newBag))

        return {
            ...state,
            bag: newBag
        }
    }

    

    //forgetting this next line made me almost quit the task :)
    else return state


}

export default rootReducer