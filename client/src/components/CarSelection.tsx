import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Cog, Fuel, Star } from 'lucide-react';
import { Button } from './ui/button';
import ImageWithFallback from '../figma/ImageWithFallback';
import { carsApi } from '../lib/api';

interface Car {
    id: number;
    name: string;
    category: string;
    price: number;
    passengers: string | number;
    transmission: string;
    fuel: string;
    imageUrl?: string;
    image?: string;
    rating: number;
}

const CarSelection = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState<Car[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        fetchFeaturedCars();
    }, []);

    const fetchFeaturedCars = async () => {
        try {
            const data = await carsApi.getAll();
            // Filter for featured cars on client side
            const featured = data.filter((car: any) => car.isFeatured);
            setCars(featured);
        } catch (error) {
            console.error('Error fetching featured cars:', error);
        }
    };

    return (
        <section id="vehicles" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Choose the car that suits you</h2>
                        <p className="text-xl text-gray-600">Select from our premium fleet of vehicles</p>
                    </div>
                    <a href="#" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
                        See all <span className="text-xl">→</span>
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cars.map((car, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <ImageWithFallback
                                    src={car.imageUrl || car.image || ''}
                                    alt={car.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-bold text-gray-900">{car.rating}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="text-xs font-bold text-blue-600 tracking-wide uppercase mb-2">{car.category}</div>
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-4">{car.name}</h3>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <div className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1 text-xs text-gray-600 border border-gray-100">
                                        <Users className="w-3 h-3" />
                                        <span>{car.passengers}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1 text-xs text-gray-600 border border-gray-100">
                                        <Cog className="w-3 h-3" />
                                        <span>{car.transmission}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1 text-xs text-gray-600 border border-gray-100">
                                        <Fuel className="w-3 h-3" />
                                        <span>{car.fuel}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900">RM{car.price}</span>
                                        <span className="text-sm text-gray-500">/day</span>
                                    </div>
                                    <Button onClick={() => {
                                        if (!user) {
                                            alert('Please sign in first to make a booking');
                                            return;
                                        }
                                        const params = new URLSearchParams({
                                            carId: car.id.toString(),
                                            carName: car.name,
                                            carPrice: car.price.toString()
                                        });
                                        window.scrollTo(0, 0);
                                        window.scrollTo(0, 0);
                                        navigate(`/booking?${params.toString()}`);
                                    }} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all">
                                        Rent Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CarSelection;
