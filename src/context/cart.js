import {useState,useContext,createContext,useEffect} from 'react'

    const CartContext =createContext()
const CartProvider =({children})=>{
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        let existingItem= localStorage.getItem("cart")
        if(existingItem) setCart(JSON.parse(existingItem))
    },[]);

return(<CartContext.Provider value={[cart,setCart]}>
    {children}
</CartContext.Provider>)
}


//custom Hook

const useCart=()=> useContext(CartContext)

export { useCart , CartProvider };