
import { Car } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/0 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                        <Car className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">RentWheels</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {['Home', 'Vehicles', 'Deals', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-white/90 hover:text-blue-400 text-sm font-medium transition-colors"
                        >
                            {item}
                        </a>
                    ))}
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
