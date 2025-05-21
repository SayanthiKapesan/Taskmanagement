import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';  
import DeleteTask from './pages/DeleteTask';
function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} />} />
          <Route path="/create" element={<CreateTask setTasks={setTasks} />} />
          <Route path="/edit/:id" element={<EditTask tasks={tasks} setTasks={setTasks} />} />
          <Route path="/delete/:id" element={<DeleteTask tasks={tasks} setTasks={setTasks} />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;