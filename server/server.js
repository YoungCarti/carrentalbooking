const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { pool, testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ============ AUTH ROUTES ============

// Register
app.post('/register', async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (email, password, name, age) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, age]
    );

    // Generate token
    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      accessToken: token,
      user: {
        id: result.insertId,
        email,
        name,
        age
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        age: user.age
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// ============ CARS ROUTES ============

// Get all cars
app.get('/cars', async (req, res) => {
  try {
    const [cars] = await pool.query('SELECT * FROM cars');
    // Convert snake_case to camelCase for frontend compatibility
    const formattedCars = cars.map(car => ({
      id: car.id,
      name: car.name,
      category: car.category,
      price: parseFloat(car.price),
      oldPrice: parseFloat(car.old_price),
      passengers: car.passengers,
      transmission: car.transmission,
      fuel: car.fuel,
      imageUrl: car.image_url,
      rating: parseFloat(car.rating),
      seats: car.seats,
      type: car.type,
      capacity: car.capacity,
      isElectric: Boolean(car.is_electric),
      isFeatured: Boolean(car.is_featured),
      description: car.description
    }));
    res.json(formattedCars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Error fetching cars' });
  }
});

// Search cars by available dates MUST come before '/cars/:id' to avoid route conflicts
app.get('/cars/search', async (req, res) => {
  try {
    const { pickupDate, dropoffDate } = req.query;

    if (!pickupDate || !dropoffDate) {
      return res.status(400).json({ message: 'pickupDate and dropoffDate are required' });
    }

    if (new Date(pickupDate) >= new Date(dropoffDate)) {
      return res.status(400).json({ message: 'dropoffDate must be after pickupDate' });
    }

    const [cars] = await pool.query('SELECT * FROM cars');
    if (!cars || cars.length === 0) {
      return res.json([]);
    }

    const [bookings] = await pool.query(
      'SELECT DISTINCT car_id FROM bookings WHERE (return_date > ? AND pickup_date < ?) AND status != ?',
      [pickupDate, dropoffDate, 'cancelled']
    );

    const bookedCarIds = bookings.map(b => b.car_id);
    const availableCarsRaw = cars.filter(car => !bookedCarIds.includes(car.id));

    const availableCars = availableCarsRaw.map(car => ({
      id: car.id,
      name: car.name,
      category: car.category,
      price: parseFloat(car.price),
      oldPrice: car.old_price != null ? parseFloat(car.old_price) : null,
      passengers: car.passengers,
      transmission: car.transmission,
      fuel: car.fuel,
      imageUrl: car.image_url,
      rating: car.rating != null ? parseFloat(car.rating) : null,
      seats: car.seats,
      type: car.type,
      capacity: car.capacity,
      isElectric: Boolean(car.is_electric),
      isFeatured: Boolean(car.is_featured),
      description: car.description
    }));

    return res.json(availableCars);
  } catch (error) {
    console.error('Error searching cars:', error);
    res.status(500).json({ message: 'Error searching cars' });
  }
});

// Get single car
app.get('/cars/:id', async (req, res) => {
  try {
    const [cars] = await pool.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    if (cars.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    const car = cars[0];
    res.json({
      id: car.id,
      name: car.name,
      category: car.category,
      price: parseFloat(car.price),
      oldPrice: parseFloat(car.old_price),
      passengers: car.passengers,
      transmission: car.transmission,
      fuel: car.fuel,
      imageUrl: car.image_url,
      rating: parseFloat(car.rating),
      seats: car.seats,
      type: car.type,
      capacity: car.capacity,
      isElectric: Boolean(car.is_electric),
      isFeatured: Boolean(car.is_featured),
      description: car.description
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Error fetching car' });
  }
});

// Add new car (no auth required for uni project)
app.post('/cars', async (req, res) => {
  try {
    const { name, category, price, oldPrice, passengers, transmission, fuel, imageUrl, rating, seats, type, capacity, isElectric, isFeatured, description } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO cars (name, category, price, old_price, passengers, transmission, fuel, image_url, rating, seats, type, capacity, is_electric, is_featured, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, price, oldPrice, passengers, transmission, fuel, imageUrl, rating, seats, type, capacity, isElectric, isFeatured, description]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      category,
      price,
      oldPrice,
      passengers,
      transmission,
      fuel,
      imageUrl,
      rating,
      seats,
      type,
      capacity,
      isElectric,
      isFeatured,
      description
    });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ message: 'Error adding car' });
  }
});

// Update car (no auth required for uni project)
app.put('/cars/:id', async (req, res) => {
  try {
    const { name, category, price, oldPrice, passengers, transmission, fuel, imageUrl, rating, seats, type, capacity, isElectric, isFeatured, description } = req.body;
    
    const [result] = await pool.query(
      'UPDATE cars SET name = ?, category = ?, price = ?, old_price = ?, passengers = ?, transmission = ?, fuel = ?, image_url = ?, rating = ?, seats = ?, type = ?, capacity = ?, is_electric = ?, is_featured = ?, description = ? WHERE id = ?',
      [name, category, price, oldPrice, passengers, transmission, fuel, imageUrl, rating, seats, type, capacity, isElectric, isFeatured, description, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({
      id: parseInt(req.params.id),
      name,
      category,
      price,
      oldPrice,
      passengers,
      transmission,
      fuel,
      imageUrl,
      rating,
      seats,
      type,
      capacity,
      isElectric,
      isFeatured,
      description
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Error updating car' });
  }
});

// (duplicate '/cars/search' route removed; see earlier definition above '/cars/:id')

// Delete car (no auth required for uni project)
app.delete('/cars/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM cars WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Error deleting car' });
  }
});

// ============ BOOKINGS ROUTES ============

// Get all bookings (no auth required for uni project)
app.get('/bookings', async (req, res) => {
  try {
    const [bookings] = await pool.query(`
      SELECT b.*, c.name as car_name, c.image_url, u.name as user_name, u.email as user_email
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
    `);
    
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      userId: booking.user_id,
      carId: booking.car_id,
      carName: booking.car_name,
      carImageUrl: booking.image_url,
      userName: booking.user_name,
      userEmail: booking.user_email,
      pickupDate: booking.pickup_date,
      returnDate: booking.return_date,
      pickupLocation: booking.pickup_location,
      returnLocation: booking.return_location,
      totalPrice: parseFloat(booking.total_price),
      status: booking.status,
      createdAt: booking.created_at
    }));
    
    res.json(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Get user's bookings (no auth required for uni project)
app.get('/bookings/user/:userId', async (req, res) => {
  try {
    const [bookings] = await pool.query(`
      SELECT b.*, c.name as car_name, c.image_url
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `, [req.params.userId]);
    
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      userId: booking.user_id,
      carId: booking.car_id,
      carName: booking.car_name,
      carImageUrl: booking.image_url,
      pickupDate: booking.pickup_date,
      returnDate: booking.return_date,
      pickupLocation: booking.pickup_location,
      returnLocation: booking.return_location,
      totalPrice: parseFloat(booking.total_price),
      status: booking.status,
      createdAt: booking.created_at
    }));
    
    res.json(formattedBookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Error fetching user bookings' });
  }
});

