import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import usersReducer, { usersService } from './store/features/users/usersSlice';
import tableReducer from './store/features/table/selectedRowsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    table: tableReducer,
    // Add usersApi reducer
    [usersService.reducerPath]: usersService.reducer,
  },
  // Add usersService middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersService.middleware),
});

// Set up listeners for RTK Query
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;