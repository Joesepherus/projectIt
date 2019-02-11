var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client'))
const fs = require('fs')
const env = process.env.NODE_ENV || 'development'
// console.log(process.env);

/* user authentication */
// _____________________________________________________________________________
// const YOUR_AUTH0_DOMAIN = process.env.YOUR_AUTH0_DOMAIN;
// const YOUR_API_AUDIENCE_ATTRIBUTE =  process.env.YOUR_API_AUDIENCE_ATTRIBUTE;

// const jwt = require('express-jwt');
// const jwks = require('jwks-rsa');
// const cors = require('cors');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// const authCheck = jwt({
//   secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
//         jwksUri: "https://" + YOUR_AUTH0_DOMAIN+ "/.well-known/jwks.json"
//     }),
//     // This is the identifier we set when we created the API
//     audience: YOUR_API_AUDIENCE_ATTRIBUTE,
//     issuer: YOUR_AUTH0_DOMAIN,
//     algorithms: ['RS256']
// });
// _____________________________________________________________________________

var db = mongoose.connection

const tsFormat = () => new Date().toLocaleTimeString()
date = new Date()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

console.log('Starting application')

// DB SETUP
MONGOLAB_URI = process.env.MONGOLAB_URI_PROJECTIT
console.log('Initializing connection to MongoDB')
mongoose.connect(MONGOLAB_URI, function(error) {
  if (error) console.error(error)
  else console.log('Successfuly connected to MongoDB')
})

// ===== PROJECT =====

Project = require('./models/project.js')

// display all projects
app.get('/api/project', function(req, res) {
  Project.getAllProjects(function(err, allProjects) {
    if (err) {
      throw err
    }
    console.log(allProjects)
    res.json(allProjects)
  })
})

// display a problem with a certain ID
app.get('/api/project/:id', function(req, res) {
  Project.getProjectById(req.params.id, function(err, project) {
    if (err) {
      throw err
    }
    res.json(project)
  })
})

// add a new project
app.post('/api/project', function(req, res) {
  var project = req.body.project
  console.log(project)
  Project.addProject(project, function(err, project) {
    if (err) {
      throw err
      res.send({
        message: 'something went wrong'
      })
    } else {
      res.json(project)
    }
  })
})

// update a project
app.put('/api/project/:id', function(req, res) {
  var id = req.params.id
  var project = req.body.project
  console.log(id)
  console.log(project)
  Project.updateProject(id, project, {}, function(err, project) {
    if (err) {
      res.send({ message: 'Error', status: 200 })
    } else {
      res.send({ message: 'Dáta boli zmenené', status: 200 })
      // res.json(project)
    }
  })
})

// change projects state to removed project
app.put('/api/project/removed/:id', function(req, res) {
  var id = req.params.id
  var project = req.body
  console.log(id)

  console.log(project)
  Project.removeProject(id, project, {}, function(err, project) {
    if (err) {
      throw err
      res.send({
        message: 'something went wrong'
      })
    } else {
      res.json(project)
    }
  })
})

// remove project permanently
app.delete('/api/project/deleted/:id', function(req, res) {
  var id = req.params.id
  Project.deletePermanentlyProject(id, function(err, project) {
    if (err) {
      throw err
      res.send({
        message: 'something went wrong'
      })
    } else {
      res.json(project)
    }
  })
})

// calling server to listen on port
var server = app.listen(process.env.PORT || 3001, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
// --------------------------------------------------------------------------------------------
