const helper = require('../helper.js');

class KontaktaufnahmeDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
    }

    loadAll() {

        var sql = 'SELECT * FROM Kontaktaufnahme';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
/*
        for (var i = 0; i < result.length; i++) {
            if (result[i].anrede == 1) 
                result[i].anrede = 'Herr';
            else if (result[i].anrede == 2) 
                result[i].anrede = 'Frau';
            else if (result[i].anrede == 3) 
                result[i].anrede = 'Divers';
            else 
                result[i].anrede = 'Keine Angabe';

            result[i].geburtstag = helper.formatToGermanDate(helper.parseSQLDateTimeString(result[i].geburtstag));
            
            result[i].adresse = adresseDao.loadById(result[i].adresseId);
            delete result[i].adresseId; 
        }*/

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Kontaktaufnahme WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }
    // wichtig keine ID übergeben, da in Input field ja auch keine ID generiert wird.
    // Dementsprechend IDs werden autoincremented. 
    // Sciherheitstechnisch nicht gut >> verschlüsselte ids eigentlich?
    create(vorname = '', nachname = '', email = '', nachricht = '') {
        var sql = 'INSERT INTO Kontaktaufnahme (vorname, nachname, email, nachricht) VALUES (?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [vorname, nachname, email, nachricht]
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, vorname = '', nachname = '', email = '', nachricht = '') {
        var sql = 'UPDATE Kontaktaufnahme SET vorname=?,nachname=?,email=?,nachricht=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [vorname, nachname, email, nachricht, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Kontaktaufnahme WHERE id=?';
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
        console.log('KontaktaufnahmeDao [_conn=' + this._conn + ']');
    }
}

module.exports = KontaktaufnahmeDao;
