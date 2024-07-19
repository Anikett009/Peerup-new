'use client';
import React, { useState, useEffect } from 'react';
import { Todos } from "./Todos";
import { AddTodo } from "./AddTodo";

function TodoList() {
  const initTodo = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
  };

  const addTodo = (title, desc, time) => {
    const sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;
    const myTodo = {
      sno,
      title,
      desc,
      time
    };
    setTodos([...todos, myTodo]);
  };

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg">
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
    </div>
  );
}

export default TodoList;