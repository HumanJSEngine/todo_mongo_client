import React, { useState } from "react";
import { useCallback } from "react";
import axios from "axios";

const ListItem = React.memo(({ data, todoData, setTodoData, deleteData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(data.title);

  const btnStyle = {
    color: "red",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    float: "right",
    fontSize: "1rem",
  };

  const editChange = useCallback(
    (e) => {
      setEditTitle(e.target.value);
    },
    [setEditTitle]
  );

  const toggleClick = (id) => {
    //할일목록의 값을 변경
    const updateTodo = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    let body = {
      id: todoId,
      completed: data.completed,
    };
    axios
      .post("/api/post/updatetoggle", body)
      .then((response) => {
        setTodoData(updateTodo);
      })
      .catch((error) => console.log(error));
    setTodoData(updateTodo);
    // localStorage.setItem('todoData', JSON.stringify(updateTodo))
  };

  const todoId = data.id;

  const updateTitle = () => {
    let str = editTitle;

    if (/[^A-Za-z0-9]/gi.test(str) || str.length === 0) {
      alert("공백과 특수문자는 안됩니다");
      setEditTitle("");
      return;
    }

    let tempTodo = todoData.map((data) => {
      if (data.id === todoId) {
        data.title = editTitle;
      }
      return data;
    });

    let body = {
      id: todoId,
      title: editTitle,
    };
    axios
      .post("/api/post/updatetitle", body)
      .then((response) => {
        console.log(response.data);
        setTodoData(tempTodo);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const showTime = (_timestamp) => {
    const date = new Date(_timestamp);
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let time = date.getFullYear();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    time += '/';
    time += date.getMonth() + 1;
    time += '/';
    time += date.getDate();
    time += '/';
    time += WEEKDAY[date.getDay()];
    time += ' ';
    time += hours;
    time += ':';
    time += minutes;
    time += ':';
    time += date.getSeconds();
    time += ampm;
    return time;
  };

  if (isEditing) {
    return (
      <>
        <div className="items-center">
          <input
            type="text"
            className="w-full px-3 py-2 mr-4 text-gray-600 bg-white border rounded"
            value={editTitle}
            onChange={editChange}
          />
        </div>
        <span className="item.completed ? ;">{data.title}</span>
        <div className="items-center">
          <button className="px-4 py-2" onClick={updateTitle}>
            내용 갱신
          </button>

          <button
            className="px-4 py-2"
            style={btnStyle}
            onClick={() => setIsEditing(false)}
          >
            닫기
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <input
          type="checkbox"
          defaultChecked={data.completed}
          onChange={() => toggleClick(data.id)}
        />
        <span className="item.completed ? ;">{data.title}</span>
        <div className="items-center">
          <span>{showTime(data.id)}</span>
          <button
            className="px-4 py-2"
            onClick={() => {
              setIsEditing(true);
              setEditTitle(data.title);
            }}
          >
            수정하기
          </button>
          <button
            className="px-4 py-2"
            style={btnStyle}
            onClick={() => deleteData(data.id)}
          >
            지우기
          </button>
        </div>
      </>
    );
  }
});

export default ListItem;
