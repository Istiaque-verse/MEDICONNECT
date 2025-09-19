import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RevampedDashboard from './components/dashboard/RevampedDashboard'; // updated to use revamped dashboard
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Revamped Dashboard */}
        <Route path="/dashboard" element={<RevampedDashboard />} />
        
        {/* Additional routes that use the revamped dashboard layout */}
        <Route path="/appointments" element={<RevampedDashboard />} />
        <Route path="/medical-records" element={<RevampedDashboard />} />
        <Route path="/reports" element={<RevampedDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


