import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CarSelection from './components/CarSelection';
import WhyChooseUs from './components/WhyChooseUs';
import Statistics from './components/Statistics';
import MobileApp from './components/MobileApp';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import AddCar from './components/admin/AddCar';
import ManageCars from './components/admin/ManageCars';
import ManageBookings from './components/admin/ManageBookings';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    // Set initial page
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'admin/dashboard':
        return <AdminDashboard />;
      case 'admin/add-car':
        return <AddCar />;
      case 'admin/manage-cars':
        return <ManageCars />;
      case 'admin/manage-bookings':
        return <ManageBookings />;
      default:
        return (
          <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            <CarSelection />
            <WhyChooseUs />
            <Statistics />
            <MobileApp />
            <Footer />
          </div>
        );
    }
  };

  return renderContent();
}

export default App;
