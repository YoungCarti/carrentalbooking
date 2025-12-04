
import AdminLayout from './AdminLayout';
import { Car, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Cars', value: '0', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Bookings', value: '0', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Pending', value: '0', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Confirmed', value: '0', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <AdminLayout activePage="dashboard">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Monitor overall platform performance including total cars, bookings, revenue, and recent activities</p>
                </div>
                <div className="text-sm text-gray-500">Welcome, GreatStack</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
                            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">Recent Bookings</h2>
                    <p className="text-gray-600 text-sm mb-6">Latest customer bookings</p>

                    <div className="text-center py-12 text-gray-500">
                        No bookings yet
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">Monthly Revenue</h2>
                    <p className="text-gray-600 text-sm mb-6">Revenue for current month</p>

                    <div className="text-4xl font-bold text-blue-600 mb-2">$0</div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
