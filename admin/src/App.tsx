import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import AddCar from './components/admin/AddCar';
import ManageCars from './components/admin/ManageCars';
import ManageBookings from './components/admin/ManageBookings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/manage-cars" element={<ManageCars />} />
        <Route path="/manage-bookings" element={<ManageBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
