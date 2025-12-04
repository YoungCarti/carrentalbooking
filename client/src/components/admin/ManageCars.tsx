import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Edit, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ManageCars = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cars, setCars] = useState([
        { id: 1, name: 'Tesla Model 3', category: 'Electric', price: 89, passengers: 5, transmission: 'Auto', fuel: 'Electric', status: 'Available' },
        { id: 2, name: 'BMW 5 Series', category: 'Luxury', price: 120, passengers: 5, transmission: 'Auto', fuel: 'Petrol', status: 'Available' },
        { id: 3, name: 'Mercedes C-Class', category: 'Premium', price: 115, passengers: 5, transmission: 'Auto', fuel: 'Diesel', status: 'Rented' },
    ]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            setCars(cars.filter(car => car.id !== id));
        }
    };

    const handleEdit = (id: number) => {
        alert(`Edit car with ID: ${id}`);
    };

    const filteredCars = cars.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout activePage="manage-cars">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Manage Cars</h1>
                <p className="text-gray-600">View and manage your vehicle fleet</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder="Search by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 rounded-xl"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Car Name</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Category</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Price/Day</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Passengers</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Transmission</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Fuel</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCars.map((car) => (
                                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{car.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                                            {car.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">${car.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{car.passengers}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{car.transmission}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{car.fuel}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${car.status === 'Available' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                                            }`}>
                                            {car.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(car.id)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(car.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
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

export default ManageCars;
