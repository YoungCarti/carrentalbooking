import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Eye } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const ManageBookings = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Status');
    const [bookings, setBookings] = useState([
        { id: 1, customer: 'John Doe', car: 'Tesla Model 3', pickup: '2025-01-15', dropoff: '2025-01-20', price: 445, status: 'Confirmed' },
        { id: 2, customer: 'Jane Smith', car: 'BMW 5 Series', pickup: '2025-01-18', dropoff: '2025-01-22', price: 480, status: 'Pending' },
        { id: 3, customer: 'Mike Johnson', car: 'Mercedes C-Class', pickup: '2025-01-10', dropoff: '2025-01-15', price: 575, status: 'Completed' },
    ]);

    const handleStatusChange = (id: number, newStatus: string) => {
        setBookings(bookings.map(booking =>
            booking.id === id ? { ...booking, status: newStatus } : booking
        ));
    };

    const handleViewDetails = (id: number) => {
        alert(`View details for booking #${id}`);
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.car.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All Status' || booking.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-50 text-green-600';
            case 'Pending': return 'bg-yellow-50 text-yellow-600';
            case 'Completed': return 'bg-blue-50 text-blue-600';
            case 'Cancelled': return 'bg-red-50 text-red-600';
            default: return 'bg-gray-50 text-gray-600';
        }
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
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Booking ID</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Customer</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Car</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Pickup Date</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Dropoff Date</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Total Price</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{booking.id.toString().padStart(4, '0')}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{booking.customer}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{booking.car}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{booking.pickup}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{booking.dropoff}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">${booking.price}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                            className={`text-xs font-medium px-3 py-1 rounded-lg border-0 cursor-pointer focus:ring-2 focus:ring-blue-500/20 ${getStatusColor(booking.status)}`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(booking.id)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageBookings;
