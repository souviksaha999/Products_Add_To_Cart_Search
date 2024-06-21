import { AppBar, Badge, Button, Container, Drawer, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Cart from '../Pages/Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getTotals } from '../Slices/CartSlice';

export default function Nav() {

  const [cartOpen, setCartOpen] = useState(false)
  const dispatch = useDispatch()
 
  const { cartItems, cartTotalQuantity } = useSelector((state) => {
    console.log("NAV_STATE......", state?.addToCart)
    return state?.addToCart
})

useEffect(()=>{
  dispatch(getTotals())
},[cartItems])


  const handleToggleCart = () =>{
    setCartOpen((prevOpen) => {
      return !prevOpen 
    } )
  }


  return (
    <>
      <Container>
        <AppBar style={{ backgroundColor: "#6351ce" }}>
          <Toolbar >
            <Typography component='div' sx={{paddingLeft : "20px"}} > 
              <AcUnitIcon fontSize='large' />
            </Typography>

            <Typography component='div' sx={{ paddingLeft: "18px", fontSize: "30px", fontWeight: "bold", flexGrow: 1 }} > LOGO </Typography>

            <Stack direction="row" spacing={2} >
              <Button><Link to='/' style={{ color: "white", fontSize: " 18px", textDecoration: "none" }}> Home </Link></Button>
              <Button><Link to='/allproducts' style={{ color: "white", fontSize: " 18px", textDecoration: "none" }}> Products </Link></Button>
              <Button><Link to='/allproducts' style={{ color: "white", fontSize: " 18px", textDecoration: "none" }}> Login </Link></Button>
              <Button><Link to='/allproducts' style={{ color: "white", fontSize: " 18px", textDecoration: "none" }}> Register </Link></Button>

            </Stack>

            <IconButton color='inherit' onClick={handleToggleCart}>
                {/* <Badge badgeContent= {cart.length} color='secondary' > */}
                <Badge badgeContent= {cartTotalQuantity} color='secondary' >
                   <Link to="/cart" style={{textDecoration :"none" , color:"white"}} > <ShoppingCartIcon fontSize='large' /> </Link> 
                </Badge>

            </IconButton>


          </Toolbar>
        </AppBar>

        {/* <Drawer anchor='right' open={cartOpen} onClose={handleToggleCart}> */}
          {/* <Cart /> */}
          {/* jggdsgdfhfdydydydy
        </Drawer> */}

      </Container>
    </>
  )
}
