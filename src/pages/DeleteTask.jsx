import { useNavigate, useParams } from 'react-router-dom';

const DeleteTask = ({ tasks, setTasks }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const task = tasks.find(task => task.id === Number(id));

  const handleDelete = () => {
    setTasks(tasks.filter(task => task.id !== Number(id)));
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="delete-container">
      <h2 className="delete-heading">Confirm Deletion</h2>
      {task ? (
        <>
          <p className="confirmation-text">Are you sure you want to delete "{task.title}"?</p>
          <div className="task-details">
            <p className="detail"><strong>Description:</strong> {task.description}</p>
            <p className="detail"><strong>Status:</strong> {task.status}</p>
          </div>
          <div className="action-buttons">
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="not-found">Task not found.</p>
      )}

      <style jsx="true">{`
        .delete-container {
          padding: 1.5rem;
          margin: 1rem;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          max-width: 100%;
          box-sizing: border-box;
        }

        .delete-heading {
          color: #dc3545;
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .confirmation-text {
          text-align: center;
          font-size: 1.1rem;
          color: #444;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .task-details {
          padding: 1.2rem;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .detail {
          margin: 0.8rem 0;
          font-size: 1rem;
          color: #495057;
          line-height: 1.6;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .delete-btn,
        .cancel-btn {
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .delete-btn:active {
          background: #bb2d3b;
        }

        .cancel-btn {
          background: #6c757d;
          color: white;
          border: none;
        }

        .cancel-btn:active {
          background: #5a6268;
        }

        .not-found {
          text-align: center;
          color: #6c757d;
          font-size: 1.1rem;
          padding: 2rem 0;
        }

        @media (min-width: 768px) {
          .delete-container {
            max-width: 500px;
            margin: 2rem auto;
            padding: 2rem;
          }

          .action-buttons {
            flex-direction: row;
            justify-content: center;
          }

          .delete-btn,
          .cancel-btn {
            width: auto;
            padding: 0.8rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .delete-container {
            margin: 0.5rem;
            padding: 1.2rem;
          }

          .delete-heading {
            font-size: 1.3rem;
          }

          .confirmation-text {
            font-size: 1rem;
          }

          .detail {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteTask;