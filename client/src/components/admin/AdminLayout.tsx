import React from 'react';
import { LayoutDashboard, PlusCircle, Car, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdminLayoutProps {
    children: React.ReactNode;
    activePage: 'dashboard' | 'add-car' | 'manage-cars' | 'manage-bookings';
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activePage }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '#admin/dashboard' },
        { id: 'add-car', label: 'Add car', icon: PlusCircle, href: '#admin/add-car' },
        { id: 'manage-cars', label: 'Manage Cars', icon: Car, href: '#admin/manage-cars' },
        { id: 'manage-bookings', label: 'Manage Bookings', icon: Calendar, href: '#admin/manage-bookings' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-30">
                <div className="p-6 border-b border-gray-200 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
                        GS
                    </div>
                    <h2 className="text-gray-900 font-bold tracking-tight">GreatStack</h2>
                    <a href="#home" className="text-xs text-blue-600 hover:text-blue-700 mt-1 inline-block font-medium">
                        Back to Home
                    </a>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm",
                                activePage === item.id
                                    ? "bg-blue-50 text-blue-600 shadow-sm"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", activePage === item.id ? "text-blue-600" : "text-gray-400")} />
                            {item.label}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
