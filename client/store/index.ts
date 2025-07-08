import { configureStore } from '@reduxjs/toolkit'
import category from './features/categories'
import login from './features/login'
import logout from './features/logout'
import register from './features/register'


export const store = configureStore({
  reducer: {
    category,
    login,
    logout,
    register
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch