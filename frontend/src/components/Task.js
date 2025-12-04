import React, { useState } from 'react';

const Task = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() && editText !== task.text) {
      onEdit(task._id, editText.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
      />

      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ flex: 1 }}>
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            autoFocus
            style={{ width: '100%' }}
          />
        </form>
      ) : (
        <span onDoubleClick={() => setIsEditing(true)} style={{ flex: 1, cursor: 'pointer' }}>
          {task.text}
        </span>
      )}

      <button onClick={() => onDelete(task._id)} className="delete-btn">
        Delete
      </button>
      {!isEditing && (
        <button onClick={() => setIsEditing(true)} className="edit-btn">
          Edit
        </button>
      )}
    </div>
  );
};

export default Task;
