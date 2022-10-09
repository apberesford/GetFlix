//=============================================================================
//Boilerplate up top===========================================================

const e = require("express");
const {MongoClient, ConnectionClosedEvent, Collection} = require("mongodb");
const { restart } = require("nodemon");
const axios = require ("axios");
const { response } = require("express");

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
        return error
    }
}

//get stream, this should try to find a show from the api server
const getStream = async (req,res) => {
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
          response ? res.status(200).json({status: 200, message: "shows found", data: response.data.results})
          : res.status(404).json({status: 404, message: "nothing found"})
    } catch(error) {
        return error
    }
}
const getManyStreams = async (req,res) => {
    let services = req.query.service
    services = services.slice(1, -1)
    let array = services.split(",")
    let requestArray = []
    let responseArray = []
    array.forEach(element => {requestArray.push(
        axios.request(
        {url: 'https://streaming-availability.p.rapidapi.com/search/basic',
            headers: {
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY
            },
            params: {
                country: req.query.country, 
                service: element, 
                type: req.query.type, 
                keyword: req.query.keyword, 
                page: "1", 
                output_language: "en", 
                language: "en"
            }
        }
        )
    )})
    try {
        Promise.all(requestArray).then((data)=>{
            // console.log(data)
            data.forEach(element => console.log(element.data.results, "81"))
            data.forEach(element => responseArray.push(...element.data.results))           
            // data.forEach(element => element.length > 0 ? responseArray.push(...element.data.results) : console.log("empty array"))
            responseArray ? res.status(200).json({status: 200, message: "shows found", data: responseArray})
            : res.status(404).json({status: 404, message: "nothing found"})
            .catch(err => console.log(err))
            // (console.log(responseArray))
        })
        } catch(error) {
        return error
    }
}
//this function is a simple retreival not a search. It requires the exact imdbID 
//in the params, as well as tv or movie. Params are countryCode, series/movie, and the imdbID, all strings
const getOne = async (req,res) => {
    const request = {country: req.params.countryCode, tmdb_id: `${req.params.type}/${req.params.tmdbID}`, output_language: "en"}
    try {
    const apiOptions = {
        url: 'https://streaming-availability.p.rapidapi.com/get/basic',
        headers: {
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key': API_KEY
        },
        params: request
      };
      const response = await axios.request(apiOptions)
          response ? res.status(200).json({status: 200, message: "shows found", data: response.data})
          : res.status(404).json({status: 404, message: "nothing found"})
    } catch (error) {
        return error
    }
}



//=============================================================================
//exports======================================================================

module.exports = {
    getServicesAPI,
    getStream,
    getOne,
    getManyStreams
};