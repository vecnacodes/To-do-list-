
// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        if (task.trim()) {
            try {
                const response = await axios.post('http://localhost:3001/tasks', { task });
                setTasks(response.data);
                setTask('');
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const clearTasks = async () => {
        try {
            const response = await axios.delete('http://localhost:3001/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error clearing tasks:', error);
        }
    };

    return (
        <div className="container">
            <h1>To Do List App</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter the task"
            />
            <button onClick={addTask}>Add Task</button>
            <button onClick={clearTasks}>Clear All Tasks</button>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className="task">
                        {task}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;