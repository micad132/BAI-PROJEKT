import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../index';
import { Category } from '../../models/Category.model.ts';
import api from '../../services/api/AxiosApi.ts';

interface CategoryReducer {
  categories: Category[],
  isLoaded: boolean,
}

const initialState: CategoryReducer = {
  categories: [],
  isLoaded: false,
};

export const fetchingCategoriesThunk = createAsyncThunk(
  'test',
  async () => {
    try {
      const data = await api.get('http://localhost:8000/category/');
      return data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const addingCategoryThunk = createAsyncThunk(
  'addingThunk',
  async (name: string) => {
    try {
      await api.post('http://localhost:8000/category/', { name });
      const data = await api.get('http://localhost:8000/category/');
      return data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const deletingCategoryThunk = createAsyncThunk(
  'deletingThunk',
  async (id: string) => {
    try {
      await api.delete('http://localhost:8000/category/', { data: { id } });
      const data = await api.get('http://localhost:8000/category/');
      return data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getIsLoaded = (state: RootState): boolean => state.test.isLoaded;
export const getCategories = (state: RootState): Category[] => state.category.categories;

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchingCategoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(addingCategoryThunk.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(deletingCategoryThunk.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoaded = true;
    });
  },
});

export default categorySlice.reducer;
