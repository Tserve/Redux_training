import { configureStore } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch as useReduxDispatch } from 'react-redux';

import currentPageReducer from './modules/currentPage';
import detailReducer from './modules/detail';

// // TODO: slice作成の時に削除する
// type Person = Record<'firstName' | 'lastName', string>;
// const initialState: Person = { firstName: 'hoge', lastName: 'tarou' };
// const setName = createAction<Person, 'setName'>('setName');
// const resetName = createAction<string, 'resetName'>('resetName');
// const sampleReducer = createReducer(initialState, (builder) =>
//   builder
//     .addCase(setName, (state, { payload }: PayloadAction<Person>) => {
//       state.firstName = payload.firstName;
//       state.lastName = payload.lastName;
//     })
//     .addCase(resetName, () => initialState),
// );

export const store = configureStore({
  reducer: {
    pager: currentPageReducer,
    detail: detailReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

// custom useDispatch
type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

// custom useSelector
export const useSelector = createSelectorHook<RootState>();

export default store;
