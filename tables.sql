CREATE DATABASE test;
use test;

CREATE TABLE `user` (
  `userId` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `lastActiveDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdIP` varchar(255) DEFAULT NULL,
  `lastActiveIP` varchar(255) DEFAULT NULL,
  `isDeletd` varchar(10) DEFAULT 'false',
  `userRole` varchar(255) NOT NULL,
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `firstname` varchar(225) DEFAULT NULL,
  `lastname` varchar(225) DEFAULT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'false',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `group` (
  `groupId` varchar(225) NOT NULL,
  `groupLevel` varchar(225) DEFAULT 'null',
  `groupName` varchar(225) NOT NULL,
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usergroup` (
  `usergroupId` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(225) DEFAULT NULL,
  `groupId` varchar(225) NOT NULL,
  PRIMARY KEY (`usergroupId`),
  KEY `groupId_idx` (`groupId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `groupId` FOREIGN KEY (`groupId`) REFERENCES `group` (`groupId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
