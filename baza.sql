-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `answer` (
  `question_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `survey_test_id` int(11) NOT NULL,
  `answers` varchar(255) NOT NULL,
  `won_points` float DEFAULT NULL,
  PRIMARY KEY (`question_id`,`username`,`survey_test_id`),
  KEY `fk_pitanje_has_rad_rad1_idx` (`username`,`survey_test_id`),
  KEY `fk_pitanje_has_rad_pitanje1_idx` (`question_id`),
  KEY `fk_answer_survey_test_id_idx` (`survey_test_id`),
  CONSTRAINT `fk_answer_survey_test_id` FOREIGN KEY (`survey_test_id`) REFERENCES `survey_test` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_work_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
  CONSTRAINT `fk_work_user_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (171,'author',71,'[1000,15]',NULL),(171,'author',72,'[22,33]',NULL),(171,'nsavic',71,'[1001,15]',NULL),(171,'nsavic',72,'[1230,223]',NULL),(171,'user',71,'[333,123]',NULL),(171,'user',72,'[444,555]',NULL),(172,'author',71,'[\"Barcelona\",\"Messi\"]',NULL),(172,'author',72,'[\"random\",\"I don\'t know\"]',NULL),(172,'nsavic',71,'[\"Barcelona\",\"Cristiano Ronaldo\"]',NULL),(172,'nsavic',72,'[\"random\",\"idk\"]',NULL),(172,'user',71,'[\"Madrid\",\"Random...\"]',NULL),(172,'user',72,'[\"???\",\"IDK\"]',NULL),(173,'author',71,'[\"Some random response...\"]',NULL),(173,'author',72,'[\"Random...\"]',NULL),(173,'nsavic',71,'[\"I dont know\"]',NULL),(173,'nsavic',72,'[\"Okay\"]',NULL),(173,'user',71,'[\"Random...\"]',NULL),(173,'user',72,'[\"Will Smith\"]',NULL),(174,'author',71,'[\"1\",\"\"]',NULL),(174,'author',72,'[\"\",\"1\"]',NULL),(174,'nsavic',71,'[\"1\",\"\"]',NULL),(174,'nsavic',72,'[\"\",\"1\"]',NULL),(174,'user',71,'[\"1\",\"\"]',NULL),(174,'user',72,'[\"1\",\"\"]',NULL),(175,'author',71,'[\"1\",\"1\"]',NULL),(175,'author',72,'[\"1\",\"\"]',NULL),(175,'nsavic',71,'[\"\",\"1\"]',NULL),(175,'nsavic',72,'[\"1\",\"\"]',NULL),(175,'user',71,'[\"1\",\"1\"]',NULL),(175,'user',72,'[\"1\",\"\"]',NULL),(176,'author',73,'[11,5]',2.5),(176,'nsavic',73,'[22,33]',0),(176,'user',73,'[10,5]',5),(177,'admin',74,'[\"Odgovor 1\",\"Odgovor 2\"]',10),(177,'author',73,'[\"Odgovor 1\",\"\"]',2.5),(177,'nsavic',73,'[\"Odgovor 1\",\"Odgovor 2\"]',5),(177,'nsavic',74,'[\"Odgovor 1\",\"Odgovor 2\"]',10),(177,'user',73,'[\"Odgovor 1\",\"Odgovor 2\"]',5),(177,'user',74,'[\"nzm\",\"nzm\"]',0),(178,'admin',74,'[\"1\",\"1\"]',15),(178,'author',73,'[\"\",\"\"]',0),(178,'nsavic',73,'[\"1\",\"1\"]',5),(178,'nsavic',74,'[\"1\",\"\"]',7.5),(178,'user',73,'[\"1\",\"1\"]',5),(178,'user',74,'[\"\",\"\"]',0),(179,'admin',74,'[\"nzm\"]',0),(179,'author',73,'[\"sadasdas\"]',5),(179,'nsavic',73,'[\"nbt...\"]',0),(179,'nsavic',74,'[\"...\"]',0),(179,'user',73,'[\"sadasdas\"]',5),(179,'user',74,'[\"dsads\"]',0),(180,'author',73,'[\"1\",\"\"]',5),(180,'nsavic',73,'[\"\",\"1\"]',0),(180,'user',73,'[\"1\",\"\"]',5);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_question`
--

DROP TABLE IF EXISTS `has_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `has_question` (
  `question_id` int(11) NOT NULL,
  `survey_test_id` int(11) NOT NULL,
  `order_number` int(11) NOT NULL,
  `points` int(11) DEFAULT NULL,
  PRIMARY KEY (`question_id`,`survey_test_id`),
  KEY `fk_pitanje_has_anketa_test_pitanje1_idx` (`question_id`),
  KEY `fk_survey_test_id_idx` (`survey_test_id`),
  CONSTRAINT `fk_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
  CONSTRAINT `fk_survey_test_id` FOREIGN KEY (`survey_test_id`) REFERENCES `survey_test` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_question`
--

LOCK TABLES `has_question` WRITE;
/*!40000 ALTER TABLE `has_question` DISABLE KEYS */;
INSERT INTO `has_question` VALUES (171,71,0,NULL),(171,72,0,NULL),(171,75,0,NULL),(172,71,1,NULL),(172,72,1,NULL),(172,75,1,NULL),(173,71,2,NULL),(173,72,2,NULL),(173,75,2,NULL),(174,71,3,NULL),(174,72,3,NULL),(175,71,4,NULL),(175,72,4,NULL),(176,73,0,5),(177,73,1,5),(177,74,0,10),(178,73,4,5),(178,74,1,15),(179,73,2,5),(179,74,2,5),(180,73,3,5);
/*!40000 ALTER TABLE `has_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `solutions` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (171,'Pitanje tip 1','{\"labels\": [\"Podpitanje1\",\"Podpitanje2\"], \"correct\": []}',1),(172,'Pitanje tip 2','{\"labels\": [\"Podpitanje1\",\"Podpitanje2\"], \"correct\": []}',2),(173,'Pitanje tip 3','{\"labels\": [\"Podpitanje 1\"], \"correct\": []}',3),(174,'Pitanje tip 4','{\"labels\": [\"Podpitanje1\",\"Podpitanje2\"], \"correct\": []}',4),(175,'Pitanje tip 5','{\"labels\": [\"Podpitanje1\",\"Podpitanje2\"], \"correct\": []}',5),(176,'Pitanje tip 1','{\"labels\": [\"Podpitanje1\",\"Podpitanje2\"], \"correct\": [10,5]}',1),(177,'Pitanje tip 2','{\"labels\": [\"Podpitanje1\",\"Podpitanje2\"], \"correct\": [\"Odgovor 1\",\"Odgovor 2\"]}',2),(178,'Pitanje tip 5','{\"labels\": [\"Podpitanje1\",\"Podpitanje2\"], \"correct\": [\"1\",\"1\"]}',5),(179,'Pitanje tip 3','{\"labels\": [\"Podpitanje 1\"], \"correct\": [\"sadasdas\"]}',3),(180,'Pitanje tip 4','{\"labels\": [\"Podpitanje1\",\"Podpitanje2\"], \"correct\": [\"1\",\"\"]}',4);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_test`
--

DROP TABLE IF EXISTS `survey_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `survey_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `anonymous` int(11) DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `author` varchar(45) NOT NULL,
  `pages` int(11) DEFAULT NULL,
  `shuffle` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_anketa_test_korisnik1_idx` (`author`),
  CONSTRAINT `fk_survey_test_author` FOREIGN KEY (`author`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_test`
--

LOCK TABLES `survey_test` WRITE;
/*!40000 ALTER TABLE `survey_test` DISABLE KEYS */;
INSERT INTO `survey_test` VALUES (71,'Anonymous survey example','opis...',1,'2019-02-10 10:00:00','2020-02-10 10:00:00',NULL,0,'admin',1,NULL),(72,'Multipage survey','opis...',NULL,'2019-02-10 10:00:00','2020-02-10 10:00:00',NULL,0,'admin',3,NULL),(73,'Shuffle test example','opis...',NULL,'2019-02-10 10:00:00','2020-02-10 10:00:00',35,1,'admin',NULL,1),(74,'Test from JSON','opis...',NULL,'2019-02-10 10:00:00','2020-02-10 10:00:00',120,1,'author',NULL,NULL),(75,'Expired survey example','description...',NULL,'2020-01-09 10:00:00','2020-01-19 10:00:00',NULL,0,'author',3,NULL);
/*!40000 ALTER TABLE `survey_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `birthday` date NOT NULL,
  `birthplace` varchar(45) NOT NULL,
  `JMBG` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `JMBG_UNIQUE` (`JMBG`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','Admin123.','admin','admin','1997-06-13','Belgrade','1111111111111','123123123','admin@admin.com','default.png',2,1),('author','Author123.','author','author','1997-06-13','Belgrade','2222222222222','123123123','author@author.com','default.png',1,1),('nsavic','Sifra123.','Nebojsa','Savic','1997-06-13','Krusevac','1231231231231','0654445533','nebojsasavic6@gmail.com','nsavic.png',0,1),('test','Sifra123.','Test','Test','2020-01-02','New York','1111111111112','4566331188','test@test.com','test.png',0,0),('user','User123.','user','user','1997-06-13','Belgrade','3333333333333','123123123','user@user.com','default.png',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work`
--

DROP TABLE IF EXISTS `work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `work` (
  `user_username` varchar(45) NOT NULL,
  `survey_test_id` int(11) NOT NULL,
  `finished` int(11) NOT NULL DEFAULT '0',
  `time` int(11) DEFAULT NULL,
  `total_points` float DEFAULT NULL,
  PRIMARY KEY (`user_username`,`survey_test_id`),
  KEY `fk_korisnik_has_anketa_test_korisnik1_idx` (`user_username`),
  KEY `fk_work_survey_test_id_idx` (`survey_test_id`),
  CONSTRAINT `fk_user_work_username` FOREIGN KEY (`user_username`) REFERENCES `users` (`username`),
  CONSTRAINT `fk_work_survey_test_id` FOREIGN KEY (`survey_test_id`) REFERENCES `survey_test` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work`
--

LOCK TABLES `work` WRITE;
/*!40000 ALTER TABLE `work` DISABLE KEYS */;
INSERT INTO `work` VALUES ('admin',74,1,18,25),('author',71,1,NULL,NULL),('author',72,1,NULL,NULL),('author',73,1,35,15),('nsavic',71,1,NULL,NULL),('nsavic',72,1,NULL,NULL),('nsavic',73,1,26,10),('nsavic',74,1,14,17.5),('user',71,1,NULL,NULL),('user',72,1,NULL,NULL),('user',73,1,27,25),('user',74,1,18,0);
/*!40000 ALTER TABLE `work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-20 17:00:22
