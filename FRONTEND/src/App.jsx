import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  )
}

export default App
