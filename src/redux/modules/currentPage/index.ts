import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Issue } from '../../../types';
import { RootState } from '../../store';

// TODO: issueに関するcreateSlice, thunkなどを追加する

const initialState = 'index';

export const getIssue = createAsyncThunk<Issue[]>(
  'issues/fetch',
  async (): Promise<Issue[]> => {
    const response = await axios.get<Issue[]>('https://api.github.com/repos/Facebook/react/issues?per_page=25&page=1');
    return response.data;
  },
);

export const currentPageSlice = createSlice({
  name: 'pager',
  initialState: initialState,
  reducers: {
    togglePage: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const selectPager = (state: RootState) => state.pager;
export const { togglePage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
