import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import todosReducer from './features/syncTodoList/todoSlice';
import asyncTodosReducer from './features/asyncTodolist/todoSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './features/rtkQuery/services/pokemon'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    asyncTodos: asyncTodosReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
/*
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
*/
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
