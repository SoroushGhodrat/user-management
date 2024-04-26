import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import usersReducer, { usersService } from './store/features/users/usersSlice'
import tableReducer from './store/features/table/selectedRowsSlice'
import paginationReducer from '@/store/features/table/paginationSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    table: tableReducer,
    pagination: paginationReducer,
    // Add usersApi reducer
    [usersService.reducerPath]: usersService.reducer,
  },
  // Add usersService middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersService.middleware),
})

// Log the initial state
console.log('All Data in Store => ', store.getState())

// Set up listeners for RTK Query
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
