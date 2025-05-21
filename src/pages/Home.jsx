import { useState } from 'react';
import TaskTable from '../components/TaskTable';

const Home = ({ tasks, setTasks }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const styles = {
    home: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#2c3e50',
      fontSize: '2.5rem'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    input: {
      flex: 1,
      minWidth: '250px',
      padding: '0.75rem 1rem',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease'
    },
    select: {
      padding: '0.75rem 1rem',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '1rem',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'border-color 0.3s ease'
    }
  };

  return (
    <div style={styles.home}>
      <h1 style={styles.heading}>Task Dashboard</h1>
      
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TaskTable 
        tasks={tasks}
        setTasks={setTasks}
        statusFilter={statusFilter}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Home;