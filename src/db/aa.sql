/*
SQLyog Community Edition- MySQL GUI v6.0 Beta 1
Host - 8.0.15 : Database - myblog
*********************************************************************
Server version : 8.0.15
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `myblog`;

USE `myblog`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `blogs` */

DROP TABLE IF EXISTS `blogs`;

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` longtext,
  `createtime` bigint(20) DEFAULT '0',
  `author` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `blogs` */

insert  into `blogs`(`id`,`title`,`content`,`createtime`,`author`) values (1,'标题A','内容A',1590389826006,'作家A'),(2,'标题B','内容B',1590389826606,'作家B'),(3,'标题c','内容c',1590390237415,'作家c'),(5,'标题d','内容d',1590394612098,'作家d'),(6,'标题d','内容d',1590394736166,'作家d'),(7,'标题d','内容d',1590394808305,'作家d'),(8,'标题d','内容d',1590394827123,'作家d');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `realname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`password`,`realname`) values (1,'xixi','123',NULL),(2,'haha','321',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
