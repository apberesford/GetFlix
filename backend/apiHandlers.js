//=============================================================================
//Boilerplate up top===========================================================

const e = require("express");
const {MongoClient, ConnectionClosedEvent} = require("mongodb");
const { restart } = require("nodemon");
const axios = require ("axios")

require("dotenv").config();
const {API_KEY} = process.env


//=============================================================================
//all of these handlers ping the API. don't mess it up!========================

//get services: on a regular update cycle, ping the server to get a list of the services available in each country.
const getServicesAPI = async (req, res) => {
    try {
        const apiOptions = {
            url: 'https://streaming-availability.p.rapidapi.com/countries',
            headers: {
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY
            },
        }
        const response = await axios.request(apiOptions)
        response ? res.status(200).json({status: 200, message: "regional data", data: response.results})
        : res.status(404).json({status: 404, message: "nothing found"})
    } catch(error)  {
        return console.log(error)
    }
}

//get stream, this should try to find a show from the api server
const getStream = async (req,res) => {
    console.log(req.query)
    try {
    const apiOptions = {
        url: 'https://streaming-availability.p.rapidapi.com/search/basic',
        headers: {
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key': API_KEY
        },
        params: req.query
      };
      
      const response = await axios.request(apiOptions)
          console.log(response.data);
          response ? res.status(200).json({status: 200, message: "shows found", data: response.data})
          : res.status(404).json({status: 404, message: "nothing found"})
    } catch(error) {
        return console.log(error)
    }
}



//=============================================================================
//exports======================================================================

module.exports = {
    getServicesAPI,
    getStream,
};