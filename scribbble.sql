-- MySQL dump 10.13  Distrib 5.6.19, for osx10.9 (x86_64)
--
-- Host: localhost    Database: scribbble
-- ------------------------------------------------------
-- Server version	5.6.19

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `scribe` int(10) unsigned DEFAULT NULL,
  `user` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (14,47,49),(15,15,48),(16,46,48),(17,0,48),(18,41,49),(19,47,48),(20,48,48),(21,15,49),(22,39,49),(23,51,48),(24,52,48),(25,53,48),(26,39,48),(27,54,48),(28,55,48),(29,54,49),(30,46,49),(31,77,49),(32,77,48);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scribes`
--

DROP TABLE IF EXISTS `scribes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scribes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` int(11) DEFAULT NULL,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `html` longtext,
  `css` longtext,
  `js` longtext,
  `likes` text,
  `comments` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scribes`
--

LOCK TABLES `scribes` WRITE;
/*!40000 ALTER TABLE `scribes` DISABLE KEYS */;
INSERT INTO `scribes` VALUES (39,49,'2014-11-20 12:12:16','IBM\n<div id=\"lines\">\n	<div></div>\n	<div></div>\n	<div></div>\n	<div></div>\n	<div></div>\n	<div></div>\n	<div></div>\n</div>','body {\n	font-size: 195px;\n	color: #fff;\n	font-weight: bold;\n	text-align: center;\n	text-shadow: 6px 0 0;\n	letter-spacing: 5px;\n	margin-top: 110px;\n	background: #000;\n}\n\n#lines div {\n	width: 500px;\n	height: 10px;\n	margin: 8px;\n	background: #000\n}\n\n#lines {\n	position: absolute;\n	top: 152px;\n	left: 50%;\n	margin-left: -250px;\n}','',NULL,NULL),(41,49,'2014-11-20 12:12:25','Welcome,<br>IBM.<div>Seriously.</div>\n<p>Welcome to the most exciting and important marketplace since the computer revolution began 35 years ago.\n<p>And congratulations on your first personal computer. \n<p>Putting real computer power in the hands of the individual is already improving the way people work, think, learn, communicate, and spend their leisure hours. \n<p>Computer literacy is fast becoming as fundamental a skill<br>as reading or writing. \n<p>When we invented the first personal computer system,<br>we estimated that over 140,000,000 people worldwide could justify the purchase of one, if only they understood its benefits. \n<p>Next year alone, we project that well over 1,000,000 will come to that understanding. Over the next decade, the growth<br>of the personal computer will continue in logarithmic leaps. \n<p>We look forward to responsible competition in the massive effort to distribute this American technology to the world. \n<br>And we appreciate the magnitude of your commitment. \n<p>Because what we are doing is increasing social capital<br>by enhancing individual productivity. \n<p>Welcome to the task.','body {\n	font-family: \'Apple Garamond\';\n	font-weight: bold;\n	font-size: 100px;\n	text-align: center;\n	line-height: 70%;\n	margin: 0;\n	padding: 100px 0;\n}\n\ndiv {\n	margin: 30px 0;\n}\n\np {\n	text-indent: 50px;\n	font-size: 24px;\n	font-weight: normal;\n	line-height: 100%;\n	width: 560px;\n	margin: 0 auto;\n	display: block;\n	text-align: left;\n}','',NULL,NULL),(46,48,'2014-11-20 23:01:40','<div id=\"selling-block\">\n	<div id=\"image-container\"></div>\n\n	<div class=\"txt-body\">\n		<h4>John Doe</h4>\n		<p>\n			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n		</p>\n		<a>More Info</a>\n	</div>\n\n</div>','@import url(http://fonts.googleapis.com/css?family=Roboto:400,500,700,300);\n\nbody {\n	padding: 0;\n	margin: 0 auto;\n	background-color: #CD853F;\n	font-family: \'Roboto\', sans-serif;\n	margin-top: 50px;\n}\n\na {\n	font-weight: 500;\n	display: inline-block;\n	color: #CD853F;\n	border: 2px solid #CD853F;\n	margin: 0;\n	padding: 8px 24px;\n	cursor: pointer;\n	-webkit-border-radius: 3px;\n	border-radius: 3px;\n	transition: all .3s ease;\n	margin-top: 10px;\n}\n\na:hover {\n	border: 2px solid #CD853F;\n	background-color: #CD853F;\n	color: #fff;\n}\n\na:active {\n	background-color: #dfb083;\n}\n\nh4, p {\n	color: #333333;\n	font-weight: 400;\n}\n\nh4 {\n	font-size: 24px;\n	display: inline-block;\n	margin: 20px 0 0 0;\n}\n\np {\n	line-height: 1.7;\n}\n\n#selling-block {\n	position: relative;\n	margin: 0 auto;\n	width: 330px;\n	height: auto;\n	background-color: #fff;\n	padding-bottom: 17px;\n	-webkit-box-shadow: 0 0 20px 0 rgba(50, 50, 50, 0.2);\n	-moz-box-shadow: 0 0 20px 0 rgba(50, 50, 50, 0.2);\n	box-shadow: 0 0 20px 0 rgba(50, 50, 50, 0.2);\n}\n\n#image-container {\n	height: 220px;\n	margin: 0;\n	padding: 0;\n	background-image: url(http://www.pixentral.com/pics/1v0Fqa5VXcefiNZW0Cjgs2JO5EcT.jpg);\n	background-size: 100%;\n	background-position: center;\n	background-repeat: no-repeat;\n}\n\n.txt-body {\n	padding: 5px 40px 20px 40px;\n}','',NULL,NULL),(47,49,'2014-11-20 23:16:30','Think different.','body {\n	background: #111;\n	font-family: \'Apple Garamond\';\n	color: #eee;\n	font-size: 56pt;\n	text-align: center;\n	margin: 180px 0;\n	line-height: 90%;\n}','',NULL,NULL),(54,48,'2014-11-21 03:10:46','<div id=\"wrapper\">\n	<div class=\"arrow-right\"></div>\n</div>','body {\n	margin: 0;\n	padding: 0;\n	background: CadetBlue;\n}\n\n#wrapper {\n	width: 60px;\n	height: 80px;\n	margin: auto;\n	position: absolute;\n	top: 0;\n	bottom: 0;\n	right: 0;\n	left: 0;\n}\n\n.arrow-right {\n	cursor: pointer;\n	width: 0; \n	height: 0; \n	border-top: 40px solid transparent;\n	border-bottom: 40px solid transparent;\n	border-left: 60px solid #f8f8f8;\n	transition: all .15s;\n}\n\n.arrow-right:hover {\n	cursor: pointer;\n	-moz-transform: scale(1.1,1.1);\n	-ms-transform: scale(1.1,1.1);\n	-webkit-transform: scale(1.1,1.1);\n	transform: scale(1.1,1.1;\n}\n\n.arrow-right:active {\n	cursor: pointer;\n	-moz-transform: scale(2,2);\n	-ms-transform: scale(2,2);\n	-webkit-transform: scale(2,2);\n	transform: scale(2,2);\n	border-left: 60px solid #f3f3f3;\n}','',NULL,NULL),(77,49,'2014-11-21 14:56:33','<i>scrib</i>bble<br>\n<i><small>a place for designers</small</i>','body {\n	font-family: \'Apple Garamond\';\n	font-size: 100px;\n	text-align: center;\n	line-height: 70%;\n	margin: 0;\n	padding: 100px 0;\n	background: #eee;\n	color: #222;\n}\n\ndiv {\n	margin: 30px 0;\n}\n\np {\n	text-indent: 50px;\n	font-size: 24px;\n	font-weight: normal;\n	line-height: 100%;\n	width: 560px;\n	margin: 0 auto;\n	display: block;\n	text-align: left;\n}\n\nsmall {\n	font-size: 66.6%;\n}','',NULL,NULL),(81,48,'2014-11-21 23:34:51','<p>many awesome.</p>','body {\n	background-color: black;\n	margin-top: 190px;\n}\n\np {\n	text-align: center;\n	font-family: sans-serif;\n	color: white;\n	font-size: 40px;\n	font-family: serif;\n	font-style: italic;\n}','',NULL,NULL);
/*!40000 ALTER TABLE `scribes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(24) DEFAULT NULL,
  `password` varbinary(20) DEFAULT NULL,
  `first_name` varchar(16) DEFAULT NULL,
  `last_name` varchar(24) DEFAULT NULL,
  `bio` tinytext,
  `pro` tinyint(1) NOT NULL DEFAULT '0',
  `following` text,
  `followers` text,
  `email` tinytext,
  `verification_code` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (48,'timbog80','ûÎ,6JFôÈ-üsÊ‚J*!•',NULL,NULL,NULL,0,NULL,NULL,'timbog80@gmail.com',NULL),(49,'jasonwoodland','h»½T¸öÅ0i^wÞ)‚v Q',NULL,NULL,NULL,0,NULL,NULL,'jasonwoodland@me.com',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-11-22 13:18:43
