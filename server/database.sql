-- Create the database
CREATE DATABASE IF NOT EXISTS car_rental_db;
USE car_rental_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    passengers VARCHAR(50),
    transmission VARCHAR(50),
    fuel VARCHAR(50),
    image_url TEXT,
    rating DECIMAL(2, 1),
    seats VARCHAR(50),
    type VARCHAR(50),
    capacity VARCHAR(50),
    is_electric BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    pickup_location VARCHAR(255),
    return_location VARCHAR(255),
    total_price DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Insert sample cars data
INSERT INTO cars (name, category, price, old_price, passengers, transmission, fuel, image_url, rating, seats, type, capacity, is_electric, is_featured, description) VALUES
('Nissan KICKS e-POWER', 'Sport', 443.70, 500.00, '2 Person', 'Auto', 'Electric', 'https://images.unsplash.com/photo-1591147244581-6b5a97198909?q=80&w=2070&auto=format&fit=crop', 4.8, '2 seats', 'Electric', '90L Capacity', TRUE, TRUE, 'Experience the thrill of electric driving with the Nissan KICKS e-POWER.'),
('Ora Good Cat EV', 'Hatchback', 459.70, 500.00, '4 Person', 'Auto', 'Electric', 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2070&auto=format&fit=crop', 5.0, '4 seats', 'Electric', '80L Capacity', TRUE, TRUE, 'The Ora Good Cat is a stylish and practical electric hatchback.');

-- Insert sample users (password is 'password123' hashed with bcrypt)
INSERT INTO users (email, password, name, age) VALUES
('lewis@gmail.com', '$2a$10$bUQu3QNgx/jFQNOSxI2jo.Fd.49NIBqHOFHLEGdDPjeAAQuuuV.3K', 'Lewis Hamilton', 21),
('example@example.com', '$2a$10$WN4I0N.GL2nKsYqK1n.UROzAi98IOLmKeUVzgaj.c4H4eB9XBQS3C', 'Example', 25);
