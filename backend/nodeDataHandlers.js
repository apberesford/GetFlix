//=============================================================================
//Boilerplate up top===========================================================

const e = require("express");
const {MongoClient, ConnectionClosedEvent} = require("mongodb");
const { restart } = require("nodemon");
const axios = require ("axios")

require("dotenv").config();
const {MONGO_URI} = process.env;

const options ={
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//=============================================================================
//all of these handlers ping the data collection of Mongo======================

//gets=========================================================================
//get services checks the region the user is in, then sets the possible 
//services to check
const getServicesDb = async (req,res) => {
    console.log(MONGO_URI)
    const client = new MongoClient(MONGO_URI, options)
    let availableservices = []
    try {
        await client.connect();
        const db = client.db("GetFlix")
        let result = await db.collection("backgroundData").findOne({id: "regionData"})
        result = result.data
        Object.keys(result).forEach(key => {
            if (Object.values(result[key]).indexOf('ca') > -1) {availableservices.push(key)}
        })
        availableservices.length > 1 ? res.status(200).json({status: 200, message: "list of regions", data: availableservices})
        : res.status(404).json({status: 404, message: "nothing found"})
    } catch (error) {
        res.status(500).json({status: 500, data: "server error"})
        console.log(error)
    } finally {
        client.close();
    }
}
//get current user: fires at login and logout to feed state
const getCurrentUser = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options)
    console.log(req.params.user)
    try {
        await client.connect();
        const db = client.db("GetFlix")
        let result = await db.collection("users").findOne({_id: req.params.user})
        result ? res.status(200).json({status: 200, message: "user logged in", data: result})
        : res.status(404).json({status: 404, message: "nothing found"})
    } catch (error) {
        res.status(500).json({status: 500, data: "server error"})
        console.log(error)
    } finally {
        client.close();
    }
}

const getCountries = async (req,res) => {
    console.log(MONGO_URI)
    const client = new MongoClient(MONGO_URI, options)
    let availableservices = []
    try {
        await client.connect();
        const db = client.db("GetFlix")
        let result = await db.collection("backgroundData").findOne({_id: "countries"})
        console.log(result)
        result ? res.status(200).json({status: 200, message: "list of regions", data: result})
        : res.status(404).json({status: 404, message: "nothing found"})
    } catch (error) {
        res.status(500).json({status: 500, data: "server error"})
        console.log(error)
    } finally {
        client.close();
    }
}
//=============================================================================
//exports======================================================================

module.exports = {
    getServicesDb, getCurrentUser, getCountries
}