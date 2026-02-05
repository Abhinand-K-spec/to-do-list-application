
import React, { useState } from 'react';

function ToDo(){
    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState('');
  
    function deleteTask(index){
        const confirmed = window.confirm(
            'Are you sure ?'
        );
        if(!confirmed) return;
      setTask(tasks.filter((_, i) => i !== index));
    }
  
    function addTask(){
      if (!newTask.trim()) return; 
      setTask(t => [...t, newTask]);
      setNewTask('');
    }
  
    return (
      <div className="todolist">
        <h1>To-Do List</h1>
  
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>
  
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  

export default ToDo;