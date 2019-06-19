-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: support_ticket
-- ------------------------------------------------------
-- Server version	10.3.14-MariaDB-1:10.3.14+maria~bionic

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Hardware Problem','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000'),(2,'Software Problem','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000'),(3,'General Problem','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1547919837483,'CreateAdminUser1547919837483'),(2,1558430464990,'CreateRole1558430464990');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priority`
--

DROP TABLE IF EXISTS `priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priority`
--

LOCK TABLES `priority` WRITE;
/*!40000 ALTER TABLE `priority` DISABLE KEYS */;
INSERT INTO `priority` VALUES (1,'Low','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000'),(2,'Medium','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000'),(3,'High','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000'),(4,'Critical','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000');
/*!40000 ALTER TABLE `priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin','administrator'),(2,'Manager','support manager'),(3,'Staff','support staff'),(4,'User','normal user who request ticket');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Open','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000'),(2,'Staff Closed','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000'),(3,'Client Closed','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000'),(4,'Closed','2019-05-22 05:53:09.000000','2019-05-22 05:53:09.000000');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `requesterUserId` int(11) DEFAULT NULL,
  `assignedUserId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `priorityId` int(11) DEFAULT NULL,
  `stateId` int(11) DEFAULT NULL,
  `staffClosed` tinyint(4) DEFAULT NULL,
  `userClosed` tinyint(4) DEFAULT NULL,
  `issueDescription` text NOT NULL,
  `actionDoneDescription` text DEFAULT NULL,
  `ticketNumber` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f8685099711b1d9d24ebad47ac9` (`assignedUserId`),
  KEY `FK_ffa1e18b27ae5dfb0988873354a` (`categoryId`),
  KEY `FK_a2c3063361b25aefc135db65ebd` (`priorityId`),
  KEY `FK_2a6edfd6572d0d7f1809bc93d70` (`stateId`),
  KEY `FK_a9f9e73a3dc1c895161e684fc4e` (`requesterUserId`),
  CONSTRAINT `FK_2a6edfd6572d0d7f1809bc93d70` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a2c3063361b25aefc135db65ebd` FOREIGN KEY (`priorityId`) REFERENCES `priority` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a9f9e73a3dc1c895161e684fc4e` FOREIGN KEY (`requesterUserId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f8685099711b1d9d24ebad47ac9` FOREIGN KEY (`assignedUserId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ffa1e18b27ae5dfb0988873354a` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (6,'CRM Website Down','user@gmail.com','1323123213','2019-06-19 08:53:07.839281','2019-06-19 13:22:51.000000',4,3,2,4,3,0,1,'tidak bisa mengakses website CRM','Melakukan restart pada web server','ST1560934387834');
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2a$08$XzC9dW9f2JQFriUb6hjuK.mRMSd7DAOPwO6iOcDBnEZsQEzjbfUfO','2019-05-22 05:53:09.618951','2019-06-15 05:14:11.000000','Administrator','admin@gmail.com','213131313213'),(2,'manager','$2a$08$XzC9dW9f2JQFriUb6hjuK.mRMSd7DAOPwO6iOcDBnEZsQEzjbfUfO','2019-05-22 05:53:09.618951','2019-06-19 08:18:28.000000','Manager','manager@gmail.com','12312312321'),(3,'staff','$2a$08$XzC9dW9f2JQFriUb6hjuK.mRMSd7DAOPwO6iOcDBnEZsQEzjbfUfO','2019-05-22 05:53:09.618951','2019-06-15 06:04:33.000000','Staff Test','staff@gmail.com','312313213123'),(4,'user','$2a$08$XzC9dW9f2JQFriUb6hjuK.mRMSd7DAOPwO6iOcDBnEZsQEzjbfUfO','2019-05-22 05:53:09.618951','2019-06-15 05:50:48.000000','User Test','user@gmail.com','1323123213'),(16,'agus','$2a$08$psEQSsa4jGsW2QIqlh7W4.fIH0ijhicLvJUtauNJHx29uw5Pida/y','2019-05-28 12:28:07.949563','2019-06-15 06:04:18.000000','Agustian Nugraha','agust@gmail.com','082115879753'),(20,'bagas26','$2a$08$Dli170FVKtvoJjDUaTkVgOpAQhGz7SWei7JguJOiaE8ctGrxWJW0G','2019-05-30 23:51:31.034110','2019-06-15 13:02:40.000000','Bagas Anggara','bagas@gmail.com','082115879753');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles_role`
--

DROP TABLE IF EXISTS `user_roles_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles_role` (
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `IDX_5f9286e6c25594c6b88c108db7` (`userId`),
  KEY `IDX_4be2f7adf862634f5f803d246b` (`roleId`),
  CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles_role`
--

LOCK TABLES `user_roles_role` WRITE;
/*!40000 ALTER TABLE `user_roles_role` DISABLE KEYS */;
INSERT INTO `user_roles_role` VALUES (1,1),(2,2),(3,3),(4,4),(16,3),(20,4);
/*!40000 ALTER TABLE `user_roles_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 20:45:56
