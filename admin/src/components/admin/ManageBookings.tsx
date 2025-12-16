import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Eye } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { bookingsApi } from '../../lib/api';

interface Booking {
    id: number;
    userId: number;
    carId: number;
    userName?: string;
    userEmail?: string;
    carName?: string;
    pickupDate: string;
    returnDate: string;
    pickupLocation?: string;
    returnLocation?: string;
    totalPrice: number;
    status: string;
}

const ManageBookings = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Status');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await bookingsApi.getAll();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            alert('Failed to fetch bookings. Make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await bookingsApi.updateStatus(id, newStatus);
            setBookings(bookings.map(booking =>
                booking.id === id ? { ...booking, status: newStatus } : booking
            ));
            alert('Booking status updated successfully!');
        } catch (error) {
            console.error('Error updating booking:', error);
            alert('Failed to update booking status.');
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            (booking.userName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (booking.carName?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All Status' || booking.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-50 text-green-600';
            case 'pending': return 'bg-yellow-50 text-yellow-600';
            case 'completed': return 'bg-blue-50 text-blue-600';
            case 'cancelled': return 'bg-red-50 text-red-600';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    const handleViewDetails = (id: number) => {
        alert(`View details for booking #${id}`);
    };

    return (
        <AdminLayout activePage="manage-bookings">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Manage Bookings</h1>
                <p className="text-gray-600">View and manage customer bookings</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Search by customer or car..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 rounded-xl"
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Status">All Status</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Confirmed">Confirmed</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading bookings...</div>
                ) : bookings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No bookings found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Booking ID</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Customer</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Car</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Pickup Date</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Return Date</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Total Price</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{booking.id.toString().padStart(4, '0')}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{booking.userName || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{booking.carName || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{booking.pickupDate}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{booking.returnDate}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">RM{booking.totalPrice}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                className={`text-xs font-medium px-3 py-1 rounded-lg border-0 cursor-pointer focus:ring-2 focus:ring-blue-500/20 ${getStatusColor(booking.status)}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ManageBookings;
