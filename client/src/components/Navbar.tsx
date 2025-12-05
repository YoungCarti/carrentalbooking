import { Car } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Both Home and Vehicles pages start with a dark/colored background, so we use transparent navbar with white text.
    // We can add scroll behavior later if needed.

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/0 backdrop-blur-sm border-b border-white/10 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                        <Car className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        RentWheels
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-white/90 hover:text-blue-400 text-sm font-medium transition-colors">Home</Link>
                    <Link to="/vehicles" className="text-white/90 hover:text-blue-400 text-sm font-medium transition-colors">Vehicles</Link>
                    <Link to="/#deals" className="text-white/90 hover:text-blue-400 text-sm font-medium transition-colors">Deals</Link>
                    <Link to="/#about" className="text-white/90 hover:text-blue-400 text-sm font-medium transition-colors">About</Link>
                    <Link to="/#contact" className="text-white/90 hover:text-blue-400 text-sm font-medium transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-white hover:text-blue-400 hover:bg-white/10">
                        Sign In
                    </Button>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all rounded-xl shadow-lg shadow-black/5">
                        Sign Up
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
