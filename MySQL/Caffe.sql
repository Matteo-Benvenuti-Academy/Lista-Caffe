DROP DATABASE IF EXISTS lista_caffe;
CREATE DATABASE lista_caffe;
USE lista_caffe;

CREATE TABLE Caffe(
	caffeID INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR(250) NOT NULL,
    cognome VARCHAR(250) NOT NULL,
	caffe INTEGER NOT NULL,
    moltiplicatore INTEGER NOT NULL,
	uniqueCode VARCHAR(250) NOT NULL UNIQUE
);

INSERT INTO Caffe (nome, cognome, caffe, moltiplicatore,uniquecode) VALUES
('Velerio', 'Lucarelli',10,3,"VALER1ONE"),
('Matteo', 'Benvenuti',10,3,"Coglione");

SELECT * FROM Caffe;