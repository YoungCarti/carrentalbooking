-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2025 at 04:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_rental_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `pickup_date` date NOT NULL,
  `return_date` date NOT NULL,
  `pickup_location` varchar(255) DEFAULT NULL,
  `return_location` varchar(255) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `car_id`, `pickup_date`, `return_date`, `pickup_location`, `return_location`, `total_price`, `status`, `created_at`) VALUES
(1, 3, 1, '2025-12-16', '2025-12-18', 'Klia', 'Klia', 887.40, 'completed', '2025-12-15 19:04:34'),
(2, 3, 3, '2025-12-17', '2025-12-21', 'Klia', 'Klia', 359.60, 'confirmed', '2025-12-16 03:48:20'),
(3, 3, 4, '2025-12-30', '2025-12-31', 'Klia', 'Klia', 2.00, 'pending', '2025-12-16 04:46:48'),
(4, 4, 1, '2025-12-25', '2025-12-26', 'Klang', 'PJ', 443.70, 'confirmed', '2025-12-17 04:03:32');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `old_price` decimal(10,2) DEFAULT NULL,
  `passengers` varchar(50) DEFAULT NULL,
  `transmission` varchar(50) DEFAULT NULL,
  `fuel` varchar(50) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `seats` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `capacity` varchar(50) DEFAULT NULL,
  `is_electric` tinyint(1) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `name`, `category`, `price`, `old_price`, `passengers`, `transmission`, `fuel`, `image_url`, `rating`, `seats`, `type`, `capacity`, `is_electric`, `is_featured`, `description`, `created_at`) VALUES
(1, 'Nissan KICKS e-POWER', 'Sport', 443.70, 500.00, '2 Person', 'Auto', 'Electric', 'https://images.unsplash.com/photo-1762095207472-711aa5fb8029?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.8, '2 seats', 'Electric', '90L Capacity', 1, 1, 'Experience the thrill of electric driving with the Nissan KICKS e-POWER.', '2025-12-15 18:04:56'),
(2, 'Ora Good Cat EV', 'Hatchback', 459.70, 500.00, '4 Person', 'Auto', 'Electric', 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2070&auto=format&fit=crop', 5.0, '4 seats', 'Electric', '80L Capacity', 1, 1, 'The Ora Good Cat is a stylish and practical electric hatchback.', '2025-12-15 18:04:56'),
(3, 'Horse', 'Electric', 89.90, 100.00, '2', 'Manual', 'Electric', 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 5.0, '5 seats', 'Electric', '50L', 1, 0, 'horse', '2025-12-15 18:43:43'),
(4, 'Old Car', 'Electric', 2.00, 5.00, '1', 'Auto', 'Electric', 'https://images.unsplash.com/photo-1603557275022-48fd88ce4933?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 5.0, '5 seats', 'Electric', '50L', 1, 0, 'It might work', '2025-12-15 18:50:50'),
(5, 'Nissan KICKS e-POWER', 'Sport', 443.70, 500.00, '2 Person', 'Auto', 'Electric', 'https://images.unsplash.com/photo-1591147244581-6b5a97198909?q=80&w=2070&auto=format&fit=crop', 4.8, '2 seats', 'Electric', '90L Capacity', 1, 1, 'Experience the thrill of electric driving with the Nissan KICKS e-POWER.', '2025-12-16 04:23:11'),
(6, 'Ora Good Cat EV', 'Hatchback', 459.70, 500.00, '4 Person', 'Auto', 'Electric', 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2070&auto=format&fit=crop', 5.0, '4 seats', 'Electric', '80L Capacity', 1, 1, 'The Ora Good Cat is a stylish and practical electric hatchback.', '2025-12-16 04:23:11'),
(7, 'Honda Jazz', 'Sedan', 350.50, 400.00, '5 Person', 'Auto', 'Petrol', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2070&auto=format&fit=crop', 4.7, '5 seats', 'Compact', '42L Capacity', 0, 1, 'Compact and reliable for city driving.', '2025-12-16 04:23:11'),
(8, 'Toyota Camry', 'Sedan', 520.00, 600.00, '5 Person', 'Auto', 'Hybrid', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9, '5 seats', 'Sedan', '60L Capacity', 0, 1, 'Premium sedan with excellent fuel efficiency.', '2025-12-16 04:23:11'),
(9, 'Kia Sportage', 'SUV', 580.00, 650.00, '5 Person', 'Auto', 'Petrol', 'https://images.unsplash.com/photo-1649921777129-a28a26031a03?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.8, '5 seats', 'SUV', '70L Capacity', 0, 1, 'Spacious SUV for family adventures.', '2025-12-16 04:23:11'),
(10, 'Hyundai Elantra', 'Sedan', 380.00, 450.00, '5 Person', 'Auto', 'Petrol', 'https://images.unsplash.com/photo-1629678212150-d928baa670f0?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.6, '5 seats', 'Sedan', '50L Capacity', 0, 1, 'Affordable and stylish sedan option.', '2025-12-16 04:23:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `age`, `created_at`) VALUES
(1, 'lewis@gmail.com', 'password123', 'Lewis Hamilton', 21, '2025-12-15 18:04:56'),
(2, 'example@example.com', '$2a$10$WN4I0N.GL2nKsYqK1n.UROzAi98IOLmKeUVzgaj.c4H4eB9XBQS3C', 'Example', 25, '2025-12-15 18:04:56'),
(3, 'ryan@example.com', '$2b$10$7JYzEv9qIQdVIUGjikX6l.I59AwXgFwRNPo.APXvUOBSMaX1PC85y', 'Ryan', 12, '2025-12-15 18:52:24'),
(4, 'resh@gmail.com', '$2b$10$ayPzGuU0XiWpB3XNaStE/OTPzNXhvjciib.phBL1XGT/oTV2UWYy6', 'Resh', 21, '2025-12-17 04:01:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
