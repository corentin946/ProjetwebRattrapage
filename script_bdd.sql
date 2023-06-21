create database TimeToEat;
-- Création de la table "personne"
CREATE TABLE personne (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL
);

-- Création de la table "tuto"
CREATE TABLE tuto (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titre VARCHAR(255) NOT NULL,
  lien VARCHAR(5000) NOT NULL,
  personne_id INT NOT NULL,
  description VARCHAR(5000),
  FOREIGN KEY (personne_id) REFERENCES personne(id)
);