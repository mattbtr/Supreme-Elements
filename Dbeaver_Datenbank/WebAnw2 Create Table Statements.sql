-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Create Table Statements

-- ------------------------------
-- Produkte

CREATE TABLE Mehrwertsteuer (  -- heiß wir mach mehrwertsteuer dann eigene tabelle.
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	steuerSatz REAL NOT NULL DEFAULT 19.0
);

CREATE TABLE Produkt (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	mehrwertsteuerId INTEGER NOT NULL,
	details TEXT DEFAULT NULL,
	nettopreis REAL NOT NULL DEFAULT 0.0,
	verfuegbarkeit INTEGER DEFAULT NULL,
  produktbild TEXT NOT NULL,
	CONSTRAINT fk_Produkt1 FOREIGN KEY (mehrwertsteuerId) REFERENCES Mehrwertsteuer(id)
);

-- ------------------------------
-- Person, Adresse

CREATE TABLE Person (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	anrede INTEGER NOT NULL DEFAULT 0,
	vorname TEXT NOT NULL,
	nachname TEXT NOT NULL,
	--adresseId INTEGER NOT NULL, --> ist überflüssig, weil alle daten eingebettet in Person
	telefonnummer TEXT NOT NULL,
	email TEXT NOT NULL,
  strasse TEXT NOT NULL,
	hausnummer TEXT NOT NULL,
	adresszusatz TEXT NOT NULL, -- warum not null? hat ja nicht jeder einen adresszusatz oder?
	plz TEXT NOT NULL,
	ort TEXT NOT NULL,
);

-- ------------------------------
-- Bestellwesen

CREATE TABLE Bestellung (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bestellzeitpunkt TEXT NOT NULL,
	bestellerId INTEGER DEFAULT NULL,
	CONSTRAINT fk_Bestellung1 FOREIGN KEY (bestellerId) REFERENCES Person(id),
);

CREATE TABLE Bestellposition (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bestellungId INTEGER NOT NULL, -- für zuweisung der einzelnen Bestellpositionen zu der zugehörigen bestellung
	produktId INTEGER NOT NULL,
	menge INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT fk_Bestellposition1 FOREIGN KEY (bestellungId) REFERENCES Bestellung(id),
	CONSTRAINT fk_Bestellposition2 FOREIGN KEY (produktId) REFERENCES Produkt(id)
);