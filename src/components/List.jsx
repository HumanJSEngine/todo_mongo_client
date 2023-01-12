import React from "react";
import ListItem from "./ListItem";
import { useSelector } from "react-redux";

const List = React.memo(({ todoData, setTodoData, deleteData }) => {
  const user = useSelector((state) => state.user);
  console.log("List.js", user);
  console.log("List.js", todoData);
  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  return (
    <>
      {todoData.map(
        (data) =>
          data.author.uid === user.uid && (
            <div
              key={data.id}
              className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded"
              style={getStyle(data.completed)}
            >
              <ListItem
                data={data}
                todoData={todoData}
                setTodoData={setTodoData}
                deleteData={deleteData}
              />
            </div>
          )
      )}
    </>
  );
});

export default List;
