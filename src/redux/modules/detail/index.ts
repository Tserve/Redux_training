import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue, Assignee } from '../../../types';
import { RootState } from '../../store';

type InitialState = Pick<Issue, 'title' | 'number' | 'state' | 'body' | 'labels'> & {
  user: Pick<Assignee, 'avatar_url' | 'login'>;
};

const initialState: InitialState = {
  title: '',
  number: 0,
  state: '',
  user: {
    login: '',
    avatar_url: '',
  },
  body: '',
  labels: [],
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetail: (state, action: PayloadAction<typeof initialState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const selectDetail = (state: RootState) => state.detail;
export const { setDetail } = detailSlice.actions;
export default detailSlice.reducer;
