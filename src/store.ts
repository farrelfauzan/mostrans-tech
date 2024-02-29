import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import CharacterReducer from "@/app/slices/Character";
import LocationReducer from "@/app/slices/Location";

const PersistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const reducer = combineReducers({
  character: CharacterReducer,
  location: LocationReducer,
});

const PersistedReducer = persistReducer(PersistConfig, reducer);

export const store = configureStore({
  reducer: PersistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
