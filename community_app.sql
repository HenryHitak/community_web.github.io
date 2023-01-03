-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-01-03 02:26
-- 서버 버전: 10.4.21-MariaDB
-- PHP 버전: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `community_app`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `comment_tb`
--

CREATE TABLE `comment_tb` (
  `comment_id` int(250) NOT NULL,
  `post_id` int(250) NOT NULL,
  `user_id` int(250) NOT NULL,
  `comment` text NOT NULL,
  `c_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 테이블 구조 `community_tb`
--

CREATE TABLE `community_tb` (
  `post_id` int(250) NOT NULL,
  `title` varchar(250) NOT NULL,
  `user_id` int(255) NOT NULL,
  `post_time` datetime NOT NULL,
  `category` text NOT NULL,
  `contents` longtext NOT NULL,
  `img` text NOT NULL,
  `location` varchar(100) NOT NULL,
  `price` int(100) NOT NULL,
  `view` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `community_tb`
--

INSERT INTO `community_tb` (`post_id`, `title`, `user_id`, `post_time`, `category`, `contents`, `img`, `location`, `price`, `view`) VALUES
(1, 'test', 2, '2022-12-22 00:00:00', '', 'test', '', '123123', 0, 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `job_tb`
--

CREATE TABLE `job_tb` (
  `post_id` int(250) NOT NULL,
  `title` text NOT NULL,
  `user_id` int(250) NOT NULL,
  `post_time` datetime NOT NULL,
  `company_name` text NOT NULL,
  `location` text NOT NULL,
  `salary` float NOT NULL,
  `job_type` text NOT NULL,
  `details` text NOT NULL,
  `apply_type` text NOT NULL,
  `benefits` text NOT NULL,
  `view` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `job_tb`
--

INSERT INTO `job_tb` (`post_id`, `title`, `user_id`, `post_time`, `company_name`, `location`, `salary`, `job_type`, `details`, `apply_type`, `benefits`, `view`) VALUES
(20001, 'job test 1', 2, '2023-01-03 00:33:08', 'test', 'test', 20000, 'test', 'test', 'test', 'test', 1),
(20002, 'job test 2', 2, '2023-01-03 00:33:08', 'test', 'test', 20000, 'test', 'test', 'test', 'test', 1),
(20003, 'job test 3', 12, '2023-01-03 00:33:08', 'test', 'test', 20000, 'test', 'test', 'test', 'test', 1),
(20004, 'job test 4', 12, '2023-01-03 00:33:08', 'test', 'test', 20000, 'test', 'test', 'test', 'test', 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `market_td`
--

CREATE TABLE `market_td` (
  `post_id` int(250) NOT NULL,
  `title` text NOT NULL,
  `user_id` int(250) NOT NULL,
  `post_time` datetime NOT NULL,
  `price` int(250) NOT NULL,
  `details` text NOT NULL,
  `condition` text NOT NULL,
  `location` text NOT NULL,
  `view` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `market_td`
--

INSERT INTO `market_td` (`post_id`, `title`, `user_id`, `post_time`, `price`, `details`, `condition`, `location`, `view`) VALUES
(30001, 'market test 1', 12, '2023-01-03 00:30:30', 300, 'test', 'test', 'test', 0),
(30002, 'market test 3', 2, '2023-01-03 00:30:30', 300, 'test', 'test', 'test', 0),
(30003, 'market test 2', 12, '2023-01-03 00:30:30', 300, 'test', 'test', 'test', 0),
(30004, 'market test 5', 12, '2023-01-03 00:30:30', 300, 'test', 'test', 'test', 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `user_tb`
--

CREATE TABLE `user_tb` (
  `user_id` int(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `firstname` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(250) NOT NULL,
  `img` varchar(200) DEFAULT './user_default.png',
  `role` varchar(250) NOT NULL DEFAULT 'user',
  `join_date` date DEFAULT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'activate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `user_tb`
--

INSERT INTO `user_tb` (`user_id`, `email`, `password`, `firstname`, `lastname`, `dob`, `gender`, `img`, `role`, `join_date`, `status`) VALUES
(2, 'alyce@tamwood.com', '1234', 'Alyce', 'Huang', '2022-10-24', 'F', NULL, 'user', NULL, 'Blocked'),
(3, 'wunyu@tamwood.com', '1234', 'WunYu', 'Huang', '2022-10-25', 'N', NULL, 'user', NULL, 'active'),
(6, 'test@tamwood.com', '1234', 'WunYu', 'Huang', '2022-10-24', 'N', NULL, 'user', NULL, 'active'),
(10, 'wunyuaa@tamwood.com', '$2b$10$N2rHI8xItFgvEOMGvdSwCOk.B0rWI.GWz78mioYVrjAseI7cXGZly', 'Alyceee', 'Huanggg', '2022-11-01', 'F', './user_default.png', 'user', NULL, 'active'),
(11, 'testtt@tamwood.com', '$2b$10$COx5FX1RIMaLH7Fy1nrSSeWAAAxoM1YcyAX0wiFxdRRxB.s72Wz1G', 'Test', 'Test', '2022-11-01', 'N', './user_default.png', 'user', NULL, 'active'),
(12, 'nak@test.com', '$2b$10$hxlj6XbJSUYkHEcHwi/93e/mzI3oUbW2MwO./mceJxrsYtVlO05UO', 'Nakhyeon', 'kim', '2022-12-08', 'M', './user_default.png', 'admin', NULL, 'active'),
(14, 'test1@tamwood.com', '$2b$10$DsDDWO5kFH8xcD6LGPgoAeqS5ZrX9ouioacYsMWdUjzMuXReed6ai', 'Alyce', 'HH', '2022-12-22', 'N', './user_default.png', 'admin', NULL, 'active'),
(15, 'test2@tamwood.com', '$2b$10$8/Ze2PAk5t7KkkASbS4KSed4eOMvPTSd6IJf9aR/4vEkxC8a1SLEW', 'AA', 'HHH', '2022-12-22', 'F', './user_default.png', 'user', NULL, 'active'),
(16, 'test3@tamwood.com', '$2b$10$EiDqgNLNqfT0HWNyBwt4JuCxEEG/.sUJ90.XAXBJCz8i47ZG/cqyi', 'WW', 'HH', '2022-12-22', 'M', './user_default.png', 'user', '2022-12-23', 'active'),
(18, 'test4@tamwood.com', '$2b$10$pVhZccvpSoLkJuE4hFBxs.6g0rp1EIohdNDldMWt2kW8Fjcy.4vpO', 'Aly', 'Hua', '2022-12-25', 'F', './user_default.png', 'user', '2022-12-26', 'active'),
(31, 'test6@tamwood.com', '$2b$10$7hORlpftoEHIDeWxBRYBJep0sSufdKjp/v1y/x1hBkGClemJyNh8i', 'AA', 'SS', '2022-12-27', 'N', './user_default.png', 'user', '2023-01-01', 'active'),
(32, 'test7@tamwood.com', '$2b$10$BJUMxASIu74XULrCSrlMzu/sYYGP1vXHTx.MEpyDwcK4R6z6Q4yUm', 'AAA', 'SSS', '2023-01-01', 'F', './user_default.png', 'user', '2023-01-01', 'active'),
(33, 'test8@tamwood.com', '$2b$10$TCekGHgO4L6Yuyr8eT0pS.uFiYj63G08.DSZOgArrqoCW5S7uoZT2', 'AAA', 'SS', '2022-12-27', 'N', './user_default.png', 'admin', '2023-01-01', 'active');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `comment_tb`
--
ALTER TABLE `comment_tb`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_c` (`user_id`),
  ADD KEY `post_j` (`post_id`);

--
-- 테이블의 인덱스 `community_tb`
--
ALTER TABLE `community_tb`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post` (`user_id`);

--
-- 테이블의 인덱스 `job_tb`
--
ALTER TABLE `job_tb`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user` (`user_id`);

--
-- 테이블의 인덱스 `market_td`
--
ALTER TABLE `market_td`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_m` (`user_id`);

--
-- 테이블의 인덱스 `user_tb`
--
ALTER TABLE `user_tb`
  ADD PRIMARY KEY (`user_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `comment_tb`
--
ALTER TABLE `comment_tb`
  MODIFY `comment_id` int(250) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `community_tb`
--
ALTER TABLE `community_tb`
  MODIFY `post_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 테이블의 AUTO_INCREMENT `job_tb`
--
ALTER TABLE `job_tb`
  MODIFY `post_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20005;

--
-- 테이블의 AUTO_INCREMENT `market_td`
--
ALTER TABLE `market_td`
  MODIFY `post_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30005;

--
-- 테이블의 AUTO_INCREMENT `user_tb`
--
ALTER TABLE `user_tb`
  MODIFY `user_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `comment_tb`
--
ALTER TABLE `comment_tb`
  ADD CONSTRAINT `post_c` FOREIGN KEY (`post_id`) REFERENCES `community_tb` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_j` FOREIGN KEY (`post_id`) REFERENCES `job_tb` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_m` FOREIGN KEY (`post_id`) REFERENCES `market_td` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_c` FOREIGN KEY (`user_id`) REFERENCES `user_tb` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `community_tb`
--
ALTER TABLE `community_tb`
  ADD CONSTRAINT `post` FOREIGN KEY (`user_id`) REFERENCES `user_tb` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `job_tb`
--
ALTER TABLE `job_tb`
  ADD CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `user_tb` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `market_td`
--
ALTER TABLE `market_td`
  ADD CONSTRAINT `user_m` FOREIGN KEY (`user_id`) REFERENCES `user_tb` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
