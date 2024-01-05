import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../index';

interface TestType {
  name: string,
  isLoaded: boolean,
}

const initialState: TestType = {
  name: '',
  isLoaded: false,
};

export const fetchingTestData = createAsyncThunk(
  'test',
  async () => {
    const data = await axios.get('https://swapi.dev/api/people/1/');
    return data.data.name;
  },
);

export const getIsLoaded = (state: RootState): boolean => state.test.isLoaded;
export const getTestName = (state: RootState): string => state.test.name;

const testSlice = createSlice({
  name: 'testSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchingTestData.fulfilled, (state, action) => {
      state.name = action.payload;
      state.isLoaded = true;
    });
  },
});

export default testSlice.reducer;
