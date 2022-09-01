CREATE DATABASE test;
use test;

CREATE TABLE `user` (
  `userId` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `lastActiveDate` timestamp NOT NULL,
  `createdIP` varchar(255) DEFAULT NULL,
  `lastActiveIP` varchar(255) DEFAULT NULL,
  `isDeletd` varchar(10) DEFAULT 'false',
  `userRole` varchar(255) NOT NULL,
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
