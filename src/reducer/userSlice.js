// store의 일부이다.
// 사용자 정보 저장 내용 userSlice
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:'user',
  initialState:{
    nickName:'',
    uid:'',
    accessToken:'', 
    email:'',
  },
  reducers:{
    loginUser:(state, action) => {
      state.nickName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
    },
    clearUser:(state, action) => {
      state.nickName = '';
      state.uid = '';
      state.accessToken = '';
      state.email = '';
    },
  },
});

// 비구조화
export const {loginUser, clearUser} = userSlice.actions;
export default userSlice;