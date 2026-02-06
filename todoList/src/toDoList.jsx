
import React, { useState, useEffect } from 'react';
import {toast} from 'react-toastify';

function ToDo(){
    const [tasks, setTask] = useState(()=>{
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks):[];
    });


    const [newTask, setNewTask] = useState('');

    const [filter, setFilter] = useState(()=>{
      return localStorage.getItem('filter') || 'all';
    });

    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');



    useEffect(()=> {
      localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks]);

    useEffect(()=>{
      localStorage.setItem('filter',filter)
    },[filter]);


    function startEdit(index,text){
      setEditIndex(index);
      setEditText(text);
    }

    function saveEdit(index){
      if(!editText.trim()){
        toast.error('task cannot be empty');
        return;
      };

      setTask(tasks=> tasks.map((task,i)=>
      i===index?{...task,text:editText}:task
      ))
      toast.success('Task saved successfully')
      setEditIndex(null);
      setEditText('');
    };

    const filteredTasks = tasks.filter(task => {
      if(filter === 'completed') return task.completed;
      if(filter === 'pending') return !task.completed;
      return true;
    })
  
    function deleteTask(index){
        const confirmed = window.confirm(
            'Are you sure ?'
        );
        if(!confirmed) return;
      setTask(tasks.filter((_, i) => i !== index));
      toast.success('Task deleted successfully')
    }

    function cancelEdit() {
      setEditIndex(null);
      setEditText('');
    }
    
  
    function addTask(){
      if (!newTask.trim()){
        toast.error('Task cannot be empty');
        return;
      }; 
      setTask(t => [...t, {text:newTask, completed:false}]);
      toast.success('Successfully added')
      setNewTask('');
    }

    function toggleTask(index){
      setTask(tasks=> tasks.map((task,i)=>
      i===index ? {...task,completed:!task.completed}:task
    ))
    }
  
    return (
      <div className="todolist">
        <h1>Tasks To Do</h1>
  
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
  
        <div className='filters'>
          <button className={filter==='all'?'active':''} 
                  onClick={()=> setFilter('all')}>
                       All
          </button>
          <button className={filter==='completed'?'active':''} 
                  onClick={()=> setFilter('completed')}>
                       Completed
          </button>
          <button className={filter==='pending'?'active':''} 
                  onClick={()=> setFilter('pending')}>
                       Pending
          </button>
        </div>
          {filteredTasks.length===0?
            (<p className='fallbackText'>
              No tasks
            </p>)
          :(
        <ol>
          {filteredTasks.map((task, index) => (
            <li className={task.completed? 'completed':''} key={index}>
              <label className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  disabled={editIndex === index}
                  onChange={() => toggleTask(index)}
                />
               {editIndex === index ? (
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(index)}
                    autoFocus
                  />
                ) : (
                  <span>{task.text}</span>
                )}

              </label>
              {editIndex === index ? (
                <>
                  <button onClick={() => saveEdit(index)}>✔️</button>
                  <button onClick={cancelEdit}>✖</button>
                </>
              ) : (
                <button onClick={() => startEdit(index, task.text)}>✏️</button>
              )}

              <button
                className="delete-btn"
                disabled={editIndex === index}
                onClick={() => deleteTask(index)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ol>)}

      </div>
    );
  }
  

export default ToDo;