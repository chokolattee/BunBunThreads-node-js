-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2025 at 04:41 PM
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
-- Database: `db_bunbun`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

ALTER TABLE `category` AUTO_INCREMENT = 1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `title` char(8) NOT NULL,
  `fname` varchar(32) DEFAULT NULL,
  `lname` varchar(32) NOT NULL,
  `addressline` text DEFAULT NULL,
  `town` varchar(32) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `title`, `fname`, `lname`, `addressline`, `town`, `phone`, `user_id`, `image_path`) VALUES
(1, '', 'Birdie', 'Tremblay', 'Sta. Ana, Pateros', 'Pateros', '09160310774', 3, ''),
(2, '', 'Sonny', 'Rodriguez', 'Ayala Avenue, Makati', 'Makati', '09119280177', 4, ''),
(3, '', 'Blaise', 'Johns', 'Ayala Avenue, Makati', 'Makati', '09345050158', 5, ''),
(4, '', 'Daphney', 'Hartmann', 'Alabang, Muntinlupa', 'Muntinlupa', '09905737690', 6, ''),
(5, '', 'Muriel', 'McGlynn', 'Alabang, Muntinlupa', 'Muntinlupa', '09913615735', 7, ''),
(6, '', 'Jules', 'Predovic', 'Alabang, Muntinlupa', 'Muntinlupa', '09172794990', 8, ''),
(7, '', 'Izabella', 'Weber', 'Ninoy Aquino International Airport, Pasay', 'Pasay', '09583725114', 9, ''),
(8, '', 'Evie', 'Wuckert', 'Bonifacio Global City, Taguig', 'Taguig', '09103266715', 10, ''),
(9, '', 'Jameson', 'Walter', 'Ayala Avenue, Makati', 'Makati', '09449567887', 11, ''),
(10, '', 'Deangelo', 'Heidenreich', 'Ayala Avenue, Makati', 'Makati', '09774135192', 12, ''),
(11, '', 'Lon', 'Weissnat', 'Ayala Avenue, Makati', 'Makati', '09113799553', 13, ''),
(12, '', 'Carson', 'Jacobson', 'Ayala Avenue, Makati', 'Makati', '09417523585', 14, ''),
(13, '', 'Federico', 'Kemmer', 'Ninoy Aquino International Airport, Pasay', 'Pasay', '09913647838', 15, ''),
(14, '', 'Freddie', 'Rogahn', 'Sta. Ana, Pateros', 'Pateros', '09052436905', 16, ''),
(15, '', 'Zella', 'Baumbach', 'Ayala Avenue, Makati', 'Makati', '09790573661', 17, ''),
(16, '', 'Marilyne', 'Mills', 'Alabang-Zapote Road, Las Pinas', 'Las Pinas', '09012769008', 18, ''),
(17, '', 'Arielle', 'Smitham', 'Bonifacio Global City, Taguig', 'Taguig', '09701181492', 19, ''),
(18, '', 'Jonathan', 'Volkman', 'Alabang-Zapote Road, Las Pinas', 'Las Pinas', '09002427047', 20, ''),
(19, '', 'Lorenzo', 'Rice', 'Alabang, Muntinlupa', 'Muntinlupa', '09521168772', 21, ''),
(20, '', 'Annie', 'Casper', 'Bonifacio Global City, Taguig', 'Taguig', '09118004323', 22, ''),
(21, '', 'Gay', 'Koelpin', 'Alabang-Zapote Road, Las Pinas', 'Las Pinas', '09978714179', 23, ''),
(22, '', 'Natalie', 'Franecki', 'Ayala Avenue, Makati', 'Makati', '09514872710', 24, ''),
(23, '', 'Korbin', 'Greenholt', 'Alabang-Zapote Road, Las Pinas', 'Las Pinas', '09813234690', 25, ''),
(24, '', 'Shyann', 'Ritchie', 'Sta. Ana, Pateros', 'Pateros', '09992446006', 26, ''),
(25, '', 'Macie', 'Ritchie', 'Sta. Ana, Pateros', 'Pateros', '09542610648', 27, ''),
(26, '', 'Sharwin John', 'Marbella', 'Triumph, Central Signal', 'Taguig', '09123456789', 31, ''),
(27, '', 'Erica Shelley', 'Peque', 'Triumph, North Signal', 'Taguig', '09123456789', 32, ''),
(29, '', 'Kimberly', 'Eledia', 'Waltermart, Tanyag', 'Tanyag', '09123456787', 34, ''),
(30, '', 'Kath', 'Priol', 'Diego Silang, Taguig', 'Taguig City', '09218255596', 35, ''),
(31, '', 'Maria Kimberly', 'Labi-labi', 'Western Bicutan, Taguig', 'Taguig City', '09218255596', 36, ''),
(32, '', 'Hanna', 'Cruz', 'Paranaque', 'Taguig', '09123456789', 37, ''),
(33, 'Mrs.', 'Test1', 'Testing', 'Triumph, Central Signal', 'Taguig', '09123456789', 39, 'images/176d8ffd9ca88ad46d895dca07e8297b-1752143278753-79584913.jpg'),
(36, 'Ms.', 'Kath', 'Priol', 'Diego Silang, Taguig', 'Taguig City', '09218255596', 38, 'images/Screenshot 2025-04-28 085549-1752290166486-809879738.png'),
(40, 'Mrs.', 'Kath', 'Priol', 'Diego Silang, Taguig', 'Taguig City', '09218255596', 40, 'images/Screenshot 2025-04-28 085549-1752329927363-927841580.png'),
(41, 'Mr.', 'Test1', 'Testing', 'Triumph, Central Signal', 'Taguig', '09123456789', 42, 'images/Screenshot 2025-04-28 143947-1752406814966-257155871.png');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `cost_price` decimal(7,2) NOT NULL,
  `sell_price` decimal(7,2) NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

