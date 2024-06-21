import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AllProdFetch } from '../Slices/AllProdSlice'
import { useQuery } from '@tanstack/react-query'
import { Container, Grid, TextField } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CatgListFetch } from '../Slices/CategoryListSlice'
import { Link } from 'react-router-dom'
import { SearchFetch } from '../Slices/SearchSlice'
import { addToCart } from '../Slices/CartSlice'
import Layout from '../Common/Layout'

export default function AllProducts() {

    const dispatch = useDispatch()
    const [input, setInput] = useState("Search")

    const handleChange = (e) => {
        setInput(e.target.value)
        console.log(input)
    }

    const getAllProds = async () => {
        try {
            const response = await dispatch(AllProdFetch())
            return response?.payload?.products
        } catch (error) {
            return error
        }
    }

    const getCatgList = async () => {
        try {
            const response = await dispatch(CatgListFetch())
            return response?.payload
        } catch (error) {
            return error
        }
    }

    const getSearch = async () => {
        try {
            const response = await dispatch(SearchFetch(input))
            // const response = await dispatch(SearchFetch("top"))
            return response?.payload?.products
        } catch (error) {
            return error
        }
    }



    const { isPending, isError, data, error } = useQuery({
        queryKey: ['allProducts'],
        queryFn: getAllProds,
    })

    const { data: catgListData } = useQuery({
        queryKey: ['categorylist'],
        queryFn: getCatgList,
    })

    const { data: searchData } = useQuery({
        queryKey: ['search',input],
        queryFn: getSearch,
    })

    console.log("DATA.....", data)

    // console.log("CATG__DATA.....", catgListData)

    console.log("SEARCH__DATA.....", searchData)

    const addItem = (prod)=>{
        console.log("ADD_TO_CART_DATA....", prod)
        dispatch(addToCart(prod))
    }
   

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <Layout>
            <Container maxWidth="lg" style={{marginTop : "100px"}}>
                <Grid container spacing={2}>
                
                    <Grid item md={8}>
                        <Grid container spacing={2}>
                            {
                               Array.isArray(data) && data.map((item, index) => {
                                    return (
                                        <>
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Card sx={{ maxWidth: 500 }}>
                                                    
                                                    <div>
                                                        <img src={item?.thumbnail} alt="" height="110px" />
                                                    </div>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {item?.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item?.category}

                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button variant='contained' size="small" color='success' onClick={()=>addItem(item)} >Add To Cart</Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>

                                        </>
                                    )
                                })
                            }

                        </Grid>
                    </Grid>





                    <Grid item md={4}>

                        <TextField type='search' name='' value={input} onChange={handleChange} /> <br />
                        {/* <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="search"
                                value={input}
                                onChange={handleChange}
                                placeholder="Search..."
                                style={{ height: '50px', marginBottom: '20px' }}
                            />
                        </form> */}
                        {
                            Array.isArray(searchData) && searchData.map((item,index)=>{
                                return(
                                    <>
                                        <img src={item?.thumbnail} alt="" height="70px" />
                                        {item?.title} <br />
                                    
                                    </>
                                )
                            })
                        }

                        <h3>Categories</h3>

                        {
                            catgListData.map((item, index) => {
                                return (
                                    <>
                                        <h5><Link to={`/catgproducts/${item}`}> {item} </Link></h5>
                                    </>
                                )
                            })
                        }

                    </Grid>

                </Grid>

            </Container>
        </Layout>
    )
}
