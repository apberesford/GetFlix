//boilerplate stuff============================================================
//pulling in packages==========================================================
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { get } = require("http");

const PORT = 4000;

//=============================================================================
//imports by source============================================================

const {
  getServicesAPI, getStream,
} = require("./apiHandlers")


const {
  getServicesDb
} = require("./nodeDataHandlers")

//=============================================================================
//setting up express===========================================================
express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(helmet())
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

//=============================================================================
//endpoints====================================================================
//api stuff (all gets)=========================================================
//get a list of services and the countries they're available in.
.get('/servicesAPI', getServicesAPI)
//get a show based on search params
.get('/show', getStream)


//Db stuff=====================================================================
//gets
.get('/servicesDb', getServicesDb)

//=============================================================================
//Boilerplate continued========================================================
//general catch
.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is embarrassing for one of us, certainly.",
    });
})
//server listener
.listen(PORT, () => console.info(`Listening on port ${PORT}`));
