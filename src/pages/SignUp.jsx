import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpDiv from "../styles/signUpCss";
import firebase from "../firebase";
import axios from "axios";

const SignUp = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setpwCheck] = useState("");
  // 연속버튼을 막는 변수
  const [btFlag, setBtFlag] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //firebase 회원가입 기능
  const registFunc = (e) => {
    e.preventDefault();
    if (!nickName) {
      return alert("빈칸을 채우시오");
    }
    if (!email) {
      return alert("이메일을 입력");
    }
    if (!pw) {
      return alert("비밀번호 입력");
    }
    if (!pwCheck) {
      return alert("비밀번호 확인을 입력");
    }
    // 비밀번호가 같은지 비교처리

    if (pw !== pwCheck) {
      return alert("비밀번호 확인이 다릅니다");
    }

    if (!nameCheck) {
      return alert("닉네임 중복검사를 해주세요");
    }

    //연속 클릭 막기
    setBtFlag(true);

    const createUser = firebase.auth();
    createUser
      .createUserWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        user
          .updateProfile({ displayName: nickName })
          .then(() => {
            let body = {
              email: user.email,
              displayName: user.displayName,
              uid: user.uid,
            };
            axios
              .post("/api/user/register", body)
              .then((response) => {
                if (response.data.success) {
                  navigate("/login");
                } else {
                  console.log("재저장 도전");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {});
      })
      .catch((error) => {
        setBtFlag(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // 2. 이름 중복 검사

  const [nameCheck, setNameCheck] = useState(false);

  const nameCheckFn = (e) => {
    e.preventDefault();
    //닉네임이 입력되었는지 체크
    if (!nickName) {
      return alert("닉네임을 입력해 주세요");
    }
    // 데이터베이스 서버에서 닉네임 존재 여부 파악
    const body = {
      displayName: nickName,
    };
    axios
      .post("/api/user/namecheck", body)
      .then((response) => {
        if(response.data.success){
          if(response.data.check){
            //사용자 중복 체크 완료
            setNameCheck(true);
            alert('등록이 가능합니다.')
            // 등록가능
          }else{
            setNameCheck(false);
            alert('이미 등록된 닉네임입니다')
            // 등록 불가능
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-6 m-4 shadow">
      <h2>SignUp</h2>
      <SignUpDiv>
        <form>
          <label>닉네임</label>
          <input
            ref={inputRef}
            type="text"
            value={nickName}
            maxLength={12}
            onChange={(e) => setNickName(e.target.value)}
          />
          <button onClick={(e) => nameCheckFn(e)}>닉네임 중복검사</button>
          <label>이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>비밀번호</label>
          <input
            type="password"
            required
            value={pw}
            maxLength={16}
            minLength={10}
            autoComplete="off"
            onChange={(e) => setPw(e.target.value)}
          />
          <label>비밀번호 확인</label>
          <input
            type="password"
            required
            value={pwCheck}
            maxLength={16}
            minLength={10}
            autoComplete="off"
            onChange={(e) => setpwCheck(e.target.value)}
          />
          <button disabled={btFlag} onClick={(e) => registFunc(e)}>
            회원가입
          </button>
        </form>
      </SignUpDiv>
    </div>
  );
};

export default SignUp;
