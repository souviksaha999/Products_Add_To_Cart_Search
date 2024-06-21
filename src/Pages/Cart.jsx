import React, { useEffect } from 'react'
import Layout from "../Common/Layout"
import { Button, Container, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { addToCart, clearCart, decreaseCart, getTotals, removeItem } from '../Slices/CartSlice'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Cart() {

    const { cartItems, cartTotalQuantity, cartTotalAmount, loading, error } = useSelector((state) => {
        console.log("CART_STATE......", state?.addToCart)
        return state?.addToCart
    })

    const dispatch = useDispatch()

    const handleRemove = (product) => {
        dispatch(removeItem(product))
    }
   

    const handleIncQty = (product) => {
        dispatch(addToCart(product))
    }

    const handleDecQty = (product) => {
        dispatch(decreaseCart(product))
    }

    const handleClear = () => {
        dispatch(clearCart())
    }

    useEffect(()=>{
        dispatch(getTotals())
    },[cartItems])
   




    return (
        <Layout>
            <Container maxWidth="lg" sx={{ marginTop: "100px" }} >
                <h1> Shopping Cart </h1>
                {
                    cartItems?.length === 0 ? (
                        <>
                            Your Cart is Empty.
                            <Link to="/allproducts" style={{ textDecoration: "none", color: "black" }}> <KeyboardReturnIcon /> Start Shopping</Link>
                        </>) : (
                        <>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div><h3>Product</h3></div>
                                <div><h3>Price</h3></div>
                                <div><h3>Quantity</h3></div>
                                <div><h3>Total</h3></div>
                            </div>

                            <div >
                                {
                                    Array.isArray(cartItems) && cartItems.map((item, index) => {
                                        return (
                                            <>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div style={{ display: "flex" }} > 
                                                        <img src={item?.thumbnail} alt="" height="100px" /> <p style={{ paddingTop: "20px" }} > {item?.title} </p> 
                                                         <Button size='small' onClick={()=>handleRemove(item)}><DeleteOutlineIcon color='warning' /> </Button>
                                                          </div>
                                                    <div><p style={{ paddingTop: "40px" }}> ${item?.price} </p></div>
                                                    <div><p style={{ paddingTop: "40px" }}>
                                                        <Button variant='contained' color='secondary'  sx={{ margin: "0px 10px" }} onClick={()=>handleDecQty(item)} > - </Button>
                                                        {item?.cartQuantity}
                                                        <Button variant='contained' color='secondary' sx={{ margin: "0px 10px" }} onClick={()=>handleIncQty(item)}> + </Button>

                                                    </p>

                                                    </div>

                                                    <div><p style={{ paddingTop: "40px" }}> ${item?.price * item?.cartQuantity}  </p></div>
                                                </div>
                                                <Divider />


                                            </>
                                        )
                                    })
                                }

                            </div>
                            <Divider />

                            <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
                                <div><Button variant='outlined' onClick={handleClear} >Clear Cart</Button></div>

                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div><h3> Subtotal </h3> </div>
                                        {/* <div> <h3> 9999 </h3> </div> */}
                                        <div> <h3> ${cartTotalAmount} </h3> </div>
                                    </div>
                                    <div> Taxes and Shipping calculated at checkout.  </div>
                                    <div><Button variant='contained' fullWidth> Check Out </Button></div>
                                    <div> <Link to="/allproducts" style={{ textDecoration: "none", color: "black" }} >
                                        <p>  <KeyboardBackspaceIcon />  Continue Shopping  </p>  </Link> </div>
                                </div>
                            </div>


                        </>)
                }
            </Container>
        </Layout>
    )
}
