/* eslint-disable */

import { configureStore } from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import testReducer from "./reducers/testReducer.tsx";
import userReducer from "./reducers/userReducer.tsx";
import categoryReducer from "./reducers/categoryReducer.tsx";

export const store = configureStore({
    reducer: {
        test: testReducer,
        user: userReducer,
        category: categoryReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
