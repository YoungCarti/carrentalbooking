import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Car } from 'lucide-react';
import { Button } from '../components/ui/button';
import { bookingsApi } from '../lib/api';

interface Booking {
  id: number;
  carName: string;
  carImageUrl?: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  totalPrice: number;
  status: string;
}

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchBookings(parsedUser.id);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchBookings = async (userId: number) => {
    setLoading(true);
    try {
      const data = await bookingsApi.getByUserId(userId) as unknown as Booking[];
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] pt-32 pb-16 px-6 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-4">My Bookings</h1>
          <p className="text-lg text-indigo-100 leading-relaxed">View and manage your car rental reservations</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 -mt-10 pb-20">
        <div className="mb-8">
        </div>

        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            Loading your bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">You haven't made any car reservations yet.</p>
            <Button
              onClick={() => navigate('/vehicles')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 py-2"
            >
              Browse Vehicles
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    {booking.carImageUrl ? (
                      <img
                        src={booking.carImageUrl}
                        alt={booking.carName}
                        className="h-32 w-40 rounded-xl bg-gray-50 object-contain flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="h-32 w-40 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Car className="w-12 h-12" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{booking.carName}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                      </p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)} whitespace-nowrap`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Pickup: {formatDate(booking.pickupDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Return: {formatDate(booking.returnDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>From: {booking.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>To: {booking.returnLocation}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">RM {booking.totalPrice}</span>
                  </div>

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => navigate('/vehicles')}
                  >
                    Book Another Car
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
