import React, { useEffect, useState } from 'react';

export const TodoItem = ({ todo, onDelete }) => {
    const [remainingTime, setRemainingTime] = useState(Number(todo.time));

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 60000); // Update remaining time every minute (60000 milliseconds)

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, []); // Run effect only once when component mounts

    return (
        <div className={`rounded-lg shadow-md p-4 border border-gray-300 mb-4 ${remainingTime <= 0 ? 'border-red-500' : ''}`}>
            <h4 className="text-lg font-semibold mb-2">{todo.title}</h4>
            <p className="text-gray-600">{todo.desc}</p>
            <p className="text-gray-600">Remaining Time: {Math.max(0, remainingTime)} minutes</p>
            <button
                className="inline-block mt-2 px-3 py-1 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => onDelete(todo)}
            >
                Delete
            </button>
        </div>
    );
};
