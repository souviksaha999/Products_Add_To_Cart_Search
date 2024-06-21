import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";


export const CatgListFetch = createAsyncThunk("Category_List / Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/products/category-list`)
        console.log("CATEGORY_LIST_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const CategoryListSlice = createSlice({
    name : "categorylist",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(CatgListFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(CatgListFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(CatgListFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default CategoryListSlice.reducer