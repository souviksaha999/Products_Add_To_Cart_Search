import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";



const addToCartSlice = createSlice({
    name: "allproducts",
    initialState: {
        // cartItems: [],
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [] , // This is done, so that when we refresh added item doesn't get Vanished
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
        loading: false,
        error: null
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => {    // This is done to increase the product quantity that has already been added.
                return item.id === action.payload.id
            })
            if (itemIndex >= 0) {                               // If Item is already present in the cart then findIndex will show result >= 0 else -1
                state.cartItems[itemIndex].cartQuantity += 1
                // toast.info("Increased Product Quantity", {
                //     position : "bottom-left"
                // })
                toast.info(`Increased ${state.cartItems[itemIndex].title} Quantity`, {
                    position : "bottom-left"
                })
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                // state.cartItems.push(action?.payload)
                state.cartItems.push(tempProduct)
                // toast.success("Product Added Successfully..", {
                //     position : "bottom-left"
                // })
                toast.success(`${action.payload.title} Added Successfully..`, {
                    position : "bottom-left"
                })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },


        removeItem : (state,action)=>{
            const newCartItems = state.cartItems.filter((item)=>{
                return item.id !== action?.payload?.id
            })
            state.cartItems = newCartItems
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))  // otherwise after refresing we will get the previous state of the cart i.e added products.
            toast.error(`${action?.payload?.title} removed from your cart`,{
                position : "top-center"
            })
        },

        decreaseCart : (state,action)=>{
            const itemIndex = state.cartItems.findIndex((item) => {    // This is done to increase the product quantity that has already been added.
                return item.id === action.payload.id
            })

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -=1 ;

                toast.info(`Decerased ${action.payload.title} cart Quantity`)
            }else if (state.cartItems[itemIndex].cartQuantity === 1 ) {
                const nextCartItem = state.cartItems.filter((item)=>{
                    return item.id !== action?.payload?.id
                })
                state.cartItems = nextCartItem;
                toast.error(`${action.payload.name} removed from cart`)
            }
                        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },

        clearCart : (state,action)=>{
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))  // otherwise after refresing we will get the previous state of the cart.
        },


        getTotals : (state,action)=>{
           let {totalQty, totalPrice} = state.cartItems.reduce((cartTotal, item)=>{   // Here TotalQty = cartTotal.totalPrice && TotalCost = cartTotal.totalQty. We have Destructured the data.
                const {price, cartQuantity} = item     // Here we Have destructured item.
                const itemTotal = price * cartQuantity  // This is the total price of particular item

                cartTotal.totalPrice += itemTotal              // This is the total price of all items in the cart
                cartTotal.totalQty += cartQuantity

                return cartTotal

            }, {totalPrice : 0,totalQty: 0})

            state.cartTotalQuantity = totalQty;
            state.cartTotalAmount = totalPrice
        }
    },


})

export const { addToCart,removeItem, clearCart,decreaseCart, getTotals } = addToCartSlice.actions

export default addToCartSlice.reducer
