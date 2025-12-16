import { useEffect, useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Car, Calendar, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { bookingsApi, carsApi } from '../../lib/api';

type Booking = {
    id: number;
    userId: number;
    carId: number;
    carName: string;
    carImageUrl?: string;
    userName: string;
    userEmail: string;
    pickupDate: string;
    returnDate: string;
    pickupLocation?: string;
    returnLocation?: string;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled' | string;
    createdAt: string;
};

const currency = (n: number) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString();

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [carsCount, setCarsCount] = useState(0);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [refreshTick, setRefreshTick] = useState(0);

    const refresh = () => setRefreshTick(t => t + 1);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);
        Promise.all([carsApi.getAll(), bookingsApi.getAll()])
            .then(([cars, bookingsData]) => {
                if (!mounted) return;
                setCarsCount(Array.isArray(cars) ? cars.length : 0);
                setBookings(Array.isArray(bookingsData) ? bookingsData as Booking[] : []);
            })
            .catch((e: any) => {
                if (!mounted) return;
                setError(e?.message || 'Failed to load dashboard data');
            })
            .finally(() => mounted && setLoading(false));
        return () => {
            mounted = false;
        };
    }, [refreshTick]);

    const { totalBookings, pendingCount, confirmedCount, monthRevenue, recent } = useMemo(() => {
        const total = bookings.length;
        const pending = bookings.filter(b => b.status === 'pending').length;
        const confirmed = bookings.filter(b => b.status === 'confirmed').length;
        const now = new Date();
        const revenue = bookings
            .filter(b => b.status === 'confirmed')
            .filter(b => {
                const d = new Date(b.createdAt);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            })
            .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);
        const recentList = bookings.slice(0, 5);
        return { totalBookings: total, pendingCount: pending, confirmedCount: confirmed, monthRevenue: revenue, recent: recentList };
    }, [bookings]);

    const stats = [
        { label: 'Total Cars', value: String(carsCount), icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Bookings', value: String(totalBookings), icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Pending', value: String(pendingCount), icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Confirmed', value: String(confirmedCount), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <AdminLayout activePage="dashboard">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Monitor overall platform performance including total cars, bookings, revenue, and recent activities</p>
                </div>
                <div className="flex items-center gap-3">
                    {loading && <span className="text-sm text-gray-500">Loading…</span>}
                    {error && <span className="text-sm text-red-600">{error}</span>}
                    <button onClick={refresh} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                </div>
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

                    {recent.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">No bookings yet</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {recent.map(b => (
                                <div key={b.id} className="py-4 flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">{b.carName}</div>
                                        <div className="text-sm text-gray-500 truncate">{b.userName} • {fmtDate(b.pickupDate)} → {fmtDate(b.returnDate)}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                                            b.status === 'confirmed' ? 'bg-green-50 text-green-700' : b.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                        }`}>{b.status}</span>
                                        <div className="text-sm font-semibold text-gray-900">{currency(Number(b.totalPrice) || 0)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">Monthly Revenue</h2>
                    <p className="text-gray-600 text-sm mb-6">Revenue for current month</p>

                    <div className="text-4xl font-bold text-blue-600 mb-2">{currency(monthRevenue)}</div>
                    <div className="text-xs text-gray-500">Confirmed bookings only</div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
