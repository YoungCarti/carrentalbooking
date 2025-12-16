import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Edit, Trash2, Star, StarOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { carsApi } from '../../lib/api';

interface Car {
    id: number;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    passengers: number | string;
    transmission: string;
    fuel: string;
    imageUrl?: string;
    rating?: number;
    seats?: string;
    type?: string;
    capacity?: string;
    description?: string;
    status?: string;
    isFeatured?: boolean;
    isElectric?: boolean;
}

const ManageCars = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const data = await carsApi.getAll();
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
            alert('Failed to fetch cars. Make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await carsApi.delete(id);
                setCars(cars.filter(car => car.id !== id));
                alert('Car deleted successfully!');
            } catch (error) {
                console.error('Error deleting car:', error);
                alert('Failed to delete car. You may not have permission.');
            }
        }
    };

    const handleToggleFeatured = async (car: Car) => {
        try {
            const updatedData = { ...car, isFeatured: !car.isFeatured };
            await carsApi.update(car.id, updatedData);
            setCars(cars.map(c => c.id === car.id ? { ...c, isFeatured: !c.isFeatured } : c));
            alert('Car updated successfully!');
        } catch (error) {
            console.error('Error updating car:', error);
            alert('Failed to update car. You may not have permission.');
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
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading cars...</div>
                ) : cars.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No cars found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Car Name</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Category</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Price/Day</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Featured</th>
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
                                        <td className="px-6 py-4 text-sm text-gray-600">RM{car.price}</td>
                                        <td className="px-6 py-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleToggleFeatured(car)}
                                                className={car.isFeatured ? "text-yellow-500 hover:text-yellow-600" : "text-gray-400 hover:text-gray-500"}
                                            >
                                                {car.isFeatured ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                                            </Button>
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
                )}
            </div>
        </AdminLayout>
    );
};

export default ManageCars;
