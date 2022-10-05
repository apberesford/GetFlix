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
//services to check. I'm using this using constants on the frontend for now, 
//because the data is static and non-sensitive and doing so improves performance.
//If the service was going live, these two gets would double check the information 
//(maybe weekly?) to keep the website current.
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
        res.status(500).json({status: 500, data: error})
    } finally {
        client.close();
    }
}
//Same deal here, but for countries...

const getCountries = async (req,res) => {
    console.log(MONGO_URI)
    const client = new MongoClient(MONGO_URI, options)
    try {
        await client.connect();
        const db = client.db("GetFlix")
        let result = await db.collection("backgroundData").findOne({_id: "countries"})
        result ? res.status(200).json({status: 200, message: "list of regions", data: result})
        : res.status(404).json({status: 404, message: "nothing found"})
    } catch (error) {
        res.status(500).json({status: 500, data: error})
    } finally {
        client.close();
    }
}
//=============================================================================
//get current user: fires at login and logout to feed state, and when the user 
//discards changes on the profile page. sets the userState to match the database 
//(saved) version
const getCurrentUser = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options)
    try {
        await client.connect();
        const db = client.db("GetFlix")
        let result = await db.collection("users").findOne({_id: req.params.user})
        result ? res.status(200).json({status: 200, message: "user logged in", data: result})
        : res.status(404).json({status: 404, message: "nothing found"})
    } catch (error) {
        res.status(500).json({status: 500, data: error})
    } finally {
        client.close();
    }
}
//update user sets changes made to country and subscriptions in the database so 
//logged in users can quickly make searches of the services they own. Users who 
//haven't set country or subscriptions can use this to do so, since Mongo will 
//create fields which don't exist when updating.  
const updateUser = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options)
    if (!req.body._id || !req.body.country || !req.body.countryCode || !req.body.subscriptions) {return res.status(400).json({status: 400, message: "not enough data", data: req.body})}
    try {
        await client.connect();
        const db = client.db("GetFlix")
        const user = await db.collection("users").findOne({_id: req.body._id})
        if (!user) {res.status(404).json({ status: 404, data: "no user found" })} 
        else { 
           const id = req.body._id
           console.log(req.body)
           await db.collection("users").updateOne({_id: id}, {$set: {country: req.body.country}}, {upsert: true})
           await db.collection("users").updateOne({_id: id}, {$set: {countryCode: req.body.countryCode}}, {upsert: true})
           await db.collection("users").updateOne({_id: id}, {$set: {subscriptions: req.body.subscriptions}}, {upsert: true})
           await res.status(200).json({status: 200, message: "user info updated"})
        }
    } catch (error) {
        res.status(500).json({status: 500, data: error})
    } finally {
        client.close();
    }
}
//updates shows adds or removes shows that the user wants to have in their 
//library of shows
const updateList = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options)
    if (!req.body._id || !req.body.item) {return res.status(400).json({status: 400, message: "not enough data", data: req.body})}
    try {
        await client.connect();
        const db = client.db("GetFlix")
        const user = await db.collection("users").findOne({_id: req.body._id})
        if (!user) {res.status(404).json({ status: 404, data: "no user found" })}  
        else { 
            const show = await db.collection("users").findOne({_id: req.body._id, shows: {$elemMatch: {imdbID: req.body.item.imdbID}}})
            if (!show) {
                await db.collection("users").updateOne({_id: req.body._id}, {$push: {shows: req.body.item}}, {upsert: true})
                await res.status(200).json({status: 200, message: "show added!"})
            }
            else {
                await db.collection("users").updateOne({_id: req.body._id}, {$pull: {shows: req.body.item}})
                await res.status(200).json({status: 200, message: "show removed!"})
            } 
        }
    } catch (error) {
        res.status(500).json({status: 500, data: error})
    } finally {
        client.close();
    }

}
//updates an array being added to each show object "tags" which allows the user 
//to group, filter, and find shows based on the tags
const updateTags = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    if (!req.body._id || !req.body.imdbID || !req.body.tag) {return res.status(400).json({status: 400, message: "not enough data", data: req.body})}
    try {
        await client.connect();
        const db = client.db("GetFlix")
        const user = await db.collection("users").findOne({_id: req.body._id})
        if (!user) {res.status(404).json({ status: 404, data: "no user found" })} 
        else { 
            const show = await db.collection("users").findOne({_id: req.body._id, shows: {$elemMatch: {imdbID: req.body.imdbID}}})
            if (!show) {res.status(404).json({ status: 404, data: "no show found" })} 
            else {
                //not sure what the problem with 149 is, but it breaks here...
                    await db.collection("users").updateOne({_id: req.body._id, shows: {$elemMatch: {imdbID: req.body.item.imdbID}}}, {$set: {tags: req.body.tag}}, {upsert: true})
                    await res.status(200).json({status: 200, message: "tags updated!"})
                }
        }
    } catch (error) {
        res.status(500).json({status: 500, data: error})
    } finally {
        client.close();
    }
}

//=============================================================================
//exports======================================================================

module.exports = {
    getServicesDb, getCurrentUser, getCountries, updateUser, updateList, updateTags
}