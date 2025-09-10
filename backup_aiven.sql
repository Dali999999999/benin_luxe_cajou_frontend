-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: mysql-1b7618bc-benin-luxe-cajou.c.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '4c7d733d-7954-11f0-9dd8-269742996cc0:1-438';

--
-- Table structure for table `adresses_livraison`
--

DROP TABLE IF EXISTS `adresses_livraison`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adresses_livraison` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `nom_destinataire` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone_destinataire` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quartier` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_adresse` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `point_repere` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `precision_gps` int DEFAULT NULL,
  `type_adresse` enum('manuelle','gps_actuelle','gps_choisie') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `est_defaut` tinyint(1) DEFAULT '0',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_adresses_utilisateur` (`utilisateur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adresses_livraison`
--

LOCK TABLES `adresses_livraison` WRITE;
/*!40000 ALTER TABLE `adresses_livraison` DISABLE KEYS */;
INSERT INTO `adresses_livraison` VALUES (1,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',6.36690000,2.41500000,NULL,'gps_actuelle',0,'2025-08-16 16:50:07'),(5,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',6.36690000,2.41500000,NULL,'gps_actuelle',0,'2025-08-16 19:14:28'),(6,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',6.36690000,2.41500000,NULL,'gps_actuelle',0,'2025-08-16 19:52:33'),(7,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',6.36690000,2.41500000,NULL,'gps_actuelle',0,'2025-08-17 10:28:29'),(8,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',6.36690000,2.41500000,NULL,'gps_actuelle',0,'2025-08-17 10:41:41'),(9,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',6.36690000,2.41500000,NULL,'gps_actuelle',0,'2025-08-17 10:53:31'),(10,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',6.36690000,2.41500000,NULL,'gps_actuelle',0,'2025-08-17 11:25:24'),(12,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',7.92612468,1.97785767,NULL,'gps_actuelle',0,'2025-08-17 21:12:10'),(13,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',7.92612468,1.97785767,NULL,'gps_actuelle',0,'2025-08-17 21:22:09'),(14,3,'Dalini Amen','0166707998','','','Cotonou, Agontinkon','Djevali',7.92612468,1.97785767,NULL,'gps_actuelle',0,'2025-08-17 22:42:06'),(17,4,'Pythagore ADJALLA','0156102903','','','Cotonou,Bénin','kindonou',6.41130000,2.42650000,NULL,'gps_actuelle',0,'2025-08-19 10:25:11'),(19,4,'Pythagore ADJALLA','0156102903','','','Cotonou,Bénin','kindonou',6.41130000,2.42650000,NULL,'gps_actuelle',0,'2025-08-19 10:42:14'),(20,4,'Pythagore ADJALLA','0156102903','','','Cotonou,Bénin','kindonou',6.41130000,2.42650000,NULL,'gps_actuelle',0,'2025-08-19 10:56:48'),(21,4,'Pythagore ADJALLA','0156102903','','','Cotonou,Bénin','kindonou',6.41130000,2.42650000,NULL,'gps_actuelle',0,'2025-08-19 11:09:21'),(24,4,'Pythagore ADJALLA','0156102903','','','Cotonou,Bénin','kindonou',6.41130000,2.42650000,NULL,'gps_actuelle',0,'2025-08-19 18:47:26'),(27,4,'Pythagore ADJALLA','0156102903','','','Cotonou,Bénin','kindonou',6.41130000,2.42650000,NULL,'gps_actuelle',0,'2025-08-19 18:55:39'),(28,4,'Pythagore ADJALLA','0156102903','','','Cotonou,Bénin','kindonou',6.41130000,2.42650000,NULL,'gps_actuelle',0,'2025-08-20 09:32:02'),(29,4,'Pythagore ADJALLA','0156102903','','','Cotonou,Bénin','kindonou',6.36000000,2.44000000,NULL,'gps_actuelle',0,'2025-08-21 14:50:09'),(30,3,'Dalini Amen','0166707998','Cotonou','Zone','Cotonou, Agontinkon','ecole',NULL,NULL,NULL,'manuelle',0,'2025-08-21 17:19:55'),(31,4,'Pythagore ADJALLA','0156102903','Cotonou','kindonou','Cotonou,Bénin','kindonou',NULL,NULL,NULL,'manuelle',0,'2025-08-21 17:26:25'),(33,4,'Pythagore Emmanuel ADJALLA','0156102903','Cotonou','kindonou','Kindonou La santé 2 Lot 2190','test',NULL,NULL,NULL,'manuelle',0,'2025-08-21 17:36:23'),(34,4,'Pyth','0156102903','','','','',6.39622546,2.35988563,NULL,'gps_actuelle',0,'2025-08-21 18:12:08'),(35,3,'Dalini Amen','0166707998','Cotonou','Zone','Cotonou, Agontinkon','ecole',NULL,NULL,NULL,'manuelle',0,'2025-08-22 19:25:24'),(36,3,'Dalini Amen GBAGUIDI','66707998','','','Agontikon, Saint-Jean','Djevali',6.48623580,2.59024950,NULL,'gps_actuelle',0,'2025-08-23 10:46:42'),(37,3,'Dalini Amen GBAGUIDI','66707998','','','Agontikon, Saint-Jean','Djevali',6.48623580,2.59024950,NULL,'gps_actuelle',0,'2025-08-23 10:50:09'),(38,3,'Dalini Amen GBAGUIDI','66707998','','','345','Djevali',6.38000000,2.37000000,NULL,'gps_actuelle',0,'2025-08-23 10:53:20'),(39,3,'Amen Dalini','66707998','','','Cotonou, Bénin','Djevali',6.38000000,2.37000000,NULL,'gps_actuelle',0,'2025-08-23 11:02:22'),(40,3,'Amen Dalini','66707998','','','Cotonou, Bénin','Djevali',6.38000000,2.37000000,NULL,'gps_actuelle',0,'2025-08-23 11:21:34'),(41,3,'Amen Dalini','66707998','','','Cotonou, Bénin','Djevali',6.38000000,2.37000000,NULL,'gps_actuelle',0,'2025-08-23 11:26:11'),(43,3,'AMEN DALINI SELIDJI GBAGUIDI','66707998','','','Cotonou, Agontinkon','ecole',6.38000000,2.37000000,NULL,'gps_actuelle',0,'2025-08-23 11:46:57'),(44,3,'Dalini geven 1','66707998','','','Agontikon, Saint-Jean','Djevali',6.38000000,2.37000000,NULL,'gps_actuelle',0,'2025-08-23 11:48:09'),(47,3,'Dalini geven 1','66707998','Cotonou','Zone','Agontikon, Saint-Jean','Djevali',NULL,NULL,NULL,'manuelle',0,'2025-08-23 12:09:10'),(48,6,'da MATHA Emmerson','0151136663','','','Portail couleur Marron','Vendeuse de pain',6.35624250,2.42779950,NULL,'gps_actuelle',0,'2025-09-02 19:33:48'),(49,4,'Adjalla','0156102903','','','Pigier Benin ','',6.39621424,2.35988646,NULL,'gps_actuelle',0,'2025-09-07 08:13:03');
/*!40000 ALTER TABLE `adresses_livraison` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`avnadmin`@`%`*/ /*!50003 TRIGGER `check_default_address` BEFORE UPDATE ON `adresses_livraison` FOR EACH ROW BEGIN
    IF NEW.est_defaut = TRUE THEN
        UPDATE adresses_livraison
        SET est_defaut = FALSE
        WHERE utilisateur_id = NEW.utilisateur_id AND id != NEW.id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `avis_produits`
--

DROP TABLE IF EXISTS `avis_produits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avis_produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produit_id` int NOT NULL,
  `utilisateur_id` int NOT NULL,
  `commande_id` int NOT NULL,
  `note` int NOT NULL,
  `commentaire` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `statut` enum('en_attente','approuve','rejete') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'en_attente',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_avis_par_commande` (`produit_id`,`commande_id`,`utilisateur_id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `commande_id` (`commande_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avis_produits`
--

LOCK TABLES `avis_produits` WRITE;
/*!40000 ALTER TABLE `avis_produits` DISABLE KEYS */;
/*!40000 ALTER TABLE `avis_produits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` enum('actif','inactif') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'actif',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'Amande Torréfié ','','https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757413930/benin_luxe_cajou/categories/geszjpn7hnzi0q0t5fum.jpg','actif','2025-09-09 10:32:11','2025-09-09 10:32:11'),(5,'Amande blanche ','','https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757414164/benin_luxe_cajou/categories/at72fy2ix3whynjicx8g.jpg','actif','2025-09-09 10:36:05','2025-09-09 10:36:05');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commandes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_commande` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `utilisateur_id` int NOT NULL,
  `adresse_livraison_id` int NOT NULL,
  `statut` enum('en_attente','confirmee','en_preparation','expedie','livree','annulee') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_attente',
  `sous_total` decimal(10,2) NOT NULL,
  `frais_livraison` decimal(8,2) DEFAULT '0.00',
  `coupon_id` int DEFAULT NULL,
  `montant_reduction` decimal(10,2) DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL,
  `statut_paiement` enum('en_attente','paye','echoue','rembourse') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_attente',
  `notes_client` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `notes_admin` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `date_commande` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_livraison_prevue` date DEFAULT NULL,
  `date_livraison_effective` datetime DEFAULT NULL,
  `date_modification` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_commande` (`numero_commande`),
  KEY `adresse_livraison_id` (`adresse_livraison_id`),
  KEY `coupon_id` (`coupon_id`),
  KEY `idx_commandes_utilisateur` (`utilisateur_id`),
  KEY `idx_commandes_statut` (`statut`),
  KEY `idx_commandes_numero` (`numero_commande`),
  KEY `idx_commandes_date` (`date_commande`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commandes`
--

LOCK TABLES `commandes` WRITE;
/*!40000 ALTER TABLE `commandes` DISABLE KEYS */;
INSERT INTO `commandes` VALUES (1,'CMD-20250816-00001',3,1,'en_attente',11500.00,1000.00,NULL,0.00,12500.00,'en_attente','Arrivé à djevali appelez moi ',NULL,'2025-08-16 16:50:08',NULL,NULL,'2025-08-16 16:50:08'),(5,'CMD-20250816-00002',3,5,'en_attente',2500.00,1000.00,NULL,0.00,3500.00,'en_attente','Arrivé à djevali appelez moi ',NULL,'2025-08-16 19:14:29',NULL,NULL,'2025-08-16 19:14:29'),(6,'CMD-20250816-00003',3,6,'confirmee',2500.00,1000.00,NULL,0.00,3500.00,'paye','Arrivé à djevali appelez moi ',NULL,'2025-08-16 19:52:34',NULL,NULL,'2025-08-16 19:52:52'),(7,'CMD-20250817-00001',3,7,'en_attente',2000.00,1000.00,NULL,0.00,3000.00,'en_attente','Arrivé à djevali appelez moi ',NULL,'2025-08-17 10:28:30',NULL,NULL,'2025-08-17 10:28:30'),(8,'CMD-20250817-00002',3,8,'confirmee',2000.00,1000.00,NULL,0.00,3000.00,'paye','Arrivé à djevali appelez moi ',NULL,'2025-08-17 10:41:41',NULL,NULL,'2025-08-17 10:41:58'),(9,'CMD-20250817-00003',3,9,'confirmee',2000.00,1000.00,NULL,0.00,3000.00,'paye','Arrivé à djevali appelez moi ',NULL,'2025-08-17 10:53:31',NULL,NULL,'2025-08-17 10:53:46'),(10,'CMD-20250817-00004',3,10,'en_preparation',1500.00,1000.00,NULL,0.00,2500.00,'paye','Arrivé à djevali appelez moi ',NULL,'2025-08-17 11:25:25',NULL,NULL,'2025-08-17 12:31:18'),(12,'CMD-20250817-00005',3,12,'en_attente',1500.00,1000.00,NULL,0.00,2500.00,'en_attente','Arrivé à djevali appelez moi ',NULL,'2025-08-17 21:12:10',NULL,NULL,'2025-08-17 21:12:10'),(13,'CMD-20250817-00006',3,13,'expedie',1500.00,1000.00,NULL,0.00,2500.00,'paye','Arrivé à djevali appelez moi ',NULL,'2025-08-17 21:22:10',NULL,NULL,'2025-08-17 22:31:47'),(14,'CMD-20250817-00007',3,14,'confirmee',1500.00,1000.00,NULL,0.00,2500.00,'paye','Arrivé à djevali appelez moi ',NULL,'2025-08-17 22:42:07',NULL,NULL,'2025-08-17 22:42:26'),(15,'CMD-20250819-00001',4,17,'en_preparation',9000.00,1000.00,NULL,0.00,10000.00,'paye','bieb ',NULL,'2025-08-19 10:25:12',NULL,NULL,'2025-08-19 15:38:47'),(16,'CMD-20250819-00002',4,19,'en_attente',3000.00,1000.00,NULL,0.00,4000.00,'en_attente','la santé2',NULL,'2025-08-19 10:42:15',NULL,NULL,'2025-08-19 10:42:15'),(17,'CMD-20250819-00003',4,20,'en_preparation',7000.00,1000.00,NULL,0.00,8000.00,'paye','la santé2',NULL,'2025-08-19 10:56:49',NULL,NULL,'2025-08-19 14:55:12'),(18,'CMD-20250819-00004',4,21,'en_attente',2000.00,1000.00,NULL,0.00,3000.00,'en_attente','la santé2',NULL,'2025-08-19 11:09:22',NULL,NULL,'2025-08-19 11:09:22'),(19,'CMD-20250819-00005',4,24,'confirmee',3000.00,1000.00,NULL,0.00,4000.00,'paye','la santé2',NULL,'2025-08-19 18:47:27',NULL,NULL,'2025-08-19 18:47:51'),(20,'CMD-20250819-00006',4,27,'confirmee',7000.00,1000.00,NULL,0.00,8000.00,'paye','la santé2',NULL,'2025-08-19 18:55:40',NULL,NULL,'2025-08-19 18:56:05'),(21,'CMD-20250820-00001',4,28,'en_preparation',5500.00,1000.00,NULL,0.00,6500.00,'paye','la santé2',NULL,'2025-08-20 09:32:03',NULL,NULL,'2025-08-20 12:51:41'),(22,'CMD-20250821-00001',4,29,'en_attente',500.00,1000.00,NULL,0.00,1500.00,'en_attente','la santé2',NULL,'2025-08-21 14:50:10',NULL,NULL,'2025-08-21 14:50:10'),(23,'CMD-20250821-00002',3,30,'en_attente',7000.00,1000.00,NULL,0.00,8000.00,'en_attente','Arrivé à djevali appelez moi ',NULL,'2025-08-21 17:19:56',NULL,NULL,'2025-08-21 17:19:56'),(24,'CMD-20250821-00003',4,31,'en_attente',9500.00,1000.00,NULL,0.00,10500.00,'en_attente','la santé2',NULL,'2025-08-21 17:26:26',NULL,NULL,'2025-08-21 17:26:26'),(25,'CMD-20250821-00004',4,33,'en_attente',2500.00,1000.00,NULL,0.00,3500.00,'en_attente','test',NULL,'2025-08-21 17:36:23',NULL,NULL,'2025-08-21 17:36:23'),(26,'CMD-20250821-00005',4,34,'en_attente',7000.00,1000.00,NULL,0.00,8000.00,'en_attente','',NULL,'2025-08-21 18:12:09',NULL,NULL,'2025-08-21 18:12:09'),(27,'CMD-20250822-00001',3,35,'en_attente',2500.00,1000.00,NULL,0.00,3500.00,'en_attente','Arrivé à djevali appelez moi ',NULL,'2025-08-22 19:25:25',NULL,NULL,'2025-08-22 19:25:25'),(28,'CMD-20250823-00001',3,36,'en_attente',6000.00,1000.00,NULL,0.00,7000.00,'en_attente','Appelez moi ',NULL,'2025-08-23 10:46:43',NULL,NULL,'2025-08-23 10:46:43'),(29,'CMD-20250823-00002',3,37,'en_attente',6000.00,1000.00,NULL,0.00,7000.00,'en_attente','Appelez moi ',NULL,'2025-08-23 10:50:10',NULL,NULL,'2025-08-23 10:50:10'),(30,'CMD-20250823-00003',3,38,'en_attente',6000.00,1000.00,NULL,0.00,7000.00,'en_attente','apelez moi ',NULL,'2025-08-23 10:53:21',NULL,NULL,'2025-08-23 10:53:21'),(31,'CMD-20250823-00004',3,39,'confirmee',6000.00,1000.00,NULL,0.00,7000.00,'paye','apelez moi ',NULL,'2025-08-23 11:02:23',NULL,NULL,'2025-08-23 11:02:45'),(32,'CMD-20250823-00005',3,40,'confirmee',500.00,1000.00,NULL,0.00,1500.00,'paye','apelez moi ',NULL,'2025-08-23 11:21:34',NULL,NULL,'2025-08-23 11:21:58'),(33,'CMD-20250823-00006',3,41,'en_preparation',500.00,1000.00,NULL,0.00,1500.00,'paye','apelez moi ',NULL,'2025-08-23 11:26:11',NULL,NULL,'2025-09-02 18:04:21'),(34,'CMD-20250823-00007',3,43,'en_attente',7000.00,1000.00,NULL,0.00,8000.00,'en_attente','Arrivé à djevali appelez moi ',NULL,'2025-08-23 11:46:58',NULL,NULL,'2025-08-23 11:46:58'),(35,'CMD-20250823-00008',3,44,'confirmee',7000.00,1000.00,NULL,0.00,8000.00,'paye','apelez moi ',NULL,'2025-08-23 11:48:09',NULL,NULL,'2025-08-23 11:48:27'),(36,'CMD-20250823-00009',3,47,'confirmee',7000.00,1000.00,NULL,0.00,8000.00,'paye','apelez moi ',NULL,'2025-08-23 12:09:10',NULL,NULL,'2025-08-23 12:09:30'),(37,'CMD-20250902-00001',6,48,'annulee',2000.00,1000.00,NULL,0.00,3000.00,'rembourse','Livraison rapide',NULL,'2025-09-02 19:33:48',NULL,NULL,'2025-09-07 15:07:24'),(38,'CMD-20250907-00001',4,49,'confirmee',300.00,1000.00,NULL,0.00,1300.00,'paye','',NULL,'2025-09-07 08:13:04',NULL,NULL,'2025-09-07 08:13:25');
/*!40000 ALTER TABLE `commandes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`avnadmin`@`%`*/ /*!50003 TRIGGER `generate_order_number` BEFORE INSERT ON `commandes` FOR EACH ROW BEGIN
    DECLARE next_number INT;
    IF NEW.numero_commande IS NULL OR NEW.numero_commande = '' THEN
        -- Compter les commandes du jour + 1 pour un numéro séquentiel journalier
        SELECT COUNT(*) + 1 INTO next_number
        FROM commandes
        WHERE DATE(date_commande) = CURDATE();
        -- Générer le numéro: CMD-AAAAMMJJ-00001
        SET NEW.numero_commande = CONCAT('CMD-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(next_number, 5, '0'));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`avnadmin`@`%`*/ /*!50003 TRIGGER `update_stock_on_order_status_change` AFTER UPDATE ON `commandes` FOR EACH ROW BEGIN
    -- Scénario 1: La commande est confirmée (et ne l'était pas avant) -> On décrémente le stock
    IF NEW.statut = 'confirmee' AND OLD.statut != 'confirmee' THEN
        UPDATE produits p
        JOIN details_commande dc ON p.id = dc.produit_id
        SET p.stock_disponible = p.stock_disponible - dc.quantite
        WHERE dc.commande_id = NEW.id AND p.gestion_stock = 'limite';
    END IF;

    -- Scénario 2: Une commande confirmée est annulée -> On ré-incrémente le stock
    IF NEW.statut = 'annulee' AND OLD.statut = 'confirmee' THEN
        UPDATE produits p
        JOIN details_commande dc ON p.id = dc.produit_id
        SET p.stock_disponible = p.stock_disponible + dc.quantite
        WHERE dc.commande_id = NEW.id AND p.gestion_stock = 'limite';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type_reduction` enum('pourcentage','montant_fixe') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `valeur_reduction` decimal(10,2) NOT NULL,
  `montant_minimum_commande` decimal(10,2) DEFAULT '0.00',
  `date_debut` datetime DEFAULT NULL,
  `date_fin` datetime DEFAULT NULL,
  `limite_utilisation` int DEFAULT NULL,
  `utilisations_actuelles` int DEFAULT '0',
  `statut` enum('actif','inactif') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'actif',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_coupons_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (1,'TEST','Ceci est un test ','pourcentage',10.00,10000.00,NULL,'2025-08-17 00:00:00',1,0,'actif');
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details_commande`
--

DROP TABLE IF EXISTS `details_commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details_commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `produit_id` int NOT NULL,
  `quantite` int NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL COMMENT 'Prix au moment de la commande',
  `sous_total` decimal(10,2) NOT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `produit_id` (`produit_id`),
  KEY `idx_details_commande_commande` (`commande_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details_commande`
--

LOCK TABLES `details_commande` WRITE;
/*!40000 ALTER TABLE `details_commande` DISABLE KEYS */;
INSERT INTO `details_commande` VALUES (1,1,2,2,2000.00,4000.00,'2025-08-16 16:50:09'),(2,1,3,3,2500.00,7500.00,'2025-08-16 16:50:09'),(3,5,3,1,2500.00,2500.00,'2025-08-16 19:14:31'),(4,6,3,1,2500.00,2500.00,'2025-08-16 19:52:36'),(5,7,2,1,2000.00,2000.00,'2025-08-17 10:28:32'),(6,8,2,1,2000.00,2000.00,'2025-08-17 10:41:43'),(7,9,2,1,2000.00,2000.00,'2025-08-17 10:53:33'),(8,10,1,1,1500.00,1500.00,'2025-08-17 11:25:27'),(9,12,1,1,1500.00,1500.00,'2025-08-17 21:12:12'),(10,12,1,1,1500.00,1500.00,'2025-08-17 21:12:13'),(11,13,1,1,1500.00,1500.00,'2025-08-17 21:22:12'),(12,14,1,1,1500.00,1500.00,'2025-08-17 22:42:09'),(13,15,2,1,2000.00,2000.00,'2025-08-19 10:25:14'),(14,15,5,1,7000.00,7000.00,'2025-08-19 10:25:14'),(15,16,3,1,2500.00,2500.00,'2025-08-19 10:42:17'),(16,16,4,1,500.00,500.00,'2025-08-19 10:42:18'),(17,17,5,1,7000.00,7000.00,'2025-08-19 10:56:51'),(18,18,2,1,2000.00,2000.00,'2025-08-19 11:09:24'),(19,19,3,1,2500.00,2500.00,'2025-08-19 18:47:29'),(20,19,4,1,500.00,500.00,'2025-08-19 18:47:29'),(21,20,5,1,7000.00,7000.00,'2025-08-19 18:55:42'),(22,21,3,2,2500.00,5000.00,'2025-08-20 09:32:05'),(23,21,4,1,500.00,500.00,'2025-08-20 09:32:06'),(24,22,4,1,500.00,500.00,'2025-08-21 14:50:13'),(25,23,5,1,7000.00,7000.00,'2025-08-21 17:19:59'),(26,24,3,1,2500.00,2500.00,'2025-08-21 17:26:29'),(27,24,5,1,7000.00,7000.00,'2025-08-21 17:26:29'),(28,25,3,1,2500.00,2500.00,'2025-08-21 17:36:26'),(29,26,5,1,7000.00,7000.00,'2025-08-21 18:12:11'),(30,27,3,1,2500.00,2500.00,'2025-08-22 19:25:27'),(31,28,1,1,1500.00,1500.00,'2025-08-23 10:46:45'),(32,28,2,1,2000.00,2000.00,'2025-08-23 10:46:45'),(33,28,3,1,2500.00,2500.00,'2025-08-23 10:46:45'),(34,29,1,1,1500.00,1500.00,'2025-08-23 10:50:12'),(35,29,2,1,2000.00,2000.00,'2025-08-23 10:50:12'),(36,29,3,1,2500.00,2500.00,'2025-08-23 10:50:12'),(37,30,1,1,1500.00,1500.00,'2025-08-23 10:53:23'),(38,30,2,1,2000.00,2000.00,'2025-08-23 10:53:23'),(39,30,3,1,2500.00,2500.00,'2025-08-23 10:53:23'),(40,31,1,1,1500.00,1500.00,'2025-08-23 11:02:25'),(41,31,2,1,2000.00,2000.00,'2025-08-23 11:02:25'),(42,31,3,1,2500.00,2500.00,'2025-08-23 11:02:25'),(43,32,4,1,500.00,500.00,'2025-08-23 11:21:36'),(44,33,4,1,500.00,500.00,'2025-08-23 11:26:13'),(45,34,5,1,7000.00,7000.00,'2025-08-23 11:47:00'),(46,35,5,1,7000.00,7000.00,'2025-08-23 11:48:11'),(47,36,5,1,7000.00,7000.00,'2025-08-23 12:09:12'),(48,37,2,1,2000.00,2000.00,'2025-09-02 19:33:50'),(49,38,6,1,300.00,300.00,'2025-09-07 08:13:06');
/*!40000 ALTER TABLE `details_commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images_produits`
--

DROP TABLE IF EXISTS `images_produits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images_produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produit_id` int NOT NULL,
  `url_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ordre_affichage` int DEFAULT '1',
  `est_principale` tinyint(1) DEFAULT '0',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images_produits`
--

LOCK TABLES `images_produits` WRITE;
/*!40000 ALTER TABLE `images_produits` DISABLE KEYS */;
INSERT INTO `images_produits` VALUES (18,12,'https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757426499/benin_luxe_cajou/produits/qvb4on4dehj8wv80chac.jpg','Amande Blanche Entière ',1,1,'2025-09-09 14:01:40'),(19,13,'https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757427100/benin_luxe_cajou/produits/fwvvm5jzlhvmq9nbxwt9.jpg','Amande Blanche Entière (250g)',1,1,'2025-09-09 14:11:42'),(20,13,'https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757427105/benin_luxe_cajou/produits/b7hg39t8oqrspmdkbanq.jpg','Amande Blanche Entière (250g)',1,0,'2025-09-09 14:11:46'),(21,14,'https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757427810/benin_luxe_cajou/produits/jzygekffbqsky7gzjcfs.jpg','Amande Torréfié Brisée 125g)',1,1,'2025-09-09 14:23:31'),(22,14,'https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757427815/benin_luxe_cajou/produits/i7fdfikgck4zaeohrdcd.jpg','Amande Torréfié Brisée 125g)',1,0,'2025-09-09 14:23:36'),(23,15,'https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757428055/benin_luxe_cajou/produits/nbguswjrc7maemkyivv1.jpg','Amande Torréfié Entière (125g)',1,1,'2025-09-09 14:27:36'),(24,16,'https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757428178/benin_luxe_cajou/produits/oal4llbfmeydggbxrbsj.jpg','Amande Torréfié Brisée (500g)',1,1,'2025-09-09 14:29:39'),(25,17,'https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757428300/benin_luxe_cajou/produits/rtzuwxv7brebd9odjpfr.jpg','Amande Torréfié Entière (250g)',1,1,'2025-09-09 14:31:41');
/*!40000 ALTER TABLE `images_produits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_subscriptions`
--

DROP TABLE IF EXISTS `newsletter_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletter_subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `subscribed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscriptions`
--

LOCK TABLES `newsletter_subscriptions` WRITE;
/*!40000 ALTER TABLE `newsletter_subscriptions` DISABLE KEYS */;
INSERT INTO `newsletter_subscriptions` VALUES (1,'daligba83@gmail.com','2025-08-25 15:36:43',1),(2,'pythagoreadjalla@gmail.com','2025-08-25 17:06:27',1),(3,'damathaemmersonmichel@gmail.com','2025-08-27 10:47:24',1);
/*!40000 ALTER TABLE `newsletter_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `type` enum('nouvelle_commande','statut_commande','paiement','livraison','promotion') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `titre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `est_lu` tinyint(1) DEFAULT '0',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_lecture` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_notifications_utilisateur` (`utilisateur_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paiements`
--

DROP TABLE IF EXISTS `paiements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paiements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `fedapay_transaction_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `montant` decimal(10,2) NOT NULL,
  `devise` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'XOF',
  `statut` enum('pending','approved','declined','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `methode_paiement` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_paiement` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `callback_data` json DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_paiement` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `commande_id` (`commande_id`),
  KEY `idx_paiements_fedapay` (`fedapay_transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paiements`
--

LOCK TABLES `paiements` WRITE;
/*!40000 ALTER TABLE `paiements` DISABLE KEYS */;
INSERT INTO `paiements` VALUES (1,5,'350800',3500.00,'XOF','pending',NULL,NULL,NULL,'2025-08-16 19:14:30',NULL),(2,6,'350817',3500.00,'XOF','approved',NULL,NULL,NULL,'2025-08-16 19:52:35',NULL),(3,7,'350911',3000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-17 10:28:31',NULL),(4,8,'350914',3000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-17 10:41:43',NULL),(5,9,'350915',3000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-17 10:53:33',NULL),(6,10,'350921',2500.00,'XOF','approved',NULL,NULL,NULL,'2025-08-17 11:25:26',NULL),(7,12,'351023',2500.00,'XOF','pending',NULL,NULL,NULL,'2025-08-17 21:12:12',NULL),(8,13,'351030',2500.00,'XOF','approved',NULL,NULL,NULL,'2025-08-17 21:22:12',NULL),(9,14,'351045',2500.00,'XOF','approved',NULL,NULL,NULL,'2025-08-17 22:42:09',NULL),(10,15,'351543',10000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-19 10:25:13',NULL),(11,16,'351557',4000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-19 10:42:17',NULL),(12,17,'351568',8000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-19 10:56:50',NULL),(13,18,'351579',3000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-19 11:09:23',NULL),(14,19,'351837',4000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-19 18:47:28',NULL),(15,20,'351841',8000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-19 18:55:41',NULL),(16,21,'351978',6500.00,'XOF','approved',NULL,NULL,NULL,'2025-08-20 09:32:05',NULL),(17,22,'352589',1500.00,'XOF','pending',NULL,NULL,NULL,'2025-08-21 14:50:12',NULL),(18,23,'352763',8000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-21 17:19:58',NULL),(19,24,'352769',10500.00,'XOF','pending',NULL,NULL,NULL,'2025-08-21 17:26:28',NULL),(20,25,'352781',3500.00,'XOF','pending',NULL,NULL,NULL,'2025-08-21 17:36:25',NULL),(21,26,'352805',8000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-21 18:12:11',NULL),(22,27,'353207',3500.00,'XOF','pending',NULL,NULL,NULL,'2025-08-22 19:25:27',NULL),(23,28,'353377',7000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-23 10:46:46',NULL),(24,29,'353379',7000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-23 10:50:12',NULL),(25,30,'353382',7000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-23 10:53:23',NULL),(26,31,'353383',7000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-23 11:02:26',NULL),(27,32,'353389',1500.00,'XOF','approved',NULL,NULL,NULL,'2025-08-23 11:21:37',NULL),(28,33,'353390',1500.00,'XOF','approved',NULL,NULL,NULL,'2025-08-23 11:26:13',NULL),(29,34,'353395',8000.00,'XOF','pending',NULL,NULL,NULL,'2025-08-23 11:47:00',NULL),(30,35,'353396',8000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-23 11:48:11',NULL),(31,36,'353402',8000.00,'XOF','approved',NULL,NULL,NULL,'2025-08-23 12:09:12',NULL),(32,37,'356746',3000.00,'XOF','approved',NULL,NULL,NULL,'2025-09-02 19:33:51',NULL),(33,38,'358140',1300.00,'XOF','approved',NULL,NULL,NULL,'2025-09-07 08:13:06',NULL);
/*!40000 ALTER TABLE `paiements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paniers`
--

DROP TABLE IF EXISTS `paniers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paniers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utilisateur_id` int DEFAULT NULL,
  `produit_id` int NOT NULL,
  `quantite` int NOT NULL,
  `date_ajout` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_panier_utilisateur` (`utilisateur_id`,`produit_id`),
  UNIQUE KEY `unique_panier_session` (`session_id`,`produit_id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paniers`
--

LOCK TABLES `paniers` WRITE;
/*!40000 ALTER TABLE `paniers` DISABLE KEYS */;
INSERT INTO `paniers` VALUES (24,'a2b60de1-ff58-4cff-a030-0a4593dd8e05',NULL,1,1,'2025-08-19 11:56:18','2025-08-19 11:56:18'),(38,'6fa69bf3-d58b-471e-90b7-c08fdd778cbb',NULL,2,1,'2025-08-20 14:48:55','2025-08-20 14:48:55'),(39,'ed10c5de-607d-45f8-86cd-7b0756612f98',NULL,1,1,'2025-08-20 15:36:17','2025-08-20 15:36:17'),(41,'7e8c51f7-5be1-4408-a283-b3ea2636d075',NULL,4,1,'2025-08-21 13:21:53','2025-08-21 13:21:53'),(47,'1bd4eebd-8332-4b3f-88ba-9092ee203127',NULL,5,2,'2025-08-21 18:08:56','2025-08-21 18:08:56'),(50,'b0a99b85-ee19-4b71-838f-d54264a86d8a',NULL,5,1,'2025-08-23 07:56:40','2025-08-23 07:56:40'),(62,'539c209c-ba49-4045-9ca0-acaacf36fc15',NULL,2,1,'2025-08-23 19:41:01','2025-08-23 19:41:01'),(86,'425bddd0-ca20-4d47-9503-e66e4d1b9f23',NULL,9,1,'2025-08-27 13:19:36','2025-08-27 13:19:36'),(88,NULL,3,9,1,'2025-08-31 12:25:33','2025-08-31 12:25:33'),(89,'3eb90918-23b0-4827-871f-88968c8e7eb1',NULL,3,1,'2025-09-02 17:26:44','2025-09-02 17:26:44'),(90,'9163ce6f-f404-4520-88c2-05af778690d4',NULL,7,1,'2025-09-02 19:31:41','2025-09-02 19:31:41'),(92,'db67dc8e-9b7c-4752-99f9-21e2216cf9e3',NULL,9,1,'2025-09-08 22:23:04','2025-09-08 22:23:04');
/*!40000 ALTER TABLE `paniers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametres_site`
--

DROP TABLE IF EXISTS `parametres_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametres_site` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cle` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `valeur` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('string','number','boolean','json') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_modification` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cle` (`cle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametres_site`
--

LOCK TABLES `parametres_site` WRITE;
/*!40000 ALTER TABLE `parametres_site` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametres_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produits`
--

DROP TABLE IF EXISTS `produits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_produit_id` int NOT NULL,
  `nom` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `quantite_contenant` int NOT NULL COMMENT 'Quantité en grammes (250, 500, 1000, etc.)',
  `type_contenant` enum('sachet','boite') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'sachet',
  `prix_unitaire` decimal(10,2) NOT NULL,
  `gestion_stock` enum('limite','illimite') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'limite',
  `stock_disponible` int DEFAULT '0',
  `stock_minimum` int DEFAULT '5',
  `statut` enum('actif','inactif','rupture_stock') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'actif',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_produits_type` (`type_produit_id`),
  KEY `idx_produits_statut` (`statut`),
  KEY `idx_produits_nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produits`
--

LOCK TABLES `produits` WRITE;
/*!40000 ALTER TABLE `produits` DISABLE KEYS */;
INSERT INTO `produits` VALUES (12,4,'Amande Blanche Entière (500g)','',500,'boite',2000.00,'limite',500,5,'actif','2025-09-09 14:01:32','2025-09-09 14:06:50'),(13,4,'Amande Blanche Entière (250g)',NULL,250,'sachet',2000.00,'limite',500,5,'actif','2025-09-09 14:11:34','2025-09-09 14:11:34'),(14,6,'Amande Torréfié Brisée 125g)',NULL,125,'boite',2000.00,'limite',500,5,'actif','2025-09-09 14:23:24','2025-09-09 14:23:24'),(15,5,'Amande Torréfié Entière (125g)',NULL,125,'boite',2000.00,'limite',500,5,'actif','2025-09-09 14:27:30','2025-09-09 14:27:30'),(16,6,'Amande Torréfié Brisée (500g)',NULL,500,'boite',2000.00,'limite',500,5,'actif','2025-09-09 14:29:32','2025-09-09 14:29:32'),(17,5,'Amande Torréfié Entière (250g)',NULL,250,'sachet',2000.00,'limite',500,5,'actif','2025-09-09 14:31:33','2025-09-09 14:31:33');
/*!40000 ALTER TABLE `produits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suivi_commandes`
--

DROP TABLE IF EXISTS `suivi_commandes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suivi_commandes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `statut` enum('en_attente','confirmee','en_preparation','expedie','livree','annulee') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `modifie_par` int DEFAULT NULL COMMENT 'ID de l''admin qui a changé le statut',
  `date_changement` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `commande_id` (`commande_id`),
  KEY `modifie_par` (`modifie_par`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suivi_commandes`
--

LOCK TABLES `suivi_commandes` WRITE;
/*!40000 ALTER TABLE `suivi_commandes` DISABLE KEYS */;
INSERT INTO `suivi_commandes` VALUES (1,10,'en_preparation','Statut mis à jour par l\'administrateur.',1,'2025-08-17 12:31:18'),(2,13,'en_preparation','Statut mis à jour par l\'administrateur.',1,'2025-08-17 22:22:59'),(3,13,'expedie','Statut mis à jour par l\'administrateur.',1,'2025-08-17 22:31:47'),(4,17,'en_preparation','Statut mis à jour par l\'administrateur.',1,'2025-08-19 14:55:13'),(5,15,'en_preparation','Statut mis à jour par l\'administrateur.',7,'2025-08-19 15:38:47'),(6,21,'en_preparation','Statut mis à jour par l\'administrateur.',7,'2025-08-20 12:51:42'),(7,33,'en_preparation','Statut mis à jour par l\'administrateur.',8,'2025-09-02 18:04:21'),(8,37,'annulee','Commande annulée par l\'administrateur. Stock restauré automatiquement.',1,'2025-09-07 15:07:24');
/*!40000 ALTER TABLE `suivi_commandes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_produits`
--

DROP TABLE IF EXISTS `types_produits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `nom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` enum('actif','inactif') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'actif',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_types_produits_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_produits`
--

LOCK TABLES `types_produits` WRITE;
/*!40000 ALTER TABLE `types_produits` DISABLE KEYS */;
INSERT INTO `types_produits` VALUES (4,5,'Amande Blanche Entière ','','https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757426204/benin_luxe_cajou/types_produits/qxqeodhtuzjqyaqkysce.jpg','actif','2025-09-09 13:56:45','2025-09-09 13:56:45'),(5,4,'Amande Torréfié Entière ','','https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757427468/benin_luxe_cajou/types_produits/cjo2fyragv93w6d2buwk.jpg','actif','2025-09-09 14:17:48','2025-09-09 14:17:48'),(6,4,'Amande Torréfié Brisée ','','https://res.cloudinary.com/dbaeu5rsy/image/upload/v1757427514/benin_luxe_cajou/types_produits/ez0la47qcinlptljdmi2.jpg','actif','2025-09-09 14:18:35','2025-09-09 14:18:35'),(7,5,'Amande Blanche Brisée ','',NULL,'actif','2025-09-09 14:21:27','2025-09-09 14:21:27');
/*!40000 ALTER TABLE `types_produits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mot_de_passe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Haché avec un algorithme robuste (bcrypt, argon2)',
  `role` enum('client','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'client',
  `statut` enum('actif','inactif','suspendu') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'actif',
  `email_verifie` tinyint(1) DEFAULT '0',
  `token_verification` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `derniere_connexion` timestamp NULL DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fcm_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token_creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'AMEN','Dalini ','dalinigba@gmail.com',NULL,'$2b$12$D3TFQBn28FWAlUlNMlobiuLDb2Eostejvs1mQJzb8IwOwsQD4j1u2','admin','actif',1,NULL,NULL,'2025-08-15 15:49:08','fhD8xEJ_TDKuPwAzdm7SnE:APA91bGLZbgQEmbD8bj-7O4JPHVq1P3PxL4jU462XNShqiWqvYlNJXbHbTaNm5UmZK3_sKsPgSfqB_uPXUxWmxQA_ABvKfUKiReTf5Ir_AIRvd9WS33giYA',NULL),(2,'GBAGUIDI','Dalini','daligba@gmail.com',NULL,'$2b$12$JkiJ0e5iPlRW7N.nJ1wx4uuJgvcX67j78N/gEeO.tXAmv/zNyj89.','client','actif',0,'706794',NULL,'2025-08-16 09:21:56',NULL,NULL),(3,'GBAGUIDI','Dalini','daligba83@gmail.com','+2290166707998','$2b$12$akhZWewEPSAlnwDswwatd.uH.ARi.1fNAObe1CIhQWe119OH4Q1ha','client','actif',1,NULL,NULL,'2025-08-16 09:24:48',NULL,NULL),(4,'Pythagore','Pythagore','pythagoreadjalla@gmail.com',NULL,'$2b$12$5GItR60qynAy8u5IwCOAgueVCIkCkVnGEZJRHxa7MqccVUrGQaXDK','client','actif',1,NULL,NULL,'2025-08-19 10:19:36',NULL,NULL),(5,'dali','amen','amelieame560@gmail.com',NULL,'$2b$12$Ep.ykR2qr6M3D4cx2u8D3.Z6KXKwcaVbZQPyCzgYLG6WVlboYAQ8q','admin','actif',1,NULL,NULL,'2025-08-19 10:19:55','dWbKmjA3R0ahzk0KeMqC6c:APA91bFGfgFOMOQ0OhCKc-NKxKQWYjRXfgh4rYYGDHhzO1W5J_Zfs7u7XRaK_vUM3-pb1-ZnISL8-oJ5LvpddX7bM2zEoo9gzh6h0zvGZUL37ktclebuD0Q',NULL),(6,'Emmerson2006','da MATHA','damathaemmersonmichel@gmail.com',NULL,'$2b$12$KrO7myf4rkMfdSgAcF7XH.KNTQQKEtrhAqdiTi0e0o8c/dfMgJu/q','client','actif',1,NULL,NULL,'2025-08-19 11:58:55',NULL,NULL),(7,'ADJALLA ','Pythagore ','adjallamanuel@gmail.com',NULL,'$2b$12$CiVOIp7kwwukpwl3A3eQv.iI.aofVbhV7cSCJTaQG/l3RBfLhc5vG','admin','actif',1,NULL,NULL,'2025-08-19 15:34:41','fxeMSgSSQUOJWCNN21-7Mf:APA91bF7PfdrhwOQKIWpEECxxypbsSzMtuLmEAti9V1YlHYAG1XjlZdn9stAyV2tJcKbrDjJuthYoS2CWURi_EgVBDSjBmclI1PVeYt2hZen45u3ESueYNs',NULL),(8,'Dmt','Merso','emmerson.copychief.dev@gmail.com',NULL,'$2b$12$9onghk9aV60cOH9e5RUOeOze/alqYeEY6Pp8KC5dlZfVfQU2IzJI.','admin','actif',1,NULL,NULL,'2025-08-19 20:00:34','dDOVbl_rTBuVsSpcwJ7KwA:APA91bGhxt4Dv0SkrB2HHGxDEId_kJyqp6DueveZ-x26htYfFqcu1Ir1cfBRXJBAj6fXuoSpyXrMmNftMPn0iKXRE8jDxWJvlYK4iWvms2K9tXj82n9IjDU',NULL),(9,'da MATHA ','Emmerson ','success2025lord@gmail.com',NULL,'$2b$12$rfbAlePNCdQ1OoY31HW8l./4YAuybk1r1rDb2gFR8QYee4yWpvl5a','admin','actif',1,NULL,NULL,'2025-08-20 15:55:11','dDOVbl_rTBuVsSpcwJ7KwA:APA91bGhxt4Dv0SkrB2HHGxDEId_kJyqp6DueveZ-x26htYfFqcu1Ir1cfBRXJBAj6fXuoSpyXrMmNftMPn0iKXRE8jDxWJvlYK4iWvms2K9tXj82n9IjDU',NULL),(10,'Shine','DMT',' emmersondmt.entrepreneur@gmail.com',NULL,'$2b$12$KlQ8f8o5eaSjUXJI/Ux2vOs/OCcbcAuDXYeDwl16sOfyZSPFw2NKK','client','actif',1,NULL,NULL,'2025-08-23 09:37:13',NULL,NULL),(11,'Dalini','Amen','dev03112005@gmail.com',NULL,'$2b$12$ox03fx2OSA7caVNhz4P5ruI9h0d0YgVongvNOa7lCyLxHbaD.so2q','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3MDY0NCwianRpIjoiOGM5NDM3MzItYTUxYy00MzZlLWE1YWUtODEyMmFjZWJmNDBiIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6ImRldjAzMTEyMDA1QGdtYWlsLmNvbSIsIm5iZiI6MTc1NTk3MDY0NCwiY3NyZiI6ImJmODFlOTliLWIwZTUtNDA3MC04MDNiLWNlNDliZTlhMzUzOSIsImV4cCI6MTc1NTk3MTU0NCwiY29kZV9oYXNoIjoiJDJiJDEyJGhGSUU4d2Q4QWtxSy45VHd4WFRIVnVaREZ1TC5lWHNSaXA2dkpwTC9reWZnUWRNQTREcXRTIn0.vf2YDhUOULgiUd83J1u3GA3YLmbaJNZYj6-yd0rcENY',NULL,'2025-08-23 17:37:25',NULL,NULL),(12,'Dalini','Amen','alexhitchens24@gmail.com',NULL,'$2b$12$S7iBBGpRS5IjaNarXABMdON18bovfqPwSN3jki61Bybvj50cVz22S','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3MTQ1NywianRpIjoiZjNlMWYwMGMtMjkxZC00ZDI4LTkwOTQtYjQ3N2RkNTI2MzJkIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6ImFsZXhoaXRjaGVuczI0QGdtYWlsLmNvbSIsIm5iZiI6MTc1NTk3MTQ1NywiY3NyZiI6IjM2MTZmMzdmLWY3NWItNGFjYi1hZGVkLTFlYjhlNWMxMWUyNSIsImV4cCI6MTc1NTk3MjM1NywiY29kZV9oYXNoIjoiJDJiJDEyJEY2aENEaE94aEJVMmpnUXRGL0I4NXVoMlVoelY4LmRPb2VYZzgzc2pkWmxaeGYxcGJKT3pHIn0.TgifvlRDS2I8Esm_yPd2-G5p9Lr2haCmT7DClYftIIU',NULL,'2025-08-23 17:50:59',NULL,NULL),(13,'GBAGUIDI','AMEN DALINI SELIDJI','amengba136@gmail.com',NULL,'$2b$12$TPqn2KNwKMZIRSUnVx5uA.JDHPD55AISrfAKkdy.3egrNp.W5PaAO','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3MTgyNiwianRpIjoiYjExMWExZTgtZDQxZS00MTE0LTk3YTItYmQ4M2FjZWMwZjFmIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6ImFtZW5nYmExMzZAZ21haWwuY29tIiwibmJmIjoxNzU1OTcxODI2LCJjc3JmIjoiOGZhMTU5MDItMTEyOS00MjA1LThmZGUtN2E2YTU1ZWNjMmMyIiwiZXhwIjoxNzU1OTcyNzI2LCJjb2RlX2hhc2giOiIkMmIkMTIkdkxOR3Y2VFg5LjhadzJFL0wuWE5mLkk1VGtSUngzQ3RyekdRM1NTbWNITTRUZnQuaFQxZUcifQ.0OoBdFqE_LwthOF588L0QB7oeAkTv3lta_fd03SOSjo',NULL,'2025-08-23 17:57:08',NULL,NULL),(14,'GBAGUIDI','AMEN DALINI SELIDJI','selidji8@gmail.com',NULL,'$2b$12$WnbcVdz.kaFR7Zf3ApYDN.Q8vARXKvCuIX57Wm922RTEaSkGIV0h.','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3MjEyMSwianRpIjoiNjcxY2FkZmEtZTY1NC00N2M5LTg1OTAtNDg1OWEwNzg3YTBhIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6InNlbGlkamk4QGdtYWlsLmNvbSIsIm5iZiI6MTc1NTk3MjEyMSwiY3NyZiI6ImM3YTIzZDQyLTM1ZDYtNGQ0My04ZmNkLWRiMTNmMmY2OWUxNiIsImV4cCI6MTc1NTk3MzAyMSwiY29kZV9oYXNoIjoiJDJiJDEyJGp1bGlXbkNDWEtLbWJVR1AvbVJWTmVDTW1lNFo1MnNiNzdoV2N2SUl1LlBqcW5OekRnZkZ1In0.3DGUeFUUflLCak0xMIx3mb2c-W61va14oXBxB4EvEyM',NULL,'2025-08-23 18:02:03',NULL,NULL),(15,'GBAGUIDI','AMEN DALINI SELIDJI','artemis03200519@gmail.com',NULL,'$2b$12$fNfxn6udNvYnXgv8hCilcO4HeqLhaXQrhqQA0/Uqfu9qNUcvzb7NO','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3MjQzMCwianRpIjoiYjY1NGExNzktNTc3Yy00Mjk4LThjYWEtZDRkZDRhYmRjZGFjIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6ImFydGVtaXMwMzIwMDUxOUBnbWFpbC5jb20iLCJuYmYiOjE3NTU5NzI0MzAsImNzcmYiOiI2ODM1ZmU3OC1mZGIyLTRmMWEtODJjOC0wZDYzODMxMjljOGEiLCJleHAiOjE3NTU5NzMzMzAsImNvZGVfaGFzaCI6IiQyYiQxMiRzWGlTNS8xMXpGWmE2RlJySFJ3RFV1bk8vNTR4TnkyZEIwZVQzaFdUVFEyaE03OEpyUmZ2eSJ9.M77nIxdXRDTLgYBZ1NI4SugQTqugUYMHvvlyZGCMIhU',NULL,'2025-08-23 18:07:12',NULL,NULL),(16,'amen','dali','ultrasecure86@gmail.com',NULL,'$2b$12$kw3GAstr1iAMxL9BOa2.GOMhbFGVq4LcEN0ZAOoMiDw0soue12jqW','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3MzI0MiwianRpIjoiNWQ1ZDFlNTEtZWFkNy00NzliLWE5OWYtZjVkYmMyOTBkMjZkIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6InVsdHJhc2VjdXJlODZAZ21haWwuY29tIiwibmJmIjoxNzU1OTczMjQyLCJjc3JmIjoiMWFlNWI5NzUtMjM4NS00NTUzLWEzZTgtZWM2MDA0NGY3ZjQ4IiwiZXhwIjoxNzU1OTc0MTQyLCJjb2RlX2hhc2giOiIkMmIkMTIkb3l1LldQdVJnY1VFb3gxelNwQVMzdVpwai52VW5RcWhVT1JsdzlpQ3JidEt1S09wTG5SNHEifQ.y_EQWmAxkJ0YtZ2qkmxxl_eKZLp6ZijxB8Bfq3M8Lbo',NULL,'2025-08-23 18:20:43',NULL,NULL),(17,'b','dali','d8200015@gmail.com',NULL,'$2b$12$a5sqQf.ZmRD9/or8FsUgg.VFAMtdhvSA816.bCV8XRZsHLDt2yMoS','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3NDA2MiwianRpIjoiMzBlMzc1NjUtMzAxZS00ZmU3LWE3YmEtOTVmYzZmNDEzNTRlIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6ImQ4MjAwMDE1QGdtYWlsLmNvbSIsIm5iZiI6MTc1NTk3NDA2MiwiY3NyZiI6IjRkMDk3NWIwLTMzZjQtNGQ3YS1hNThlLTJlYjNjMGZlMTBkNyIsImV4cCI6MTc1NTk3NDk2MiwiY29kZV9oYXNoIjoiJDJiJDEyJEcwWjY0YTV5Tm1ibjVlYi5JVG1nUy5KczlNSG5yWEdodm1uREk5ajZNeDBEUC9TR0VUZmMuIn0.I0XVxH_Q7zrZZfz36YaQZ-IXCpqCWTDsCx5wdPS30Cw',NULL,'2025-08-23 18:34:24',NULL,NULL),(18,'no','dal','noctis833@gmail.com',NULL,'$2b$12$Tre1OmKHkPagBO1N2BFvzuFG8vPOmschqWHRope.x4UjNvQNi5GEG','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3NDQ2OSwianRpIjoiODg5NDIwOGQtNDM1NS00YmNmLWIxN2QtODczZTMzNTFjOWMwIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6Im5vY3RpczgzM0BnbWFpbC5jb20iLCJuYmYiOjE3NTU5NzQ0NjksImNzcmYiOiIyNzEyM2ZlYi0wYjI4LTQyYzktODY0NC0zZmI2MmJkOGU0OTQiLCJleHAiOjE3NTU5NzUzNjksImNvZGVfaGFzaCI6IiQyYiQxMiQuSC9DQXN4bHJXQnd1YXUvVElxUW9PVUFGd0xCUlNFWXBTZ0JZUXNBMG1yajN5N2VRLmxhTyJ9.QqBQqTOuYoT9xg1mS_zNrOQ91vzk9KzZqReChcIbujU',NULL,'2025-08-23 18:41:11',NULL,NULL),(19,'Dalini','Amen','d1352517@gmail.com',NULL,'$2b$12$zkjhV/Dm4Kkl10PH4WVQd.hPNiEVxoXhGjOlM4LWhvUDTKhzNVLei','client','actif',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NTk3NjA5OCwianRpIjoiMTI1ZDdhMTYtM2VmMC00NDU0LWJlZTYtOTNhNjk3ZmUwYWIyIiwidHlwZSI6InZlcmlmaWNhdGlvbiIsInN1YiI6ImQxMzUyNTE3QGdtYWlsLmNvbSIsIm5iZiI6MTc1NTk3NjA5OCwiY3NyZiI6ImFkNTA1YjgyLTczODYtNGMzYi1iYWU5LTg4ODMwZWEwZDJiZSIsImV4cCI6MTc1NTk3Njk5OCwiY29kZV9oYXNoIjoiJDJiJDEyJG4vUU55ZjdDSWpXd1NTYzZORDd1Z3VPcmYwVHl5TG5KZ3I3bWZ6ajhtZG1Rc1NJSnBLMUZLIn0.SNrgfAi7mt3zqYeL9IlZOkrUZoq-MSff3tFgGWW44d4',NULL,'2025-08-23 18:53:00',NULL,NULL),(20,'Amen','Dali','d37681275@gmail.com',NULL,'$2b$12$0Xs1Ek8sBEvu6e45M0pQ8uD02DI1TGB60vvr1uQxTo5f/w.ytVF12','client','actif',1,NULL,NULL,'2025-08-23 19:15:43',NULL,NULL),(21,'BRAYDEN 🥷','Charbel','aforacharbel159@gmail.com',NULL,'$2b$12$n99jUTRgMJ73snuAfdGhg.pIpzUTDe6lOEcQtClPD1C4FYf9fgR6u','client','actif',1,NULL,NULL,'2025-08-24 09:09:55',NULL,NULL);
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zones_livraison`
--

DROP TABLE IF EXISTS `zones_livraison`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zones_livraison` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_zone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `villes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Liste des villes séparées par virgule, ou JSON',
  `tarif_livraison` decimal(8,2) NOT NULL,
  `delai_livraison_jours` int DEFAULT '3',
  `actif` tinyint(1) DEFAULT '1',
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones_livraison`
--

LOCK TABLES `zones_livraison` WRITE;
/*!40000 ALTER TABLE `zones_livraison` DISABLE KEYS */;
INSERT INTO `zones_livraison` VALUES (1,'oueme','Porto-novo, misserete, Dangbo',1000.00,1,1,'2025-08-16 15:07:36');
/*!40000 ALTER TABLE `zones_livraison` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-09 19:14:16
