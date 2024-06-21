import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllProdFetch } from '../Slices/AllProdSlice'
import { useQuery } from '@tanstack/react-query'
import { Container, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CatgListFetch } from '../Slices/CategoryListSlice'
import { Link, useParams } from 'react-router-dom'
import { CatgProductsFetch } from '../Slices/CategoryProdSlice'

export default function CatgProducts() {
    const {name} = useParams()
    const dispatch = useDispatch()

    // const {data:catgListData } = useSelector((state)=>{
    //     console.log("CATG_LIST_STATE....", state?.catglist)
    //     return state?.catglist
    // })

    // useEffect(()=>{
    //     dispatch(CatgListFetch())
    // },[dispatch])

    const getCatgProds = async () => {
        try {
            const response = await dispatch(CatgProductsFetch(name))
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

   



    const { isPending, isError, data, error } = useQuery({
        queryKey: ['catgProducts', name],
        queryFn: getCatgProds,
    })

    const { data: catgListData } = useQuery({
        queryKey: ['categorylist'],
        queryFn: getCatgList,
    })

    console.log("CATG_PROD_DATA.....", data)

    console.log("CATG_LIST_DATA.....", catgListData)


    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div>
            <Container maxWidth="lg">
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
                                                        <Button size="small">Share</Button>
                                                        <Button size="small">Learn More</Button>
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

                        <h3>Categories</h3>

                        {
                           Array.isArray(catgListData) &&  catgListData.map((item,index)=>{
                                return(
                                    <>
                                    <h5><Link to={`/catgproducts/${item}`}> {item} </Link></h5>
                                    </>
                                )
                            })
                        }

                    </Grid>

                </Grid>

            </Container>
            
        </div>
    )
}
