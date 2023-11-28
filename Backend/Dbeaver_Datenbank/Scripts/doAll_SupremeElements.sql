--PRAGMA foreign_keys = OFF;

DROP TABLE if exists Mehrwertsteuer;
DROP TABLE if exists Produkt;
DROP TABLE if exists Person;
DROP TABLE if exists Bestellung;
DROP TABLE if exists Bestellposition;
drop table if exists Kontaktaufnahme;
drop table if exists Newsletter;

--UPDATE people
--SET address_id = NULL;

--PRAGMA foreign_keys = ON;



-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Create Table Statements

-- ------------------------------
-- Produkte

CREATE TABLE Produkt (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	mehrwertsteuerId INTEGER NOT NULL,
	details TEXT DEFAULT NULL,
	nettopreis REAL NOT NULL DEFAULT 0.0,
	verfuegbarkeit INTEGER DEFAULT NULL,
  	produktbild TEXT NOT NULL,
  	CONSTRAINT fk_Produkt2 FOREIGN KEY (mehrwertsteuerId) REFERENCES Mehrwertsteuer(id)
);

-- ------------------------------
-- Person, Adresse

CREATE TABLE Person (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	anrede INTEGER NOT NULL DEFAULT 0,
	vorname TEXT NOT NULL,
	nachname TEXT NOT NULL,
	telefonnummer TEXT NOT NULL,
	email TEXT NOT NULL,
    strasse TEXT NOT NULL,
	hausnummer TEXT NOT NULL, 
	plz TEXT NOT NULL,
	ort TEXT NOT NULL
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

CREATE TABLE Mehrwertsteuer (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	steuerSatz REAL NOT NULL DEFAULT 19.0
);

CREATE table Newsletter (
	id Integer not null primary key autoincrement,
	email text not null
);

CREATE table Kontaktaufnahme (
	id integer not null primary key autoincrement,
	vorname text not null,
	nachname text not null,
	email text not null,
	nachricht text not null
);





-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Supreme Elements
-- Insert Statements

-- ------------------------------

-- Produkt
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (1, 'Beatiful', '100mg Q10 Coenzym + 100mg Hyalauronsäure + ', 1, 'Beautiful – Liposomales Coezym Q10, Hyaluronsäure, Biotin, Zink, Folsäure (Quatrefolic®), Vitamin C /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nCoenzym Q10 100 mg /nHyaluronsäure 100 mg /nVitamin C 100 mg /nZink 15 mg /nbioaktive Folsäure als reines L-Methylfolat (Quatrefolic®) 500 µg /nBiotin 50 µg /nGeschmack: Grüner Apfel /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 21.99 , 34, 'Bilder/Beatiful.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (2, 'Fireshield', '500mg Vitamin C + 500mg MSM', 1,  'Fireshield – Liposomales Astaxanthin,  Curcumin, MSM, Vitamin C /n/nFlascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml:/n/nVitamin C 500 mg /nMSM 500 mg /nCurcumin 100 mg /n
Astaxanthin 8 mgGeschmack: Orange / Vanille /n/nVegan, kein Kaliumsorbat, kein Alkohol, nur natürliche Geschmacksstoffe /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 29.99 , 76, 'Bilder/Fireshield.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (3, 'Essentials', '150mg Magnesium + 50mg Vitamin B12', 1, 'Essentials – Liposomales Vitamin D3 + Vitamin K2-MK7 + Vitamin B 12 + Magnesium /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nMagnesium 150 mg /nVitamin B12 500µg /nVitamin D3 125 µg (5.000IE) /nVitamin K2 100 µg /nGeschmack: Vanille / Passionsfrucht /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 37.99 , 12, 'Bilder/Essentials.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (4, 'Focus', '4mg Spermidin', 1, 'Spermidin – liposomales Spermidin /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/n Inhaltsstoffe bei 10 ml: /n/nSpermidin 4mg /nGeschmack: Orange-Geschmack /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 12.99 , 4, 'Bilder/Focus.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (5, 'Vitamin C', '500mg Vitamin C + 100mg Zink', 1, 'Vitamin C – Liposomales Vitamin C /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nVitamin C (Natriumascorbat) 2.000 mg /nGeschmack: Orange/nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 45.99 , 139, 'Bilder/VitaminC.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (6, 'Sleep +', '1mg Melatonin + 1mg L-Tryptophan', 1, 'Sleep+ –  Liposomales Melatonin, L-Tryptophan /n/n
Flascheninhalt: 100 ml /nEmpf. Tagesdosis: 2 ml (Vorrat für volle 2 Monate) /n/n Inhaltsstoffe bei 2 ml: /n/nL-Tryptophan mg /nMelatonin 1 mg /nGeschmack: Honig & Lavendel /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 14.99 , 22, 'Bilder/sleep.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (7, 'Multivitamin', '200mg Vitamin C + 32mg Vitamin B3', 1, 'Liposomales Multivitamin Präparat /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nVitamin C 200 mg /nVitamin B3 32 mg /nVitamin E 24 mg /nVitamin B5 10 mg /nVitamin B2 3,4 mg /nVitamin B1 3 mg /nVitamin B6 2 mg /nVitamin A 1,6 mg /nFolsäure 400 μg /nBiotin 100 μg /nVitamin K2MK-7 80 μg /nChrom 80 μg /nKaliumjodid 60 μg /nCoenzym Q10 20 μg /nVitamin D3 20 μg /nVitamin B12 10 μg /nGeschmack: Orange /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 33.99 , 3, 'Bilder/beatiful.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (8, 'Glutathion', '400mg Glutathion + 200mg Resveratrol', 1, 'Liposomales Glutathion, Resveratrol, R-Alpha Liponsäure, Vitamin C /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nGlutathion 400 mg /nResveratrol 200mg /nVitamin C 175 mg /nR-Alpha Liponsäure 100 mg /nGeschmack: Orange /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 61.99 , 99, 'Bilder/Gluathion.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (9, 'Astaxanthin', '8mg Astaxanthin', 1, 'Liposomales Astaxanthin /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 5 ml (ca.50 Portionen) /n/nInhaltsstoffe bei 5 ml: /n/nAstaxanthin 8 mg /nGeschmack: Kirsche /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 45.99 , 34, 'Bilder/Astaxanthin.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (10, 'Magnesium', '200mg Magnesium', 1, 'Magnesium – liposomales Magnesium /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nMagnesium 200mg /nGeschmack: Apfel-Geschmack /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 25.99 , 77, 'Bilder/Magnesium.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (11, 'B-Komplex', '24mg Vitamin B3 Niacin + 12mg Vitamin B5 Panthothsäure', 1, 'Liposomaler Vitamin B-Komplex /n/n
Nahrungsergänzungsmittel mit Süßungsmittel /n/nHochdosiert | 100 % vegan | Geschmack: Blutorange /n/nFlascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nVitamin B3 Niacin 24mg /nVitamin B5 Pantothensäure 12mg /nVitamin B6 Pyridoxin 2,8mg /nVitamin B1 Thiamin 2,2mg /nVitamin B2 Riboflavin 2,1mg /nVitamin B9 Folsäure 300µg /nVitamin B12 Methylcobalamin 250µg /nVitamin B7 Biotin 100µg /nGeschmack: Drachenfrucht-Geschmack /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank /n/n250 ml Glasflasche /nGrundpreis 9,96€ / 100 ml', 21.99 , 11, 'Bilder/B-komplex.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (12, '5-HTP', '300mg Vitamin C + 50mg Zink', 1, '5-HTP – liposomales 5-HTP /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/n  Inhaltsstoffe bei 10 ml: /n/nVitamin C 300mg /nZink 50mg /nGeschmack: Aprikose-Geschmack /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 52.99 , 8, 'Bilder/5HTP.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (13, 'Just C', '2000mg Vitamin C', 1, 'Just C – Liposomales Vitamin C /n/n
Nur 6 Zutaten – kein Geschmack – absolut natürlich /n/nFlascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nVitamin C 2.000 mg /nGeschmack: kein Geschmack / natürlich /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 82.99 , 3, 'Bilder/JustC.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (14, 'Nattokinase', '200mg Nattokinase', 1, 'Liposomale Nattokinase /n/n
Hochdosiert | 100 % vegan | Ohne Zusätze /n/nLiposomale Nattokinase /n/nFlascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nNattokinase 200mg /nGeschmack: Honig – Lavendel -Geschmack /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank /n/n250 ml Glasflasche /n
Grundpreis 11,56€ / 100 ml', 9.99 , 40, 'Bilder/Nattokinase.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (15, 'Silizum', '200mg Silizium (aus Bambusextrakt)', 1, 'Liposomales Silizium /n
Hochdosiert | 100 % vegan | Ohne Zusätze /n/nFlascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/n Silizium (aus Bambusextrakt) 200mg /nGeschmack: Zitrone / Minze /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank /n/n250 ml Glasflasche /nGrundpreis 11,16€ / 100 ml', 99.99 , 10, 'Bilder/Silizum.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (16, 'Quercetin', '300mg Quercetin (aus Sophora Japonica)', 1, 'Quercetin – liposomales Quercetin /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nQuercetin 300mg /n(aus Sophora Japonica) /nGeschmack: Orange-Geschmack /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 33.99 , 40, 'Bilder/Quertecin.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (17, 'Ashwaganda', '300mg Vitamin C + 250mg Ashwagandhaexrakt', 1, 'Ashwagandha – liposomales Ashwagandha und Vitamin C /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nVitamin C 300mg /nAshwagandhaextrakt 250mg /n davon Withanolide 25mg /nGeschmack: Aprikose-Geschmack /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 21.99 , 34, 'Bilder/Ashwaganda.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (18, 'Immune', '1000mg Vitamin C + 200mg OPC', 1, 'Immune – Liposomales Vitamin C, OPC, Zink /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/nInhaltsstoffe bei 10 ml: /n/nVitamin C 1.000 mg /nOPC 200 mg /nZink 15 mg /nGeschmack: Mango /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 6.99 , 0, 'Bilder/Immune.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (19, 'Eisen', '15mg Eisen', 1, 'Eisen –  Liposomales Eisen /n/n
Flascheninhalt: 100 ml /nEmpf. Tagesdosis: 4 ml (25 Portionen) /n/nInhaltsstoffe bei 4 ml: /n/nEisen 15 mg /nGeschmack: Kirsche / Vanille /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 21.99 , 0, 'Bilder/Eisen.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild) VALUES (20, 'Sunshine', '200mg Vitamin K2 + 125mg Vitamin D3', 1, 'Sunshine – liposomales Vitamin D3 / K2-MK7 /n/n
Flascheninhalt: 250 ml /nEmpf. Tagesdosis: 10 ml /n/n Inhaltsstoffe bei 10 ml: /n/nVitamin K2 200 µg /nVitamin D3 (5.000 IE) 125 µg /nGeschmack: Vanille-Mango-Geschmack /nHaltbarkeit: Ungeöffnet 12 Monate haltbar, nach dem Öffnen 8 Wochen im Kühlschrank', 21.99 , 34, 'Bilder/Sunshine.png');


-- Person + Adresse 
--  anrede: 1 = Herr, 2 = Frau, 3 = Divers, 0= Keine Angabe --> für Verarbeitung von Website

-- Bsp Datensatz für eine Person:
insert into Person (id, anrede, vorname, nachname, telefonnummer, email, strasse, hausnummer, plz, ort)VALUES(1, 1, 'Max', 'Mustermann', 00000000000, 'max@muster.de', 'Musterweg', '1A', '00000', 'Musterstadt');


-- ------------------------------
-- Bestellwesen

-- Bestellung
-- Format für Datum oder Zeipunkt: TEXT as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS")
INSERT INTO Bestellung (id, bestellzeitpunkt, bestellerId) VALUES (1, '2023-13-11 17:19:234', 1);
INSERT INTO Bestellung (id, bestellzeitpunkt, bestellerId) VALUES (2, '2022-12-01 16:20:211', 1);


-- Bestellposition
INSERT INTO Bestellposition (id, bestellungId, produktId, menge) VALUES (1, 1, 1, 3);
INSERT INTO Bestellposition (id, bestellungId, produktId, menge) VALUES (2, 1, 3, 1);
INSERT INTO Bestellposition (id, bestellungId, produktId, menge) VALUES (3, 2, 1, 1);

-- MWST
INSERT INTO Mehrwertsteuer (bezeichnung, steuerSatz) VALUES ('Standard', 19.0);

-- Newsletter 
-- Test-Datensatz
insert into Newsletter(id, email) values (1, 'max@mustermann.de');


-- Kontaktaufnahme
--Test-Datensatz 
insert into Kontaktaufnahme(id, vorname, nachname, email, nachricht) values (1, 'Max', 'Mustermann', 'max@mustermann.de', 'Wie kann ich eine Bestellung stornieren?');
commit;