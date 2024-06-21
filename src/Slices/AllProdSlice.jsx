import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";


export const AllProdFetch = createAsyncThunk("AllProducts / Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/products`)
        console.log("ALL_PRODUCTS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const AllProdSlice = createSlice({
    name : "allproducts",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(AllProdFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(AllProdFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(AllProdFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default AllProdSlice.reducer