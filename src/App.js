/** @format */

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./reducer/userSlice";
import firebase from "./firebase";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Todo from "./pages/Todo";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserInfo from './pages/UserInfo';

const App = () => {
  // action 보내서 store.user.state를 업데이트
  const dispatch = useDispatch();
  //내용 출력하기

  useEffect(() => {
    //fb의 사용자 로그인 변경 이벤트
    firebase.auth().onAuthStateChanged((userInfo) => {
      // fb에 로그인시 출력 정보 확인 console.log('로그인 정보:',userInfo);
      if (userInfo) {
        //로그인을 했다.
        // store.user.state에 저장
        // userInfo는 fb에서 
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        // 로그아웃 했어요.
        // store.user.state를 초기화
        dispatch(clearUser());
    }
  });
  });

  return (
    <Router>
      <Header />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
