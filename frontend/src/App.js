import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import './App.css';

// api line:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTask }),
    });
    const savedTask = await res.json();
    setTasks(prev => [...prev, savedTask]);
    setNewTask('');
  };

  const editTask = async (id, newText) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    });
    if (res.ok) {
      const updatedTask = await res.json();
      setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
    }
  } catch (err) {
    console.error('Error editing task:', err);
  }
};


  const toggleTask = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'PUT' });
    const updatedTask = await res.json();
    setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Enter new task"
          onKeyPress={e => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>
      
      <div className="task-list">
        {tasks.map(task => (
          <Task 
            key={task._id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
