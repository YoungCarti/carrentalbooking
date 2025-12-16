import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { authApi, setAuthToken } from '../lib/api';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'signin' | 'signup';
    onLogin: (user: { id?: number; name: string; email: string }) => void;
}

type AuthView = 'signin' | 'signup' | 'forgot-password';

const AuthModal = ({ isOpen, onClose, initialView = 'signin', onLogin }: AuthModalProps) => {
    const [view, setView] = useState<AuthView>(initialView);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Reset view when modal opens
    useEffect(() => {
        if (isOpen) {
            setView(initialView);
        }
    }, [isOpen, initialView]);

    if (!isOpen) return null;

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await authApi.login(email, password);
            setAuthToken(data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            onLogin(data.user);
            onClose();
        } catch (error) {
            alert('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        setLoading(true);
        try {
            const data = await authApi.register(email, password, name, Number(age));
            setAuthToken(data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            onLogin(data.user);
            onClose();
        } catch (error) {
            alert('Registration failed. Email might already be in use.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Please check your email for password reset instructions.');
        setView('signin');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl scale-100 transition-all">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {view === 'signin' && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signin-email">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="signin-email"
                                        type="email"
                                        placeholder="balamia@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="signin-password">Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => setView('forgot-password')}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        Forgot ?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="signin-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-4 pr-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-blue-500/30 disabled:opacity-50">
                                {loading ? 'Signing in...' : 'Continue'}
                            </Button>
                        </form>

                        <div className="text-center text-gray-500">
                            Don't Have An Account?{' '}
                            <button
                                onClick={() => setView('signup')}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}

                {view === 'signup' && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">Sign up to your account</h2>
                        </div>

                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signup-name">Name</Label>
                                <Input
                                    id="signup-name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="rounded-xl border-gray-200"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-xl border-gray-200"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signup-age">Age</Label>
                                <Input
                                    id="signup-age"
                                    type="number"
                                    placeholder="Enter your age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="rounded-xl border-gray-200"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="signup-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pr-10 rounded-xl border-gray-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signup-confirm">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="signup-confirm"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pr-10 rounded-xl border-gray-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-blue-500/30 disabled:opacity-50">
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </Button>
                        </form>

                        <div className="text-center text-gray-500">
                            Already Have An Account?{' '}
                            <button
                                onClick={() => setView('signin')}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                )}

                {view === 'forgot-password' && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
                            <p className="text-gray-500">Enter your details to reset your password</p>
                        </div>

                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="forgot-name">Name</Label>
                                <Input
                                    id="forgot-name"
                                    placeholder="Enter your name"
                                    className="rounded-xl border-gray-200"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="forgot-email">Email</Label>
                                <Input
                                    id="forgot-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="rounded-xl border-gray-200"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-blue-500/30">
                                Reset Password
                            </Button>
                        </form>

                        <div className="text-center">
                            <button
                                onClick={() => setView('signin')}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
