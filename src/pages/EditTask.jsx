import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = ({ tasks, setTasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    const taskToEdit = tasks.find(task => task.id === Number(id));
    if (taskToEdit) {
      setFormData(taskToEdit);
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks(tasks.map(task => 
      task.id === Number(id) ? { ...formData, id: Number(id) } : task
    ));
    navigate('/');
  };

  return (
    <div className="edit-task">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>
        
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn save-btn">Save Changes</button>
          <button type="button" className="btn cancel-btn" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>

    <style jsx>{`
        .edit-task {
          padding: 1rem;
          max-width: 100%;
          box-sizing: border-box;
        }

        h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #2d3748;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: #4a5568;
          font-weight: 500;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 0.9rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: #fff;
          transition: border-color 0.2s;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border-color: #4299e1;
          outline: none;
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .form-actions {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .btn {
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.1s, opacity 0.2s;
        }

        .btn:active {
          transform: scale(0.98);
        }

        .primary {
          background-color: #4299e1;
          color: white;
        }

        .secondary {
          background-color: #718096;
          color: white;
        }

        @media (min-width: 768px) {
          .edit-task {
            max-width: 500px;
            margin: 0 auto;
            padding: 2rem;
          }

          .form-actions {
            flex-direction: row;
          }

          .btn {
            flex: 1;
          }
        }

        @media (max-width: 480px) {
          .form-input,
          .form-textarea,
          .form-select {
            padding: 0.8rem;
            font-size: 0.95rem;
          }

          .btn {
            padding: 0.9rem;
            font-size: 0.95rem;
          }

          h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>

    </div>
  );
};

export default EditTask;