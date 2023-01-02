import React, { useState, useCallback, useEffect } from "react";
import List from "../components/List";
import Form from "../components/Form";
import axios from "axios";

const Todo = () => {
  //axios및 useEffect를 이용
  const [todoData, setTodoData] = useState([]);
  const [todoValue, setTodoValue] = useState("기본값");

  //MongoDB에서 목록읽기
  // useEffect(() => {
  //   let init = localStorage.getItem("todoData");
  //   init = init ? JSON.parse(init) : [];
  //   setTodoData(init);
  // }, [setTodoData]);

  // useEffect(() => {
  //   let body = {
  //     message:'hellooo',
  //     name:'bmj',
  //   };
  //   axios
  //     .post("/api/test", body)
  //     .then((response) => {
  //       alert("성공");
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       alert("실패");
  //       console.log(error);
  //     });
  // },[]);

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((response) => {
        console.log(response.data.success);
        //초기 할일데이터 셋팅
        setTodoData(response.data.initTodo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const deleteData = useCallback(
    (id) => {
      const nowTodo = todoData.filter((data) => data.id !== id);
      //axios를 이용해서 MongoDB 삭제 진행
      setTodoData(nowTodo);
      localStorage.setItem("todoData", JSON.stringify(nowTodo));
    },
    [todoData, setTodoData]
  );

  const addTodoSubmit = useCallback((e) => {
    e.preventDefault();
    const addTodo = {
      id: Date.now(),
      title: todoValue,
      completed: false,
    };
    // axios로 MongoDB에 항목 추가
    axios
      .post("/api/post/submit", { ...addTodo })
      .then((response) => {
        if (response.data.success) {
          setTodoData([...todoData, addTodo]);
          setTodoValue("");
          alert("할일이 등록됨");
        } else {
          alert("할일 등록 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // localStorage.setItem("todoData", JSON.stringify([...todoData, addTodo]));
  });

  const deleteAll = useCallback(() => {
    //axios를 이용하여 MongoDB 초기화 목록 비워줌
    setTodoData([]);
    localStorage.clear();
  }, [setTodoData]);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full p-6 m-4 bg-blue-500 rounded shadow">
        <div className="flex justify-between mb-3">
          <h1>할일 목록</h1>
          <button onClick={deleteAll}>모두 지우기</button>
        </div>
        <List
          todoData={todoData}
          setTodoData={setTodoData}
          deleteData={deleteData}
        />
        <Form
          todoValue={todoValue}
          addTodoSubmit={addTodoSubmit}
          setTodoValue={setTodoValue}
        />
      </div>
    </div>
  );
};

export default Todo;
