require('dotenv').config();
const express = require('express');
const app = express();
const fillTemporal = require('./fillTemporal');
const emptyTemporal= require('./emptyTemporal');
const fillModel = require('./fillModel');
const deleteModel = require('./deleteModel');
const { server } = require('./config/config');

// Principal route of the server
app.get('/', (req, res) => {
    res.send('Hi from backend, we are working hard!!');
});

// Fill Temporal table route
app.get('/cargarTemporal', async (req, res) => {
    try {
        await fillTemporal();
        res.send('Temporal Table Loaded Successfully!!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Loading Temporal table :(');
    }
});

// Empty Temporal table route
app.get('/eliminarTemporal', async (req, res) => {
    try {
        await emptyTemporal();
        res.send('Temporal Table Flushed Successfully!!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Emptying Temporal Table :(');
    }
});

// Fill model route
app.get('/cargarModelo', async (req, res) => {
    try {
        await fillModel();
        res.send('Model loaded Successfully!!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Loading Model Data :(');
    }
});

// Delete model route
app.get('/eliminarModelo', async (req, res) => {
    try {
        await deleteModel();
        res.send('Model Deleted Successfully!!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Deliting Model Data :(');
    }
});

// Initialize the server
app.listen(3000, () => {
    console.log(`Server running on port: ${server.port}`);
});





