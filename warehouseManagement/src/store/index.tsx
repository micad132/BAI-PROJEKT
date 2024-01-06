/* eslint-disable */

import { configureStore } from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./reducers/userReducer.tsx";
import categoryReducer from "./reducers/categoryReducer.tsx";
import productReducer from "./reducers/productReducer.tsx";
import workersReducer from "./reducers/workersReducer.tsx";

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        product: productReducer,
        worker: workersReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
