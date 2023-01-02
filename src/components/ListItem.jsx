import React, { useState } from 'react';
import { useCallback } from 'react';

const ListItem = React.memo(({ data, todoData, setTodoData, deleteData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(data.title);

  const btnStyle = {
    color: 'red',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    float: 'right',
    fontSize: '1rem',
  };

  const editChange = useCallback((e) => {
    setEditTitle(e.target.value);
    
  },[setEditTitle]);

  const toggleClick = useCallback(
    (id) => {
      const updateTodo = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      //axios를 통해 MongoDB complete 업데이트
      setTodoData(updateTodo);
      localStorage.setItem('todoData', JSON.stringify(updateTodo));

    },
    [setTodoData, todoData]
  );

  
  
  const todoId = data.id;
  const updateTitle = useCallback(() => {

    let str = editTitle;
    if (/[^A-Za-z0-9]/gi.test(str) || str.length===0) {
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
    //axios를 이용해서 MongoDB 타이틀 업데이트
    setTodoData(tempTodo);
    setIsEditing(false);
    setEditTitle(data.title);
    localStorage.setItem('todoData', JSON.stringify(tempTodo));
  },[setTodoData, data.title, editTitle, todoData, todoId]);


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
          <button className="px-4 py-2" onClick={() => setIsEditing('true')}>
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
