const helper = require('../helper.js');
const MehrwertsteuerDao = require('./mehrwertsteuerDao.js');

class ProduktDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);

        var sql = 'SELECT * FROM Produkt WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result.mehrwertsteuer = mehrwertsteuerDao.loadById(result.mehrwertsteuerId);
        delete result.mehrwertsteuerId;

        result.mehrwertsteueranteil = helper.round((result.nettopreis / 100) * result.mehrwertsteuer.steuerSatz);

        result.bruttopreis = helper.round(result.nettopreis + result.mehrwertsteueranteil);

        return result;
    }

    // Funktion, um Highlights aus der Datenbank in Slider zu laden

    loadHighlights() {
        const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);

        var sql = 'SELECT * FROM Produkt WHERE isHighlight=1';      // SQL Statement, um die Highlights zu filtern
        var statement = this._conn.prepare(sql);
        var result = statement.all();                       //all() funktion liefert produkte als array zurück

        if (helper.isUndefined(result)) 
            throw new Error('No Record found for Highlight');

        for (var i = 0; i < result.length; i++) {
            result[i].mehrwertsteuer = mehrwertsteuerDao.loadById(result[i].mehrwertsteuerId);
            delete result[i].mehrwertsteuerId;

            result[i].mehrwertsteueranteil = helper.round((result[i].nettopreis / 100) * result[i].mehrwertsteuer.steuerSatz);
            result[i].bruttopreis = helper.round(result[i].nettopreis + result[i].mehrwertsteueranteil);
        }

        return result;
    }

    loadAll() {
       // const produktkategorieDao = new ProduktkategorieDao(this._conn);
        const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);
        //const produktbildDao = new ProduktbildDao(this._conn);
        //const downloadDao = new DownloadDao(this._conn);

        var sql = 'SELECT * FROM Produkt';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        

  /*          if (helper.isNull(result[i].datenblattId)) {
                result[i].datenblatt = null;
            } else {
                result[i].datenblatt = downloadDao.loadById(result[i].datenblattId);
            }
            delete result[i].datenblattId;
*/         for (var i = 0; i < result.length; i++) {
                result[i].mehrwertsteuer = mehrwertsteuerDao.loadById(result[i].mehrwertsteuerId);
                delete result[i].mehrwertsteuerId;

                result[i].mehrwertsteueranteil = helper.round((result[i].nettopreis / 100) * result[i].mehrwertsteuer.steuerSatz);
                result[i].bruttopreis = helper.round(result[i].nettopreis + result[i].mehrwertsteueranteil);

}

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Produkt WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create( bezeichnung = '', beschreibung = '', mehrwertsteuerId = 1, details = null, nettopreis = 0.0, verfuegbarkeit = 0, produktbild = "") {

        var sql = 'INSERT INTO Produkt (bezeichnung,beschreibung,mehrwertsteuerId,details,nettopreis,verfuegbarkeit, produktbild) VALUES (?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

       /* if (produktbild.length > 0) {
            for (var element of produktbild) {
                produktbildDao.create(element.bildpfad, result.lastInsertRowid);
            }
        }*/

        return this.loadById(result.lastInsertRowid);
    }

    update(id, bezeichnung = '', beschreibung = '', mehrwertsteuerId = 1, details = null, nettopreis = 0.0, verfuegbarkeit = 0, produktbild = "") {
    
        var sql = 'UPDATE Produkt SET bezeichnung=?,beschreibung=?,mehrwertsteuerId=?,details=?,nettopreis=?,verfuegbarkeit=?, produktbild=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [ bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, verfuegbarkeit, produktbild, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        /*if (produktbild.length > 0) {
            for (var element of bilder) {
                produktbildDao.create(element.bildpfad, id);
            }
        }*/

        return this.loadById(id);
    }



    toString() {
        console.log('ProduktDao [_conn=' + this._conn + ']');
    }
}

module.exports = ProduktDao;