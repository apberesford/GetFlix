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
const getServicesDb = async (req,res) => {
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

//=============================================================================
//exports======================================================================

module.exports = {
    getServicesDb,

};