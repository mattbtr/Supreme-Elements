const helper = require('../helper.js');
const AdresseDao = require('./adresseDao.js');

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
       
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Person WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(anrede = 'Herr', vorname = '', nachname = '', telefonnummer = '', email = '', strasse =  '', hausnummer =  '', plz =  '', ort =  '') {
        var sql = 'INSERT INTO Person (id, anrede, vorname, nachname, telefonnummer, email, strasse, hausnummer, plz, ort) VALUES (?,?,?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [(helper.strStartsWith(anrede, 'He') ? 0 : 1), vorname, nachname, telefonnummer, email, strasse, hausnummer, plz, ort];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, anrede = 'Herr', vorname = '', nachname = '', adresseId = 1, telefonnummer = '', email = '', geburtstag = null) {
        var sql = 'UPDATE Person SET anrede=?,vorname=?,nachname=?,adresseId=?,telefonnummer=?,email=?,geburtstag=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [(helper.strStartsWith(anrede, 'He') ? 0 : 1), vorname, nachname, adresseId, telefonnummer, email, (helper.isNull(geburtstag) ? null : helper.formatToSQLDate(geburtstag)), id];
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