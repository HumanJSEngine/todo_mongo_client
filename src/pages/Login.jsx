import React, { useState, useRef, useEffect } from "react";
import LoginDiv from "../styles/loginCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("bmj44571627@gmail.com");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //로그인 처리

  const signInFunc = (e) => {
    e.preventDefault();
    if (!email || !pw) {
      return Swal.fire({
        title: "이메일을 입력하세요.",
        width: 600,
        padding: "3em",
        color: "#716add",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/cat.gif")
          left top
          no-repeat
        `,
      });
    }

    const tempUser = firebase.auth();
    tempUser
      .signInWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        console.log(user);
        // Redux를 이용한 App의 store 관리 시작
        // component의 state로 관리하기는 복잡하다
        navigate("/todo");
      })
      .catch((error) => {
        // 로그인 실패
        const errorCode = error.code;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          setErrMsg("에러");
        }
      });
  };

  return (
    <div className="p-6 m-4 shadow">
      <h2>Login</h2>
      <LoginDiv>
        <form>
          <label>이메일</label>
          <input
            ref={inputRef}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>비밀번호</label>
          <input
            type="password"
            required
            autoComplete="off"
            maxLength={10}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          {errMsg !== "" && <p style={{ color: "skyblue" }}>{errMsg}</p>}
          <button onClick={(e) => signInFunc(e)}>로그인</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            회원가입
          </button>
        </form>
      </LoginDiv>
    </div>
  );
};

export default Login;
