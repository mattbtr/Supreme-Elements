const helper = require('../helper.js');
/*const AdresseDao = require('./adresseDao.js');*/

class PersonDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
    }

    loadAll() {
        /*const adresseDao = new AdresseDao(this._conn); */

        var sql = 'SELECT * FROM Person';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            if (result[i].anrede == 1) 
                result[i].anrede = 'Herr';
            else if (result[i].anrede == 2) 
                result[i].anrede = 'Frau';
            else if (result[i].anrede == 3) 
                result[i].anrede = 'Divers';
            else 
                result[i].anrede = 'Keine Angabe';

            /*result[i].geburtstag = helper.formatToGermanDate(helper.parseSQLDateTimeString(result[i].geburtstag));
            
            result[i].adresse = adresseDao.loadById(result[i].adresseId);
            delete result[i].adresseId; */
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Person WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }
//--  anrede: 1 = Herr, 2 = Frau, 3 = Divers, 0= Keine Angabe 
    create(anrede = '', vorname = '', nachname = '', telefonnummer = '', email = '', strasse = '', hausnummer = '', plz = '', ort = '') {
        var sql = 'INSERT INTO Person (anrede, vorname, nachname, telefonnummer, email, strasse, hausnummer, plz, ort) VALUES (?,?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [(helper.strStartsWith(anrede, 'He') ? 1 : 2), vorname, nachname, telefonnummer, email, strasse, hausnummer, plz, ort]
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, anrede = 'Herr', vorname = '', nachname = '', telefonnummer = '', email = '', strasse = '', hausnummer = '', plz = '', ort = '') {
        var sql = 'UPDATE Person SET anrede=?,vorname=?,nachname=?,telefonnummer=?,email=?,strasse=?,hausnummer=?, plz=?, ort=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        // parameter noch anpassen für anrede !! --> nicht nur herr und frau
        var params = [(helper.strStartsWith(anrede, 'He') ? 0 : 1), vorname, nachname, telefonnummer, email, strasse, hausnummer, plz, ort, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Person WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('PersonDao [_conn=' + this._conn + ']');
    }
}

module.exports = PersonDao;
