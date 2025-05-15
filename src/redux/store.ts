import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { UsersState } from "./reducers/users-reducer";
import cakesReducer, { CakesState } from "./reducers/cakes-reducer";
import chatsReducer, { ChatsState } from "./reducers/chats-reducer";

const store = configureStore({
  reducer: {
    users: usersReducer as (state: UsersState | undefined, action: any) => UsersState,
    cakes: cakesReducer as (state: CakesState | undefined, action: any) => CakesState,
    chats: chatsReducer as (state: ChatsState | undefined, action: any) => ChatsState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;