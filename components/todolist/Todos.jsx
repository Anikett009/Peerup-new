import React from 'react';
import { TodoItem } from "./TodoItem";

export const Todos = (props) => {
    return (
        <div className="container mx-auto bg-gray-100 rounded-lg shadow-lg p-6 mt-10">
            <h3 className="text-2xl font-semibold mb-3">Todos List</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {props.todos.length === 0 ?
                    <p className="text-gray-600">No Tasks Todo ...</p>
                    :
                    props.todos.map((todo) => (
                        <TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete} />
                    ))
                }
            </div>
        </div>
    );
};
