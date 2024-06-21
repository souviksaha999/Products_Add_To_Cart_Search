import { configureStore } from '@reduxjs/toolkit'
import AllProdSlice from '../AllProdSlice'
import CategoryListSlice from '../CategoryListSlice'
import CategoryProductsSlice from '../CategoryProdSlice'
import SearchSlice from '../SearchSlice'
import addToCartSlice from '../CartSlice'

export const store = configureStore({
  reducer: {
    allproducts : AllProdSlice,
    catglist : CategoryListSlice,
    catgproducts : CategoryProductsSlice,
    search : SearchSlice,
    addToCart : addToCartSlice,
  },
})