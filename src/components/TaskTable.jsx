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
          <div className="table-responsive">
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
                    <td data-label="Title">{task.title}</td>
                    <td data-label="Due Date">{new Date(task.dueDate).toLocaleDateString()}</td>
                    <td data-label="Priority" className={`priority ${task.priority}`}>{task.priority}</td>
                    <td data-label="Status" className={`status ${task.status}`}>{task.status}</td>
                    <td data-label="Actions" className="actions">
                      <Link to={`/edit/${task.id}`} className="btn edit-btn">Edit</Link>
                      <Link to={`/delete/${task.id}`} className="btn delete-btn">Delete</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      
      <style jsx>{`
        .task-table-container {
          width: 100%;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .task-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.9em;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }
        
        .task-table thead tr {
          background-color: #009879;
          color:  #000000;
          text-align: left;
        }
        
        .task-table th, 
        .task-table td {
          padding: 12px 15px;
        }
        
        .task-table tbody tr {
          border-bottom: 1px solid #dddddd;
        }
        
        .task-table tbody tr:nth-of-type(even) {
          background-color: #f3f3f3;
        }
        
        .task-table tbody tr:last-of-type {
          border-bottom: 2px solid #D3D3D3;
        }
        
        .task-table tbody tr:hover {
          background-color: #D3D3D3;
        }
        
        .priority {
          text-transform: capitalize;
        }
        
        .priority.high {
          color: #e74c3c;
          font-weight: bold;
        }
        
        .priority.medium {
          color: #f39c12;
        }
        
        .priority.low {
          color: #2ecc71;
        }
        
        .status {
          text-transform: capitalize;
        }
        
        .status.completed {
          color: #2ecc71;
        }
        
        .status.in-progress {
          color: #f39c12;
        }
        
        .status.pending {
          color: #e74c3c;
        }
        
        .task-table th {
          cursor: pointer;
          position: relative;
        }
        
        .task-table th:hover {
          background-color: #D3D3D3;
        }
        
        /* Button styles */
        .btn {
          display: inline-block;
          padding: 6px 12px;
          margin: 0 4px;
          border: none;
          border-radius: 4px;
          font-size: 0.9em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .edit-btn {
          background-color: #3498db;
          color: white;
        }
        
        .edit-btn:hover {
          background-color: #2980b9;
        }
        
        .delete-btn {
          background-color: #e74c3c;
          color: white;
        }
        
        .delete-btn:hover {
          background-color: #c0392b;
        }
        
        /* Responsive styles */
        @media screen and (max-width: 768px) {
          .task-table {
            border: 0;
          }
          
          .task-table thead {
            display: none;
          }
          
          .task-table tr {
            margin-bottom: 15px;
            display: block;
            border-bottom: 2px solid #009879;
          }
          
          .task-table td {
            display: block;
            text-align: right;
            padding-left: 50%;
            position: relative;
            border-bottom: 1px solid #ddd;
          }
          
          .task-table td::before {
            content: attr(data-label);
            position: absolute;
            left: 15px;
            width: 45%;
            padding-right: 10px;
            font-weight: bold;
            text-align: left;
          }
          
          .task-table td:last-child {
            border-bottom: 0;
          }
          
          .actions {
            display: flex;
            justify-content: flex-end;
          }
          
          .btn {
            margin: 0 2px;
            padding: 4px 8px;
          }
        }
        
        @media screen and (max-width: 480px) {
          .task-table td {
            padding-left: 40%;
          }
          
          .task-table td::before {
            width: 35%;
          }
          
          .actions {
            flex-direction: column;
            gap: 5px;
          }
          
          .btn {
            width: 25%;
            margin: 4px 0;
            text-align: center;
            padding:3px;
          }
        }
      `}</style>
    </div>
  );
};

export default TaskTable;