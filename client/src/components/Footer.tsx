
import { Car, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-gray-300">
            {/* Newsletter Section */}
            <div className="border-b border-gray-800">
                <div className="container mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
                        <div>
                            <h3 className="text-3xl font-bold text-white tracking-tight mb-2">Stay Updated</h3>
                            <p className="text-lg text-gray-400">Subscribe to get special offers and updates</p>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter your email"
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/10 rounded-xl px-6 py-6"
                            />
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 py-6 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50 flex items-center justify-center">
                                <Car className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">RentWheels</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Your trusted partner for premium car rentals. Experience the freedom of the road with our exceptional service and diverse fleet.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Phone className="w-4 h-4 text-blue-400" />
                                </div>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-blue-400" />
                                </div>
                                <span>info@rentwheels.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                </div>
                                <span>123 Main Street, New York, NY 10001</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            {['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-sm">
                            {['Car Rental', 'Fleet', 'Locations', 'Pricing'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm">
                            {['Help Center', 'Contact Us', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                                </li>
                            ))}
                            <li>
                                <a href="#admin/dashboard" className="hover:text-blue-400 transition-colors">Admin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">© 2025 RentWheels. All rights reserved.</p>
                    <div className="flex gap-4">
                        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                            <a
                                key={index}
                                href="#"
                                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 group"
                            >
                                <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
