import { useState, useEffect } from 'react';
import { Car, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

interface User {
    name: string;
    email: string;
}

const Navbar = () => {
    // Both Home and Vehicles pages start with a dark/colored background, so we use transparent navbar with white text.
    // We can add scroll behavior later if needed.

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
    const [user, setUser] = useState<User | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const openAuthModal = (view: 'signin' | 'signup') => {
        setAuthView(view);
        setIsAuthModalOpen(true);
    };

    const handleLogin = (userData: User) => {
        setUser(userData);
        setIsAuthModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsDropdownOpen(false);
    };

    return (
        <>
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
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors focus:outline-none"
                                >
                                    <span className="font-medium">Hello, {user.name}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-2 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    onClick={() => openAuthModal('signin')}
                                    className="text-white hover:text-blue-400 hover:bg-white/10"
                                >
                                    Sign In
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialView={authView}
                onLogin={handleLogin}
            />
        </>
    );
};

export default Navbar;
