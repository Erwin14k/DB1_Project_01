const express = require('express');
const app = express();
const fillTemporal = require('./fillTemporal');
const emptyTemporal= require('./emptyTemporal');

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

// Initialize the server
app.listen(3000, () => {
    console.log('Server running on port 3000 !!!');
});





