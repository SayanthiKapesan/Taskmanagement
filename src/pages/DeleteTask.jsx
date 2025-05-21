import { useNavigate, useParams } from 'react-router-dom';

const DeleteTask = ({ tasks, setTasks }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const task = tasks.find(task => task.id === Number(id));

  // Styles object
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    },
    heading: {
      color: '#d32f2f',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    taskDetails: {
      margin: '1.5rem 0',
      padding: '1rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '6px'
    },
    detailText: {
      margin: '0.5rem 0',
      lineHeight: '1.6'
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '2rem'
    },
    deleteButton: {
      padding: '0.5rem 1.5rem',
      backgroundColor: '#d32f2f',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#b71c1c'
      }
    },
    cancelButton: {
      padding: '0.5rem 1.5rem',
      backgroundColor: '#f5f5f5',
      color: '#333',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#e0e0e0'
      }
    },
    notFound: {
      textAlign: 'center',
      color: '#666'
    }
  };

  const handleDelete = () => {
    setTasks(tasks.filter(task => task.id !== Number(id)));
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Confirm Deletion</h2>
      {task ? (
        <>
          <p style={{ textAlign: 'center' }}>Are you sure you want to delete "{task.title}"?</p>
          <div style={styles.taskDetails}>
            <p style={styles.detailText}><strong>Description:</strong> {task.description}</p>
            <p style={styles.detailText}><strong>Status:</strong> {task.status}</p>
          </div>
          <div style={styles.actions}>
            <button onClick={handleDelete} style={styles.deleteButton}>
              Delete
            </button>
            <button onClick={handleCancel} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p style={styles.notFound}>Task not found.</p>
      )}
    </div>
  );
};

export default DeleteTask;