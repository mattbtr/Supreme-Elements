-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Supreme Elements
-- Insert Statements

-- ------------------------------

-- Mehrwertsteuer
INSERT INTO Mehrwertsteuer (id, bezeichnung, steuerSatz) VALUES (1, 'Standard', 19.0);
INSERT INTO Mehrwertsteuer (id, bezeichnung, steuerSatz) VALUES (2, 'Reduziert', 7.0);

-- ------------------------------

-- Produkt
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (1, 'Beatiful', '100mg Q10 Coenzym + 100mg Hyalauronsäure + ', 1, 'details bsp', 21.99 , 34, 'Bilder/Beatiful.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (2, 'Fireshield', '500mg Vitamin C + 500mg MSM', 1,  'beispiel details text', 29.99 , 76, 'Bilder/Fireshield.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (3, 'Essentials', '150mg Magnesium + 50mg Vitamin B12', 1, 'beispiel details text', 37.99 , 12, 'Bilder/Essentials.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (4, 'Focus', '4mg Spermidin', 1, 'beispiel details text', 12.99 , 4, 'Bilder/Focus.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (5, 'Vitamin C', '500mg Vitamin C + 100mg Zink', 1, 'beispiel details text', 45.99 , 139, 'Bilder/VitaminC.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (6, 'Sleep +', '1mg Melatonin + 1mg L-Tryptophan', 1, 'beispiel details text', 14.99 , 22, 'Bilder/sleep.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (7, 'Multivitamin', '200mg Vitamin C + 32mg Vitamin B3', 1, 'beispiel details text', 33.99 , 3, 'Bilder/beatiful.pn');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (8, 'Glutathion', '400mg Glutathion + 200mg Resveratrol', 1, 'beispiel details text', 61.99 , 99, 'Bilder/Gluathion.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (9, 'Astaxanthin', '8mg Astaxanthin', 1, 'beispiel details text', 45.99 , 34, 'Bilder/Astaxanthin.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (10, 'Magnesium', '200mg Magnesium', 1, 'beispiel details text', 25.99 , 77, 'Bilder/Magnesium.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (11, 'B-Komplex', '24mg Vitamin B3 Niacin + 12mg Vitamin B5 Panthothsäure', 1, 'beispiel details text', 21.99 , 11, 'Bilder/B-komplex.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (12, '5-HTP', '300mg Vitamin C + 50mg Zink', 1, 'beispiel details text', 52.99 , 8, 'Bilder/5HTP.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (13, 'Just C', '2000mg Vitamin C', 1, 'beispiel details text', 82.99 , 3, 'Bilder/JustC.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (14, 'Nattokinase', '200mg Nattokinase', 1, 'beispiel details text', 9.99 , 40, 'Bilder/Nattokinase.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (15, 'Silizum', '200mg Silizium (aus Bambusextrakt)', 1, 'beispiel details text', 99.99 , 10, 'Bilder/Silizum.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (16, 'Quercetin', '300mg Quercetin (aus Sophora Japonica)', 1, 'beispiel details text', 33.99 , 40, 'Bilder/Quertecin.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (17, 'Ashwaganda', '300mg Vitamin C + 250mg Ashwagandhaexrakt', 1, 'beispiel details text', 21.99 , 34, 'Bilder/Ashwaganda.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (18, 'Immune', '1000mg Vitamin C + 200mg OPC', 1, 'beispiel details text', 6.99 , 0, 'Bilder/Immune.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (19, 'Eisen', '15mg Eisen', 1, 'beispiel details text', 21.99 , 0, 'Bilder/Eisen.png');
INSERT INTO Produkt (id, bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeeit, produktbild) VALUES (20, 'Sunshine', '200mg Vitamin K2 + 125mg Vitamin D3', 1, 'beispiel details text', 21.99 , 34, 'Bilder/Sunshine.png');


-- Person + Adresse 
--  anrede: 1 = Herr, 2 = Frau, 3 = Divers, 0= Keine Angabe --> für Verarbeitung von Website

-- Bsp Datensatz für eine Person:
insert into Person (id, anrede, vorname, nachname, telefonnummer, email, strasse, hausnummer, adresszusatz, plz, ort)VALUES(1, 1, 'Max', 'Mustermann', 00000000000, 'max@muster.de', 'Musterweg', '1A', 'Bsp Adresszusatz', '00000', 'Musterstadt');


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