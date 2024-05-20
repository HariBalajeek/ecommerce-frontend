import { createContext, useEffect, useState } from "react"
export const StoreContext = createContext(null)
import {food_list} from '../assets/assets'
import axios from "axios"

const StoreContextProvider = (props) =>{
    const url ="http://localhost:4000/"

    const [cartItems,setCartItems] = useState({})
    const [token,setToken] = useState("")
    

    const addToCart = async(itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+'api/cart/add',{itemId},{headers:{token}})
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            axios.post(url+'api/cart/remove',{itemId},{headers:{token}})
        }
    }

const getTotalCartAmount = () =>{
        let totalAmount =0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo =food_list.find((product)=>product._id===item)
            totalAmount+=itemInfo.price*cartItems[item]
            }
            
        }
        return totalAmount
    }

    const fetchList = async()=>{
        const response = await axios.get(url+'api/food/getlist')
        setFoodList(response.data.data)
    }

    const loadcartData = async(token) => {
        const response = await axios.post(url+'api/cart/getcart',{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect( async()=>{
        const token = localStorage.getItem("token")
        
        
            if(token){
                setToken(token)
                await loadcartData(token)
            }
        
    },[])

    const contextValue = {
        token,
        setToken,
        url,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider