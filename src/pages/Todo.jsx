import React, { useState, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import List from "../components/List";
import Form from "../components/Form";
// import Loading from "../components/Loading.jsx";
// import Loading2 from "../components/Loading2.jsx";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

//1. 로그인 여부 파악
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todoData, setTodoData] = useState([]);
  const [todoValue, setTodoValue] = useState("기본값");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("user", user);

  useEffect(() => {
    //사용자 로그인 여부 파악
    console.log(user);
    if (user.accessToken === "") {
      //로그인이 안된 경우
      alert("로그인하시오");
      navigate("/login");
    }
  }, [user, navigate]);

  //목록 정렬 기능

  const [sort, setSort] = useState("최신글");

  useEffect(() => {
    setSkip(0);
    setTodoData([]);
    getList(search, 0);
  }, [sort]);

  //검색 기능
  const [search, setSearch] = useState("");

  const searchHandler = () => {
    setSkip(0);
    setTodoData([]);
    getList(search, 0);
  };

  const getList = (_word = "", _stIndex = 0) => {    
    setSkip(0);
    // 로딩창 보여주기
    setSkipToggle(true);
    setLoading(true);

    const body = {
      sort: sort,
      search: _word,
      // 사용자 구분용도
      uid: user.uid,
      skip: _stIndex,
    };
    axios
      .post("/api/post/list", body)
      .then((response) => {
        // console.log(response.data);
        // 초기 할일데이터 셋팅
        if (response.data.success) {
          setTodoData(response.data.initTodo);
          // 시작하는 skip 번호를 갱신한다.
          setSkip(response.data.initTodo.length);
          if (response.data.initTodo.length < 5) {
            setSkipToggle(false);
          }
        }
        // 로딩창 숨기기
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getListGo = (_word = "", _stIndex = 0) => {
    setLoading(true);

    const body = {
      sort: sort,
      search: _word,
      // 사용자 구분용도
      uid: user.uid,
      skip: _stIndex,
    };
    axios
      .post("/api/post/list", body)
      .then((response) => {
        // console.log(response.data);
        // 초기 할일데이터 셋팅
        if (response.data.success) {
          const newArr = response.data.initTodo;
          setTodoData([...todoData, ...newArr]);
          // 시작하는 skip 번호를 갱신한다.
          setSkip(skip + newArr.length);
          if (newArr.length < 5) {
            setSkipToggle(false);
          }
        }
        // 로딩창 숨기기
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //목록 개수 출력
  const [skip, setSkip] = useState(0);
  const [skipToggle, setSkipToggle] = useState(true);

  const getListMore = () => {
    getListGo(search, skip);
  };

  useEffect(() => {
    getList("", skip);
  }, []);

  const deleteData = useCallback(
    (id) => {
      if (window.confirm("삭제?")) {
        let body = {
          id: id,
        };
        setLoading(true);
        axios
          .post("/api/post/delete", body)
          .then((response) => {
            console.log(response);
            const nowTodo = todoData.filter((data) => data.id !== id);
            //axios를 이용해서 MongoDB 삭제 진행
            setTodoData(nowTodo);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [todoData, setTodoData]
  );

  const addTodoSubmit = (e) => {
    e.preventDefault();
    console.log("등록", todoValue);
    setLoading(true);
    const addTodo = {
      id: Date.now(),
      title: todoValue,
      completed: false, //할일이 추가될때 아직 완료한 것은
      // 1. DB 저장: Server/Model/TodoModel Schema 업데이트(ObjectID)
      uid: user.uid,
      //여러 명의 사용자 구분용도
    };
    axios
      .post("/api/post/submit", { ...addTodo })
      .then((response) => {
        if (response.data.success) {
          // setTodoData([...todoData, addTodo]);
          setTodoValue("");
          setSkip(0);
          getList("", 0);
          alert("할일등록");
        } else {
          alert("실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAll = () => {
    if (window.confirm("모두 삭제?")) {
      axios
        .post("/api/post/deleteAll")
        .then(() => {
          setSkip(0);
          setTodoData([]);
          setLoading(true);
        })
        .catch((error) => console.log(error));
      setTodoData([]);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full p-6 m-4 bg-blue-500 rounded shadow">
        <div className="flex justify-between mb-3">
          <h1>할일 목록</h1>
          <button onClick={deleteAll}>모두 지우기</button>
        </div>

        <div className="flex justify-between mb-2">
          <DropdownButton title={sort} variant="outline-secondary">
            <Dropdown.Item onClick={() => setSort("최신글")}>
              최신글
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("과거글")}>
              과거글
            </Dropdown.Item>
            <Dropdown.Item>시간순</Dropdown.Item>
          </DropdownButton>
          <div>
            <label>검색어</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder="검색어"
              className="border-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandler();
                }
              }}
            />
          </div>
        </div>

        <List
          todoData={todoData}
          setTodoData={setTodoData}
          deleteData={deleteData}
        />
        {skipToggle && (
          <div className="flex justify-center">
            <button
              className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
              onClick={() => getListMore()}
            >
              더보기
            </button>
          </div>
        )}

        <Form
          todoValue={todoValue}
          addTodoSubmit={addTodoSubmit}
          setTodoValue={setTodoValue}
        />
      </div>
      {/* {loading && <Loading/>} */}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Todo;
