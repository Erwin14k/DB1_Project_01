require('dotenv').config();
const express = require('express');
const app = express();
const fillTemporal = require('./fillTemporal');
const emptyTemporal= require('./emptyTemporal');
const fillModel = require('./fillModel');
const deleteModel = require('./deleteModel');
const queryOne = require('./queryOne');
const queryTwo = require('./queryTwo');
const queryThree = require('./queryThree');
const queryFour = require('./queryFour');
const queryFive = require('./queryFive');
const querySix = require('./querySix');
const querySeven = require('./querySeven');
const queryEight = require('./queryEight');
const queryNine = require('./queryNine');
const queryTen = require('./queryTen');
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


// Query #1 route
app.get('/consulta1', async (req, res) => {
    try {
        const result=await queryOne();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number one');
    }
});

// Query #2 route
app.get('/consulta2', async (req, res) => {
    try {
        const result=await queryTwo();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number two');
    }
});


// Query #3 route
app.get('/consulta3', async (req, res) => {
    try {
        const result=await queryThree();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number three');
    }
});


// Query #4 route
app.get('/consulta4', async (req, res) => {
    try {
        const result=await queryFour();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number four');
    }
});


// Query #5 route
app.get('/consulta5', async (req, res) => {
    try {
        const result=await queryFive();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number five');
    }
});

// Query #6 route
app.get('/consulta6', async (req, res) => {
    try {
        const result=await querySix();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number six');
    }
});

// Query #7 route
app.get('/consulta7', async (req, res) => {
    try {
        const result=await querySeven();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number seven');
    }
});

// Query #8 route
app.get('/consulta8', async (req, res) => {
    try {
        const result=await queryEight();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number eight');
    }
});

// Query #9 route
app.get('/consulta9', async (req, res) => {
    try {
        const result=await queryNine();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number nine');
    }
});

// Query #10 route
app.get('/consulta10', async (req, res) => {
    try {
        const result=await queryTen();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in query number ten');
    }
});

// Initialize the server
app.listen(3000, () => {
    console.log(`Server running on port: ${server.port}`);
});





