-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2025 at 02:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `quantity` int(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `category`, `quantity`, `price`, `created_at`, `updated_at`, `image`, `amount`) VALUES
(15, 'Chicken Caesar Salad', 'Lunch', 0, 50.50, '2024-03-16 20:40:00', '2024-12-02 08:48:39', 'salad.jpg', NULL),
(16, 'Avocado Toast', 'Breakfast', 286, 30.00, '2024-03-16 20:48:53', '2024-12-02 08:48:39', 'avocado.jpg', 1),
(17, 'Strawberry Banana Smoothie', 'Drinks', 247, 18.60, '2024-03-16 20:57:52', '2024-12-02 07:07:22', 'strawberry.jpg', 1),
(18, 'Hummus and Veggie Sticks', 'Snacks', 148, 80.00, '2024-03-16 21:00:25', '2024-11-27 06:15:22', 'Hummus.jpg', 1),
(19, 'Chocolate Chip Cookies', 'Dessert', 276, 10.50, '2024-03-16 21:01:20', '2024-12-02 07:07:22', 'chocolate.jpeg', 1),
(20, 'Margherita Pizza', 'Lunch', 120, 140.00, '2024-03-16 21:02:15', '2024-03-16 21:02:15', 'pizza.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` int(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) DEFAULT 'Pending',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `name`, `category`, `price`, `quantity`, `amount`, `user_id`, `created_at`, `status`, `updated_at`) VALUES
(17, 'Chocolate Chip Cookies', 'Dessert', 10.50, 280, 1, 2, '2024-03-16 21:03:46', 'delivering', '2024-12-01 21:04:05'),
(18, 'Strawberry Banana Smoothie', 'Drinks', 18.60, 250, 1, 2, '2024-03-16 21:03:46', 'deliverd', '2024-11-28 11:51:40'),
(19, 'Chicken Caesar Salad', 'Lunch', 50.50, 200, 2, 3, '2024-03-16 21:10:21', 'delivering', '2024-11-28 11:51:43'),
(20, 'Chocolate Chip Cookies', 'Dessert', 10.50, 279, 1, 3, '2024-03-16 21:10:21', 'Pending', '2024-03-16 21:10:21'),
(21, 'Avocado Toast', 'Breakfast', 30.00, 300, 2, 6, '2024-07-17 13:28:33', 'Pending', '2024-07-17 13:28:33'),
(22, 'Avocado Toast', 'Breakfast', 30.00, 300, 2, 6, '2024-07-17 13:28:39', 'Pending', '2024-07-17 13:28:39'),
(23, 'Chocolate Chip Cookies', 'Dessert', 10.50, 278, 1, 6, '2024-07-18 07:08:19', 'Pending', '2024-07-18 07:08:19'),
(24, 'Chicken Caesar Salad', 'Lunch', 50.50, 198, 1, 6, '2024-07-18 07:44:50', 'Pending', '2024-07-18 07:44:50'),
(25, 'Hummus and Veggie Sticks', 'Snacks', 80.00, 150, 1, 6, '2024-07-18 07:44:50', 'Pending', '2024-07-18 07:44:50'),
(26, 'Chicken Caesar Salad', 'Lunch', 50.50, 197, 1, 6, '2024-11-27 06:15:21', 'Pending', '2024-11-27 06:15:21'),
(27, 'Avocado Toast', 'Breakfast', 30.00, 296, 2, 6, '2024-11-27 06:15:21', 'Pending', '2024-11-27 06:15:21'),
(28, 'Hummus and Veggie Sticks', 'Snacks', 80.00, 149, 1, 6, '2024-11-27 06:15:21', 'Pending', '2024-11-27 06:15:21'),
(29, 'Chicken Caesar Salad', 'Lunch', 50.50, 196, 2, 6, '2024-11-27 06:36:32', 'Pending', '2024-11-27 06:36:32'),
(30, 'Chicken Caesar Salad', 'Lunch', 50.50, 194, 3, 6, '2024-11-28 11:49:00', 'Pending', '2024-11-28 11:49:00'),
(31, 'Chicken Caesar Salad', 'Lunch', 50.50, 191, 1, 6, '2024-11-28 11:49:51', 'Pending', '2024-11-28 11:49:51'),
(32, 'Avocado Toast', 'Breakfast', 30.00, 294, 1, 6, '2024-11-28 11:49:51', 'Pending', '2024-11-28 11:49:51'),
(33, 'Avocado Toast', 'Breakfast', 30.00, 293, 3, 4, '2024-11-28 13:39:46', 'Pending', '2024-11-28 13:39:46'),
(34, 'Avocado Toast', 'Breakfast', 30.00, 290, 2, 1, '2024-11-30 06:09:49', 'Pending', '2024-11-30 06:09:49'),
(35, 'Strawberry Banana Smoothie', 'Drinks', 18.60, 249, 1, 1, '2024-11-30 06:09:49', 'Pending', '2024-11-30 06:09:49'),
(36, 'Avocado Toast', 'Breakfast', 30.00, 288, 1, 9, '2024-12-02 07:07:22', 'Pending', '2024-12-02 07:07:22'),
(37, 'Chocolate Chip Cookies', 'Dessert', 10.50, 277, 1, 9, '2024-12-02 07:07:22', 'Pending', '2024-12-02 07:07:22'),
(38, 'Strawberry Banana Smoothie', 'Drinks', 18.60, 248, 1, 9, '2024-12-02 07:07:22', 'Pending', '2024-12-02 07:07:22'),
(39, 'Chicken Caesar Salad', 'Lunch', 50.50, 195, 0, 9, '2024-12-02 08:48:39', 'Pending', '2024-12-02 08:48:39'),
(40, 'Avocado Toast', 'Breakfast', 30.00, 287, 1, 9, '2024-12-02 08:48:39', 'Pending', '2024-12-02 08:48:39');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `user_id`, `payment_method`, `delivery_address`, `phone_number`, `created_at`) VALUES
(10, 2, 'cash', 'Block L soshanguve', '0713340401', '2024-03-16 21:05:29'),
(11, 3, 'card', '273 stead Ave queenswood', '0713340402', '2024-03-16 21:10:49'),
(12, 6, 'cash', 'polokwane', '07231456978', '2024-07-17 13:29:21'),
(13, 6, 'cash', 'polokwane 123 st', '0712235236', '2024-07-18 07:25:04'),
(14, 6, 'card', 'polokwane 123 st', '0712235236', '2024-07-18 07:25:38'),
(15, 6, 'card', 'proceed to payment', '0158794562', '2024-07-18 07:45:12'),
(16, 6, 'card', '', '', '2024-11-27 06:15:26'),
(17, 6, 'cash', 'gauteng', '+27712345689', '2024-11-27 06:37:02'),
(18, 6, 'card', 'sosha block l', '02266554564', '2024-11-28 11:50:07'),
(19, 1, 'card', '2537 soshanguve block L', '+27711973809', '2024-11-30 06:11:18'),
(20, 1, 'card', '2537 soshanguve block L', '+27711973809', '2024-11-30 06:12:27'),
(21, 9, 'card', '2537 soshanguve block L', '+27711973809', '2024-12-02 07:07:38'),
(22, 9, 'card', '2537 soshanguve block L', '+27711973809', '2024-12-02 08:49:46'),
(23, 9, 'cash', '2537 soshanguve block L', '+27711973809', '2024-12-02 08:50:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'kabelo', 'test@example.com', '123456789', 'visitor'),
(2, 'admin7777', '0604749776kb@gmail.com', '12345678', 'admin'),
(3, 'kabelo', 'test2@example.com', '12345678', 'driver'),
(4, 'kabza', 'kabelodavidnkoane@gmail.com', '1234567891', 'visitor'),
(5, 'kabza', 'kabelodavidnkoane@gmail.com', '1234567891', 'visitor'),
(6, 'kabelo', '0604749776kb@gmail.com', '12345687', 'visitor'),
(9, 'Chabalala Eric', 'chabalalaeric97@gmail.com', '36958888', 'visitor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
