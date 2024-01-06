import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../index';
import api from '../../services/api/AxiosApi.ts';
import { Product } from '../../models/Product.model.ts';

interface ProductReducer {
  products: Product[],
  isLoaded: boolean,
}

const initialState: ProductReducer = {
  products: [],
  isLoaded: false,
};

export const fetchingProductsThunk = createAsyncThunk(
  'productsFetch',
  async () => {
    try {
      const data = await api.get('http://localhost:8000/product/');
      return data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getIsLoaded = (state: RootState): boolean => state.product.isLoaded;
export const getProducts = (state: RootState): Product[] => state.product.products;

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchingProductsThunk.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoaded = true;
    });
  },
});

export default productSlice.reducer;
