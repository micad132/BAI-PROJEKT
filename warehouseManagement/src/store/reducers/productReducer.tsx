import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../index';
import api from '../../services/api/AxiosApi.ts';
import { AddProduct, Product } from '../../models/Product.model.ts';

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

export const addingProductThunk = createAsyncThunk(
  'productAdd',
  async (productData: AddProduct) => {
    try {
      await api.post('http://localhost:8000/product/', productData);
      const data = await api.get('http://localhost:8000/product/');
      return data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const deletingProductThunk = createAsyncThunk(
  'deleteProduct',
  async (id_product: string) => {
    try {
      await api.delete(`http://localhost:8000/product/${id_product}`);
      const data = await api.get('http://localhost:8000/product/');
      return data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const editingProductThunk = createAsyncThunk(
  'editProduct',
  async (productData: Product) => {
    try {
      await api.patch('http://localhost:8000/product/', productData);
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
    builder.addCase(addingProductThunk.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(deletingProductThunk.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(editingProductThunk.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoaded = true;
    });
  },
});

export default productSlice.reducer;
