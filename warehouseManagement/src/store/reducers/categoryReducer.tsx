import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../index';
import { Category } from '../../models/Category.model.ts';

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
    const token = localStorage.getItem('access_token');
    try {
      const data = await axios.get('http://localhost:8080/category/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('DATA KAT', data);
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
  },
});

export default categorySlice.reducer;
