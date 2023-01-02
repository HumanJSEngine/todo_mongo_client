import React from 'react';
import { useCallback } from 'react';

const Form = React.memo(({ todoValue, addTodoSubmit, setTodoValue }) => { 
  const changeTodoValue = useCallback((e) => {
    setTodoValue(e.target.value);
  },[setTodoValue]);

  return (
    <>
      <form style={{ display: 'flex' }} onSubmit={addTodoSubmit}>
        <input
          style={{ flex: '6' }}
          type="text"
          placeholder="할일을 입력하세요"
          className='w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow'
          value={todoValue}
          onChange={changeTodoValue}
        />
        <input style={{ flex: '4' }} value = '입력' type="submit" className='p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400'/>
      </form>
    </>
  );
});

export default Form;
