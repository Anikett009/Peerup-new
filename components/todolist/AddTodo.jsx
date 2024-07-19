import React, { useState } from 'react';

export const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title || !desc || !time) {
      alert("Title, Description or Time cannot be blank");
    } else {
      addTodo(title, desc, time);
      setTitle("");
      setDesc("");
      setTime("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={submit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Todo Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full sm:text-sm rounded-md h-10 px-3 bg-white text-gray-900 border-2 border-purple-500 focus:ring-purple-500 focus:border-purple-700"
            id="title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
            Todo Description
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full sm:text-sm rounded-md h-10 px-3 bg-white text-gray-900 border-2 border-purple-500 focus:ring-purple-500 focus:border-purple-700"
            id="desc"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time to Complete (in minutes)
          </label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full sm:text-sm rounded-md h-10 px-3 bg-white text-gray-900 border-2 border-purple-500 focus:ring-purple-500 focus:border-purple-700"
            id="time"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};