import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const AddCar = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        passengers: '',
        transmission: '',
        fuel: '',
        imageUrl: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Car added successfully!');
        setFormData({
            name: '',
            category: '',
            price: '',
            passengers: '',
            transmission: '',
            fuel: '',
            imageUrl: '',
            description: ''
        });
    };

    const handleClear = () => {
        setFormData({
            name: '',
            category: '',
            price: '',
            passengers: '',
            transmission: '',
            fuel: '',
            imageUrl: '',
            description: ''
        });
    };

    return (
        <AdminLayout activePage="add-car">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Add New Car</h1>
                <p className="text-gray-600">Add a new vehicle to your rental fleet</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-3xl space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Car Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Tesla Model 3"
                        className="rounded-xl"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Electric"
                            className="rounded-xl"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price per Day ($)</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g., 89"
                            className="rounded-xl"
                            required
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="passengers">Passengers</Label>
                        <Input
                            id="passengers"
                            name="passengers"
                            type="number"
                            value={formData.passengers}
                            onChange={handleChange}
                            placeholder="e.g., 5"
                            className="rounded-xl"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="transmission">Transmission</Label>
                        <Input
                            id="transmission"
                            name="transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                            placeholder="e.g., Auto"
                            className="rounded-xl"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fuel">Fuel Type</Label>
                        <Input
                            id="fuel"
                            name="fuel"
                            value={formData.fuel}
                            onChange={handleChange}
                            placeholder="e.g., Electric"
                            className="rounded-xl"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="rounded-xl"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="rounded-xl"
                        required
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all">
                        Add Car
                    </Button>
                    <Button type="button" variant="outline" onClick={handleClear} className="rounded-xl">
                        Clear Form
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
};

export default AddCar;
