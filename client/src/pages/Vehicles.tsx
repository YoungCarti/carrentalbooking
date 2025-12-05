import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Clock, Car, Users, Fuel, Gauge, Zap, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import ImageWithFallback from '../figma/ImageWithFallback';

interface CarData {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image?: string; // Handle imageUrl vs image
    imageUrl?: string;
    rating: number;
    seats: string;
    type: string;
    category: string;
    capacity: string;
    passengers: string;
    isElectric: boolean;
}

const Vehicles = () => {
    const [cars, setCars] = useState<CarData[]>([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:3000/cars');
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Gradient Header */}
            <div className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            <div className="lg:col-span-1">
                                <label className="text-xs text-gray-300 mb-1.5 block">Start Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition-colors" />
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <label className="text-xs text-gray-300 mb-1.5 block">End Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition-colors" />
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <label className="text-xs text-gray-300 mb-1.5 block">Start Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="--:-- --" className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition-colors" />
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <label className="text-xs text-gray-300 mb-1.5 block">End Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="--:-- --" className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition-colors" />
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <label className="text-xs text-gray-300 mb-1.5 block">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="City or Airport" className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition-colors" />
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <label className="text-xs text-gray-300 mb-1.5 block">Type</label>
                                <div className="relative">
                                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors appearance-none cursor-pointer">
                                        <option className="bg-gray-900">All Types</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl px-8 py-6 shadow-lg shadow-indigo-500/30 font-semibold flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                Search Cars
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-72 space-y-6">
                        {/* Search Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Search</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input placeholder="Search cars..." className="pl-10 bg-gray-50 border-gray-200 rounded-xl" />
                            </div>
                        </div>

                        {/* Car Type */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Car Type</h3>
                            <Select defaultValue="sport">
                                <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sport">Sport</SelectItem>
                                    <SelectItem value="suv">SUV</SelectItem>
                                    <SelectItem value="mpv">MPV</SelectItem>
                                    <SelectItem value="sedan">Sedan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Capacity */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Capacity</h3>
                            <Select defaultValue="2person">
                                <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl">
                                    <SelectValue placeholder="Select capacity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2person">2 Person</SelectItem>
                                    <SelectItem value="4person">4 Person</SelectItem>
                                    <SelectItem value="6person">6 Person</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Brand */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Brand</h3>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl">
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Brands</SelectItem>
                                    <SelectItem value="nissan">Nissan</SelectItem>
                                    <SelectItem value="toyota">Toyota</SelectItem>
                                    <SelectItem value="honda">Honda</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price Range */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4f46e5]" />
                            <div className="mt-2 text-sm text-[#4f46e5] font-medium">Max: RM680</div>
                        </div>
                    </div>

                    {/* Car List */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Showing {cars.length} vehicles</h2>
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                                <span className="text-sm text-gray-500">Sort by</span>
                                <Filter className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {cars.map((car, index) => (
                                <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8">
                                    {/* Image Section */}
                                    <div className="w-full md:w-72 bg-gray-50 rounded-2xl p-4 relative flex-shrink-0">
                                        <div className="aspect-[4/3] relative">
                                            <ImageWithFallback
                                                src={car.imageUrl || car.image || ''}
                                                alt={car.name}
                                                className="w-full h-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                        {car.isElectric && (
                                            <div className="absolute top-3 right-3 bg-emerald-400 rounded-full p-1.5 shadow-lg shadow-emerald-400/30">
                                                <Zap className="w-3 h-3 text-white fill-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Details Section */}
                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-[#1e1b4b] mb-1">{car.name}</h3>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <span className="text-yellow-400">★</span>
                                                        <span className="font-medium text-gray-900">{car.rating}</span>
                                                        <span>({car.seats})</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold text-[#4f46e5]">RM{car.price.toFixed(2)}</div>
                                                    <div className="text-sm text-gray-400">/day</div>
                                                    {car.oldPrice && (
                                                        <div className="text-sm text-gray-400 line-through">RM{car.oldPrice}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6">
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                        <Car className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">{car.type}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                        <Gauge className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">{car.category}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                        <Fuel className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">{car.capacity}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                        <Users className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">{car.passengers}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex justify-end">
                                            <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl px-10 py-6 font-semibold shadow-lg shadow-indigo-500/20 w-full md:w-auto">
                                                Book Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
