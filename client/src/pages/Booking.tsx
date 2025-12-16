import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { bookingsApi } from '../lib/api';

interface BookingFormData {
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const carId = searchParams.get('carId');
  const carName = searchParams.get('carName');
  const carPrice = searchParams.get('carPrice');

  const [formData, setFormData] = useState<BookingFormData>({
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('Please sign in first to make a booking');
      navigate('/');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    setIsAuthenticated(true);
  }, [navigate]);

  // Calculate days and total price
  useEffect(() => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      const daysDiff = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 0) {
        setDays(daysDiff);
        setTotalPrice(daysDiff * Number(carPrice));
      }
    }
  }, [formData.pickupDate, formData.returnDate, carPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.pickupDate || !formData.returnDate || !formData.pickupLocation || !formData.returnLocation) {
      alert('Please fill in all fields');
      return;
    }

    if (days <= 0) {
      alert('Return date must be after pickup date');
      return;
    }

    setLoading(true);
    try {
      await bookingsApi.create({
        userId: user!.id,
        carId: parseInt(carId!),
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate,
        pickupLocation: formData.pickupLocation,
        returnLocation: formData.returnLocation,
        totalPrice: totalPrice,
      });

      alert('Booking confirmed! Check your bookings page for details.');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] px-6">
      <div className="container mx-auto max-w-2xl pt-20 pb-20">
        {/* Booking Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600 mb-8">Secure your {carName} reservation</p>

          {/* Car Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{carName}</h2>
                <p className="text-gray-600">Booking Reference</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Price per day</p>
                <p className="text-2xl font-bold text-blue-600">RM {carPrice}</p>
              </div>
            </div>
            {days > 0 && (
              <div className="pt-4 border-t border-blue-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{days} day(s)</span>
                  <span className="font-semibold text-gray-900">RM {carPrice} × {days}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-blue-200">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-blue-600">RM {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pickupDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Pickup Date
                </Label>
                <Input
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Return Date
                </Label>
                <Input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pickupLocation" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Pickup Location
                </Label>
                <Input
                  id="pickupLocation"
                  name="pickupLocation"
                  placeholder="e.g., Kuala Lumpur Office"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnLocation" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Return Location
                </Label>
                <Input
                  id="returnLocation"
                  name="returnLocation"
                  placeholder="e.g., Airport"
                  value={formData.returnLocation}
                  onChange={handleChange}
                  className="rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Pricing Summary */}
            {days > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Total Cost</p>
                    <p className="text-sm text-gray-500">{days} days × RM {carPrice}/day</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">RM {totalPrice.toFixed(2)}</p>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 text-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </form>

          {/* Booking Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Booking Information</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>✓ Free cancellation up to 24 hours before pickup</p>
              <p>✓ Full insurance included in the price</p>
              <p>✓ Unlimited mileage</p>
              <p>✓ 24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
