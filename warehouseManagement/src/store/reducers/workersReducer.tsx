import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../index';
import api from '../../services/api/AxiosApi.ts';
import { Worker } from '../../models/Worker.model.ts';

interface WorkersReducer {
  workers: Worker[],
  isLoaded: boolean,
}

const initialState: WorkersReducer = {
  workers: [],
  isLoaded: false,
};

export const fetchingWorkersThunk = createAsyncThunk(
  'workersFetch',
  async () => {
    try {
      const data = await api.get('http://localhost:8000/worker/');
      return data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getIsLoaded = (state: RootState): boolean => state.worker.isLoaded;
export const getWorkers = (state: RootState): Worker[] => state.worker.workers;

const workersSlice = createSlice({
  name: 'workersSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchingWorkersThunk.fulfilled, (state, action) => {
      state.workers = action.payload;
      state.isLoaded = true;
    });
  },
});

export default workersSlice.reducer;
