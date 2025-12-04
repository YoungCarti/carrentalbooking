import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CarSelection from './components/CarSelection';
import WhyChooseUs from './components/WhyChooseUs';
import Statistics from './components/Statistics';
import MobileApp from './components/MobileApp';
import Footer from './components/Footer';

function App() {
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

export default App;
