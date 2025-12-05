import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CarSelection from './components/CarSelection';
import WhyChooseUs from './components/WhyChooseUs';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
import Vehicles from './pages/Vehicles';

const Home = () => (
  <>
    <Hero />
    <Features />
    <CarSelection />
    <WhyChooseUs />
    <Statistics />
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