// Create booking (no auth required for uni project)
app.post('/bookings', async (req, res) => {
  try {
    const { userId, carId, pickupDate, returnDate, pickupLocation, returnLocation, totalPrice } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO bookings (user_id, car_id, pickup_date, return_date, pickup_location, return_location, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, carId, pickupDate, returnDate, pickupLocation, returnLocation, totalPrice, 'pending']
    );

    res.status(201).json({
      id: result.insertId,
      userId,
      carId,
      pickupDate,
      returnDate,
      pickupLocation,
      returnLocation,
      totalPrice,
      status: 'pending'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Update booking status (no auth required for uni project)
app.patch('/bookings/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    const [result] = await pool.query(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking updated successfully', status });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Error updating booking' });
  }
});

// Delete booking (no auth required for uni project)
app.delete('/bookings/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
});

// ============ USERS ROUTES ============

// Get all users (no auth required for uni project)
app.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, email, name, age, created_at FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get single user (no auth required for uni project)
app.get('/users/:id', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, email, name, age, created_at FROM users WHERE id = ?', [req.params.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Start server
async function startServer() {
  // Test database connection first
  const connected = await testConnection();
  
  if (!connected) {
    console.error('Failed to connect to database. Please check your configuration.');
    process.exit(1);
  }

  // Initialize test user if they don't exist
  await initializeTestUser();

  app.listen(PORT, () => {
    console.log(`✓ Server is running on http://localhost:${PORT}`);
  });
}

// Initialize test user
async function initializeTestUser() {
  try {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', ['lewis@gmail.com']);
    
    if (existingUser.length === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await pool.query(
        'INSERT INTO users (email, password, name, age) VALUES (?, ?, ?, ?)',
        ['lewis@gmail.com', hashedPassword, 'Lewis Hamilton', 21]
      );
      console.log('✓ Test user created: lewis@gmail.com / password123');
    } else {
      console.log('✓ Test user already exists');
    }
  } catch (error) {
    console.error('Error initializing test user:', error);
  }
}

startServer();