ALTER TABLE `item` AUTO_INCREMENT = 1;

-- --------------------------------------------------------

--
-- Table structure for table `item_images`
--

CREATE TABLE `item_images` (
  `itemimg_id` bigint(20) UNSIGNED NOT NULL,
  `item_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `item_images`
--

ALTER TABLE `item_images` AUTO_INCREMENT = 1;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2014_10_12_100000_create_password_resets_table', 2),
(6, '2025_03_06_122119_add_user_id_to_customer', 2),
(7, '2025_03_06_123712_add_role_to_users', 3),
(8, '2025_03_06_124148_add_item_name_to_item', 4),
(9, '2025_03_06_124606_create_category_table', 5),
(11, '2025_03_06_124928_add_category_id_to_item', 6),
(12, '2025_03_06_133430_add_category_id_to_item', 7),
(18, '2025_03_08_005217_add_image_to_item', 8),
(19, '2025_03_08_090219_add_profile_image_to_users', 9),
(21, '2025_03_08_134008_add_status_to_orderinfo', 10),
(22, '2025_03_08_134723_create_shipping_table', 11),
(25, '2025_03_08_135537_add_shipping_id_to_orderinfo', 12),
(26, '2025_03_16_031559_create_item_images_table', 13),
(27, '2025_03_18_131552_add_status_to_users', 14),
(28, '2025_03_18_142417_add_soft_deletes_to_item_images_table', 15),
(29, '2025_03_21_015552_add_date_delivered_to_orderinfo', 16),
(36, '2025_03_21_025353_create_reviews_table', 17),
(37, '2025_03_21_050137_create_review_images_table', 17),
(38, '2025_03_25_035102_add_soft_deletes_to_category_table', 18);

-- --------------------------------------------------------

--
-- Table structure for table `orderinfo`
--

CREATE TABLE `orderinfo` (
  `orderinfo_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `date_placed` datetime NOT NULL,
  `date_shipped` datetime DEFAULT NULL,
  `date_delivered` datetime DEFAULT NULL,
  `shipping_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('Pending','Shipped','Delivered','Cancelled') NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderinfo`
--

ALTER TABLE `orderinfo` AUTO_INCREMENT = 1;

-- --------------------------------------------------------

--
-- Table structure for table `orderline`
--

CREATE TABLE `orderline` (
  `orderinfo_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` tinyint(4) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderline`
--

ALTER TABLE `orderline` AUTO_INCREMENT = 1;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` bigint(20) UNSIGNED NOT NULL,
  `orderinfo_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `review_text` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

ALTER TABLE `reviews` AUTO_INCREMENT = 1;

-- --------------------------------------------------------

--
-- Table structure for table `review_images`
--

CREATE TABLE `review_images` (
  `reviewimg_id` bigint(20) UNSIGNED NOT NULL,
  `review_id` bigint(20) UNSIGNED NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `review_images`
--

ALTER TABLE `review_images` AUTO_INCREMENT = 1;

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `shipping_id` bigint(20) UNSIGNED NOT NULL,
  `region` varchar(255) NOT NULL,
  `rate` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shipping`
--

INSERT INTO `shipping` (`shipping_id`, `region`, `rate`, `created_at`, `updated_at`) VALUES
(1, 'Within Metro Manila', 50.00, NULL, NULL),
(2, 'Luzon (Outside Metro Manila)', 70.00, NULL, NULL),
(3, 'Visayas', 90.00, NULL, NULL),
(4, 'Mindanao', 110.00, NULL, NULL),
(5, 'Overseas', 200.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `item_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

ALTER TABLE `stock` AUTO_INCREMENT = 1;
-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('User','Admin') NOT NULL,
  `status` enum('Active','Deactivated') NOT NULL DEFAULT 'Active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`, `status`, `deleted_at`, `token`) VALUES
(1, 'Elisabeth Runolfsson', 'elisabeth.runolfsson@gmail.com', NULL, '$2y$10$vo7CgJYBPzhWm6pRT9HQPOdwkR/CImVHj/zbz.BGUYcqZwJ51AfKy', NULL, '2025-03-06 04:19:49', '2025-07-11 11:53:39', 'Admin', 'Active', NULL, NULL),
(2, 'Ines Schmidt', 'ines.schmidt@gmail.com', NULL, '$2y$10$UvNrmYWHu2i9Yq41jNK9QuiIonpQugSPMhukTF6m2wIDVcU2otAsC', NULL, '2025-03-06 04:22:05', '2025-03-06 04:22:05', 'User', 'Active', NULL, NULL),
(3, 'Birdie Tremblay', 'birdie.tremblay@gmail.com', NULL, '$2y$10$Z4CMxromo3/je2CKGD.PfuJ6jcYjiyKfZX58tdCKSTsZ5bFgw7MCK', NULL, '2025-03-06 04:22:35', '2025-03-18 06:02:50', 'Admin', 'Deactivated', NULL, NULL),
(4, 'Sonny Rodriguez', 'sonny.rodriguez@gmail.com', NULL, '$2y$10$4eWtuRm2Nsg5uz.NclqxjeMBHEZOLKK2vvCR3k4MeBehO0do0M2NS', NULL, '2025-03-06 04:22:35', '2025-03-06 04:22:35', 'User', 'Active', NULL, NULL),
(5, 'Blaise Johns', 'blaise.johns@gmail.com', NULL, '$2y$10$0i.6qGRukiLYBBCqtvYbOu4EAx7a5EeWP8mqmexoDrrTd/e4rgRci', NULL, '2025-03-06 04:22:35', '2025-03-06 04:22:35', 'User', 'Active', NULL, NULL),
(6, 'Daphney Hartmann', 'daphney.hartmann@gmail.com', NULL, '$2y$10$L1/lgy1AQXjaAvA49eQSxOhmMzhtFg9jgkMs.nCmztWCdhCiji77y', NULL, '2025-03-06 04:22:35', '2025-03-06 04:22:35', 'User', 'Active', NULL, NULL),
(7, 'Muriel McGlynn', 'muriel.mcglynn@gmail.com', NULL, '$2y$10$8mIRmXhLOiH/pS9Gw4NUc.lGtHeyHZIqDHqz3BJmY53DkWSmtMcda', NULL, '2025-03-06 04:22:36', '2025-03-06 04:22:36', 'User', 'Active', NULL, NULL),
(8, 'Jules Predovic', 'jules.predovic@gmail.com', NULL, '$2y$10$u0TBd1hDLwx67mfWM8oAseWJVg5G9vv5/EbQYHrIjfUwz61lemAHK', NULL, '2025-03-06 04:22:36', '2025-03-06 04:22:36', 'User', 'Active', NULL, NULL),
(9, 'Izabella Weber', 'izabella.weber@gmail.com', NULL, '$2y$10$k9oEFeLcVAsC9karFq38VeHQ8c5Espse/hAg0Gc/nk53ttpV3uEca', NULL, '2025-03-06 04:22:36', '2025-03-06 04:22:36', 'User', 'Active', NULL, NULL),
(10, 'Evie Wuckert', 'evie.wuckert@gmail.com', NULL, '$2y$10$p5UOYsuxMDgc9FHl4Re2VuNjBeCpJ5OAKq/IbX4k.5L6qAmWIT1Nu', NULL, '2025-03-06 04:22:36', '2025-07-16 03:11:21', 'Admin', 'Deactivated', NULL, NULL),
(11, 'Jameson Walter', 'jameson.walter@gmail.com', NULL, '$2y$10$ssPIe/FnMRSQdPRYJwiR8Oc36BD.OIi8/FFOc9AP7PBu51tkxUFCS', NULL, '2025-03-06 04:22:36', '2025-03-06 04:22:36', 'User', 'Active', NULL, NULL),
(12, 'Deangelo Heidenreich', 'deangelo.heidenreich@gmail.com', NULL, '$2y$10$vZASCQiivPv7LMnGUtIAxepWLDGsNPSg2PbC2LCmmGsLfRV3ookle', NULL, '2025-03-06 04:22:36', '2025-03-06 04:22:36', 'User', 'Active', NULL, NULL),
(13, 'Lon Weissnat', 'lon.weissnat@gmail.com', NULL, '$2y$10$DMc6DpLiBdZ130DlfyBxde6Kswvrvbd3r4xO4R77/Dc1AGF7MyWqu', NULL, '2025-03-06 04:22:37', '2025-03-06 04:22:37', 'User', 'Active', NULL, NULL),
(14, 'Carson Jacobson', 'carson.jacobson@gmail.com', NULL, '$2y$10$bMPbJxNx4Dng4mC2c6VFkedtkOL4klHXWbQ5ypEWSFhZ5KJ4Fc0NO', NULL, '2025-03-06 04:22:37', '2025-03-06 04:22:37', 'User', 'Active', NULL, NULL),
(15, 'Federico Kemmer', 'federico.kemmer@gmail.com', NULL, '$2y$10$6JpjeKwG3KqqIK0w.K5/I.gEVDZb3e89MmZqgDH0MSfZliShwhJ4e', NULL, '2025-03-06 04:22:37', '2025-03-06 04:22:37', 'User', 'Active', NULL, NULL),
(16, 'Freddie Rogahn', 'freddie.rogahn@gmail.com', NULL, '$2y$10$YpUt4JZFdAueTvTqIXFcH.4C7L2qDzE4.xasn4497t/QaR5A52FzK', NULL, '2025-03-06 04:22:37', '2025-03-06 04:22:37', 'User', 'Active', NULL, NULL),
(17, 'Zella Baumbach', 'zella.baumbach@gmail.com', NULL, '$2y$10$7bgBhc0N2smo1ZWyUFTaFOPa3fUFJFaviBOSLFR2IZXI/qjxnvXL6', NULL, '2025-03-06 04:22:37', '2025-03-30 04:49:29', 'Admin', 'Active', NULL, NULL),
(18, 'Marilyne Mills', 'marilyne.mills@gmail.com', NULL, '$2y$10$wMQTh7jo6gOZSGrjNMOjcOHTPjJBot4YskBo.VOO5BiWhDogmx5EC', NULL, '2025-03-06 04:22:37', '2025-03-06 04:22:37', 'User', 'Active', NULL, NULL),
(19, 'Arielle Smitham', 'arielle.smitham@gmail.com', NULL, '$2y$10$SoSqsGyJ5wfdVInQgh7fEujr7OK63bttF4ntgLY.7hDsAbrPkEcvi', NULL, '2025-03-06 04:22:38', '2025-03-06 04:22:38', 'User', 'Active', NULL, NULL),
(20, 'Jonathan Volkman', 'jonathan.volkman@gmail.com', NULL, '$2y$10$0dwwTti6Nyl145JJ2w/wfuDl5cHTT5rTO8CUuC1lT3nRpumJdHyn2', NULL, '2025-03-06 04:22:38', '2025-03-06 04:22:38', 'User', 'Active', NULL, NULL),
(21, 'Lorenzo Rice', 'lorenzo.rice@gmail.com', NULL, '$2y$10$Lv31ZZBFtWRxYWzNrqrPlu3fZgPY5.4UOPhvjX4F0ZWuzIL9qHwpy', NULL, '2025-03-06 04:22:38', '2025-03-06 04:22:38', 'User', 'Active', NULL, NULL),
(22, 'Annie Casper', 'annie.casper@gmail.com', NULL, '$2y$10$l9z7RVMyYRSrDlGWGILaq.D64hifjVg0nfLAGoabxX9gLWkpI.eIS', NULL, '2025-03-06 04:22:38', '2025-03-06 04:22:38', 'User', 'Active', NULL, NULL),
(23, 'Gay Koelpin', 'gay.koelpin@gmail.com', NULL, '$2y$10$FXjZKbByVjMEatkLLsZzF.A2NP7XK3i83rUgn2.pijGqbxHeqkozi', NULL, '2025-03-06 04:22:38', '2025-03-06 04:22:38', 'User', 'Active', NULL, NULL),
(24, 'Natalie Franecki', 'natalie.franecki@gmail.com', NULL, '$2y$10$YclnDFELuW6RJUUj0WPFNO4BsbSvfqYc/dwWl/fXC6YZCB8HruIQq', NULL, '2025-03-06 04:22:38', '2025-03-06 04:22:38', 'User', 'Active', NULL, NULL),
(25, 'Korbin Greenholt', 'korbin.greenholt@gmail.com', NULL, '$2y$10$gUQkDdsHiMCA83nsldM7KuhImATVR6yE1uJL8TX3lSSdJE0nxSEj6', NULL, '2025-03-06 04:22:39', '2025-03-06 04:22:39', 'User', 'Active', NULL, NULL),
(26, 'Shyann Ritchie', 'shyann.ritchie@gmail.com', NULL, '$2y$10$c41W3SkN8z0odk6d/9ze0.bMWLgntED8ORdiyN6BMk1SJmYn2L1Ty', NULL, '2025-03-06 04:22:39', '2025-03-06 04:22:39', 'User', 'Active', NULL, NULL),
(27, 'Macie Ritchie', 'macie.ritchie@gmail.com', NULL, '$2y$10$CH.mHNmsWIQ1HT68yAvJqufu4SBSznSBhfkd3MKViCvH4zS6Ha6qa', NULL, '2025-03-06 04:22:39', '2025-03-06 04:22:39', 'User', 'Active', NULL, NULL),
(31, 'Sharwin John Marbella', 'shar@gmail.com', NULL, '$2y$10$kEXpl8hysy962yZC0tCU5u2S49b0xoumTOuK9.yrf39aD.WPSSEjS', NULL, '2025-03-08 04:39:06', '2025-03-08 04:39:06', 'Admin', 'Active', NULL, NULL),
(32, 'Erica Shelley Peque', 'erica@gmail.com', NULL, '$2y$10$it2NPg3.oSdffOdVsaWiBOy7YGMaBT1EKRTnnfwlT0yn07WUUGLrS', NULL, '2025-03-08 04:45:17', '2025-03-08 05:06:17', 'User', 'Active', NULL, NULL),
(34, 'Kimberly Eledia', 'kimyeledia@gmail.com', '2025-03-18 04:46:37', '$2y$10$bkRwibstl4.iptDeZacV0uZ1Mc2QWe1fKTL6FKWeSEe3Syvkm4uY6', NULL, '2025-03-18 04:42:26', '2025-03-18 04:46:37', 'User', 'Active', NULL, NULL),
(35, 'Kath Priol', 'kath@gmail.com', NULL, '$2y$10$nf.nimhgp0XjoYf.a0laS.0FDdNh/yUSFIbXwiNsplZl8ZCr/i9.e', NULL, '2025-03-29 21:43:00', '2025-03-29 21:43:00', 'User', 'Active', NULL, NULL),
(36, 'Maria Kimberly Labi-labi', 'emkim@gmail.com', '2025-03-29 21:54:03', '$2y$10$WRgwXqMttOsz9/vq3iZ1G.62Epb/spwQ1TpOp5mIsjneXm9VoSsQu', NULL, '2025-03-29 21:53:39', '2025-03-29 21:54:03', 'User', 'Active', NULL, NULL),
(37, 'Hanna Cruz', 'hanna@gmail.com', '2025-03-31 04:07:03', '$2y$10$JtUnDdjjfiMkqxDRJ8Q.d.2UQRJU8tGQpbtfho2vuZV1mihylyL8a', NULL, '2025-03-31 04:05:39', '2025-03-31 04:07:03', 'User', 'Active', NULL, NULL),
(38, 'Test Testing', 'test1@gmail.com', NULL, '$2b$10$vfFKon56YELEkuATSMJEz.vWowsbLEeLMYVmLy3DLfh.hvUbKI24a', NULL, NULL, NULL, 'Admin', 'Active', '0000-00-00 00:00:00', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzUyODQ1NjcxLCJleHAiOjE3NTI5MzIwNzF9.dYU3_rnXDnFYYjBW6OQrfWD_IRtHpFaNKo9NDbcZU58'),
(39, 'Test2 Testing2', 'test2@gmail.com', NULL, '$2b$10$yw5JqNWgjQptSkICqljAPesguAtAz9YruUlWkqN0ejAfulOYrnt6u', NULL, '2025-07-10 08:18:52', NULL, 'User', 'Active', '2025-07-16 04:22:02', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImVtYWlsIjoidGVzdDJAZ21haWwuY29tIiwiaWF0IjoxNzUyNjQwNTMzLCJleHAiOjE3NTI3MjY5MzN9.hIv29InTWH_8fWf8a4JUBw4Zl_RWItAOdSPJg7Ue86E'),
(40, 'Test3 Testing3', 'test3@gmail.com', NULL, '$2b$10$msk6e9WV4X1jMMovKhnvQew3Ve6qY2vc80iPrvDCUjcJ4f3D3xYIO', NULL, '2025-07-12 14:17:30', '2025-07-16 07:42:54', 'User', 'Active', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE3NTI4MzUzMzcsImV4cCI6MTc1MjkyMTczN30.aDazaat5CilaKp_RYW6Ql9vsK4DuZZdpIpwaUqLO9Ek'),
(41, 'Test4 Testing', 'test4@gmail.com', NULL, '$2b$10$RXkyuPgk.JSLsGPLTTe5jeTury6UZKgEecPETbsx04ga6uzaxfZLy', NULL, NULL, NULL, 'User', 'Active', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoidGVzdDRAZ21haWwuY29tIiwiaWF0IjoxNzUyNzY1NjMzLCJleHAiOjE3NTI4NTIwMzN9.OWEMW0ldt4Z9AnR5XOUFX002QXOFqHA7sQmCreFE-OU'),
(42, 'Account Confirmation', 'test5@gmail.com', NULL, '$2b$10$dLaoetEi.Fv9kG1UN2eFkOznrfkIiga5vzKj4kMFJaBrEU3Vi/tOi', NULL, NULL, '2025-07-18 08:03:55', 'Admin', 'Active', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTc1MjQwNjczNH0.ZKsPAdqx-POJ1GnhHmLHbwosy_t5g0wicIJa8281Uu8'),
(43, 'Mary Pauline Calungsod', 'test6@gmail.com', NULL, '$2b$10$Rqqocgh6rh8yFbXzt.Hv2OWXNsjUFAPAwvtypT7tQtable4CiS446', NULL, NULL, NULL, 'Admin', 'Active', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImVtYWlsIjoidGVzdDZAZ21haWwuY29tIiwiaWF0IjoxNzUyNzY1NTkyLCJleHAiOjE3NTI4NTE5OTJ9.wTZ6jWJe8hhGBD93PgK5v_czgfrq9_vlbJBQcehf_C4'),
(44, 'Admin testing', 'admin@gmail.com', NULL, '$2b$10$sFb0lja4F3yYGnli7Z.guOyzj49lTkbhTZJ44u6fIe7OW1Td4eVN6', NULL, NULL, NULL, 'Admin', 'Active', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `customer_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `item_category_id_foreign` (`category_id`);

--
-- Indexes for table `item_images`
--
ALTER TABLE `item_images`
  ADD PRIMARY KEY (`itemimg_id`),
  ADD KEY `item_images_item_id_foreign` (`item_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderinfo`
--
ALTER TABLE `orderinfo`
  ADD PRIMARY KEY (`orderinfo_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `orderinfo_shipping_id_foreign` (`shipping_id`);

--
-- Indexes for table `orderline`
--
ALTER TABLE `orderline`
  ADD PRIMARY KEY (`orderinfo_id`,`item_id`),
  ADD KEY `item_item_id_fk` (`item_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD UNIQUE KEY `reviews_customer_id_item_id_unique` (`customer_id`,`item_id`),
  ADD KEY `reviews_orderinfo_id_foreign` (`orderinfo_id`),
  ADD KEY `reviews_item_id_foreign` (`item_id`);

--
-- Indexes for table `review_images`
--
ALTER TABLE `review_images`
  ADD PRIMARY KEY (`reviewimg_id`),
  ADD KEY `review_images_review_id_foreign` (`review_id`);

--
-- Indexes for table `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`shipping_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `item_images`
--
ALTER TABLE `item_images`
  MODIFY `itemimg_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `orderinfo`
--
ALTER TABLE `orderinfo`
  MODIFY `orderinfo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `review_images`
--
ALTER TABLE `review_images`
  MODIFY `reviewimg_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `shipping`
--
ALTER TABLE `shipping`
  MODIFY `shipping_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `item_images`
--
ALTER TABLE `item_images`
  ADD CONSTRAINT `item_images_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE;

--
-- Constraints for table `orderinfo`
--
ALTER TABLE `orderinfo`
  ADD CONSTRAINT `orderinfo_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderinfo_shipping_id_foreign` FOREIGN KEY (`shipping_id`) REFERENCES `shipping` (`shipping_id`) ON DELETE CASCADE;

--
-- Constraints for table `orderline`
--
ALTER TABLE `orderline`
  ADD CONSTRAINT `orderline_orderinfo_id_fk` FOREIGN KEY (`orderinfo_id`) REFERENCES `orderinfo` (`orderinfo_id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_orderinfo_id_foreign` FOREIGN KEY (`orderinfo_id`) REFERENCES `orderinfo` (`orderinfo_id`) ON DELETE CASCADE;

--
-- Constraints for table `review_images`
--
ALTER TABLE `review_images`
  ADD CONSTRAINT `review_images_review_id_foreign` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`) ON DELETE CASCADE;

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
