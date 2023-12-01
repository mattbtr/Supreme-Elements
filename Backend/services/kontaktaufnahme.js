const helper = require('../helper.js');
const KontaktaufnahmeDao = require('../dao/kontaktaufnahmeDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Kontaktaufnahme');

serviceRouter.get('/kontaktaufnahme/gib/:id', function(request, response) {
    console.log('Service Kontaktaufnahme: Client requested one record, id=' + request.params.id);

    const kontaktaufnahmeDao = new KontaktaufnahmeDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktaufnahmeDao.loadById(request.params.id);
        console.log('Service Kontaktaufnahme: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Kontaktaufnahme: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/kontaktaufnahme/alle', function(request, response) {
    console.log('Service Kontaktaufnahme: Client requested all records');

    const kontaktaufnahmeDao = new KontaktaufnahmeDao(request.app.locals.dbConnection);
    try {
        var arr = kontaktaufnahmeDao.loadAll();
        console.log('Service Kontaktaufnahme: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Kontaktaufnahme: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/kontaktaufnahme/existiert/:id', function(request, response) {
    console.log('Service Kontaktaufnahme: Client requested check, if record exists, id=' + request.params.id);

    const kontaktaufnahmeDao = new KontaktaufnahmeDao(request.app.locals.dbConnection);
    try {
        var exists = kontaktaufnahmeDao.exists(request.params.id);
        console.log('Service Kontaktaufnahme: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({ 'id': request.params.id, 'existiert': exists });
    } catch (ex) {
        console.error('Service Kontaktaufnahme: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/kontaktaufnahme', function(request, response) {
    console.log('Service Kontaktaufnahme: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.vorname)) 
        errorMsgs.push('vorname fehlt');
    if (helper.isUndefined(request.body.nachname)) 
        errorMsgs.push('nachname fehlt');
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (!helper.isEmail(request.body.email)) 
        errorMsgs.push('email hat ein falsches Format');
    if (helper.isUndefined(request.body.nachricht)) 
        errorMsgs.push('nachricht fehlt');
    if (errorMsgs.length > 0) {
        console.log('Service Kontaktaufnahme: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const kontaktaufnahmeDao = new KontaktaufnahmeDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktaufnahmeDao.create(request.body.vorname, request.body.nachname, request.body.email, request.body.nachricht);
        console.log('Service Kontaktaufnahme: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Kontaktaufnahme: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/kontaktaufnahme', function(request, response) {
    console.log('Service Kontaktaufnahme: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id missing');   
        if (helper.isUndefined(request.body.vorname)) 
            errorMsgs.push('vorname fehlt');
        if (helper.isUndefined(request.body.nachname)) 
            errorMsgs.push('nachname fehlt');
        if (helper.isUndefined(request.body.email)) 
            errorMsgs.push('email fehlt');
        if (!helper.isEmail(request.body.email)) 
            errorMsgs.push('email hat ein falsches Format');
        if (helper.isUndefined(request.body.nachricht)) 
            errorMsgs.push('nachricht fehlt');
        if (errorMsgs.length > 0) {
            console.log('Service Kontaktaufnahme: Creation not possible, data missing');
            response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
            return;
    }

    const kontaktaufnahmeDao = new KontaktaufnahmeDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktaufnahmeDao.update(request.body.vorname, request.body.nachname, request.body.email, request.body.nachricht);
        console.log('Service Kontaktaufnahme: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Kontaktaufnahme: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/kontaktaufnahme/:id', function(request, response) {
    console.log('Service Kontaktaufnahme: Client requested deletion of record, id=' + request.params.id);

    const kontaktaufnahmeDao = new KontaktaufnahmeDao(request.app.locals.dbConnection);
    try {
        var obj = kontaktaufnahmeDao.loadById(request.params.id);
        kontaktaufnahmeDao.delete(request.params.id);
        console.log('Service Kontaktaufnahme: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Kontaktaufnahme: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
