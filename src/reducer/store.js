// slice들을 모아서 store에 저장한다
import { configureStore } from '@reduxjs/toolkit';
// localStorage 저장 라이브러리
import userSlice from './userSlice';
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

const reducers = combineReducers({
  user: userSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"], 
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer:persistedReducer,
  //임시로 middleware 체크 기능 제거
  middleware:(getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck:false,
    });
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;