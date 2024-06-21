import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";


export const CatgProductsFetch = createAsyncThunk("Category_Products / Fetch", async(catgname, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/products/category/${catgname}`)
        console.log("CATEGORY_PRODUCTS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const CategoryProductsSlice = createSlice({
    name : "categoryproducts",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(CatgProductsFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(CatgProductsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(CatgProductsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default CategoryProductsSlice.reducer