import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";


export const SearchFetch = createAsyncThunk("Search / Fetch", async(name, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/products/search?q=${name}`)
        console.log("SEARCH_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const SearchSlice = createSlice({
    name : "searchproducts",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(SearchFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(SearchFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(SearchFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default SearchSlice.reducer