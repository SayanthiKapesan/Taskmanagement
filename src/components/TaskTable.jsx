import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const TaskTable = ({ tasks, setTasks, statusFilter, searchTerm }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Sorting
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filtering
  const filteredTasks = sortedTasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="task-table-container">
      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <>
          <table className="task-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('title')}>Title</th>
                <th onClick={() => requestSort('dueDate')}>Due Date</th>
                <th onClick={() => requestSort('priority')}>Priority</th>
                <th onClick={() => requestSort('status')}>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className={`priority ${task.priority}`}>{task.priority}</td>
                  <td className={`status ${task.status}`}>{task.status}</td>
                  <td>
                    <Link to={`/edit/${task.id}`}>Edit</Link> | 
                    <Link to={`/delete/${task.id}`}>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default TaskTable;