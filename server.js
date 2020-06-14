var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client'))
const fs = require('fs')
const env = process.env.NODE_ENV || 'development'
const cors = require('cors')
app.use(cors());


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

// display all projects for an admin with id
app.get('/api/projectsOfAdmin/:adminId', function(req, res) {
    console.log('req.params.adminId: ', req.params.adminId);
  Project.getAllProjectsOfAdmin(req.params.adminId, function(err, allProjects) {
    if (err) {
      throw err
    }
    console.log(allProjects)
    res.json(allProjects)
  })
})

// display a project with a certain ID
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
  Project.addProject(project, function(err, project) {
    if (err) {
      throw err
      res.send({
        message: 'something went wrong'
      })
    } else {
      res.json({project})
    }
  })
})

// update a project
app.put('/api/project/:id', function(req, res) {
  var id = req.params.id
  var project = req.body.project
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

// ===== ADMIN =====

Admin = require('./models/admin.js')

// get all admins
app.get('/api/admin', function (req, res) {
  Admin.getAllAdmins(function (err, allAdmins) {
    if (err) {
      throw err
    }
    res.json(allAdmins)
  })
})

// get a admin with a certain ID
app.get('/api/admin/:id', function (req, res) {
  Admin.getAdminById(req.params.id, function (err, admin) {
    if (err) {
      throw err
    }
    res.json(admin)
  })
})

// add a new admin
app.post('/api/admin', function (req, res) {
  var admin = req.body.admin
  Admin.addAdmin(admin, function (err) {
    if (err) {
      res.send({
        message: 'Admin s emailom ' + admin.email + ' už existuje.',
        status: 404
      })
    } else {
      res.send({ message: 'Úspešne si sa zaregistroval.', status: 200 })
    }
  })
})

// login admin
app.post('/api/admin/login', function (req, res) {
  var admin = req.body.admin
  console.log(admin)
  Admin.loginAdmin(admin, function (err, admin_db) {
    if (err) {
      res.send({
        message: 'Zadali ste nesprávne prihlasovacie údaje.',
        status: 404
      })
    } else {
      res.send({
        admin_id: admin_db._id,
        admin: admin_db,
        message: 'Prihlásenie prebehlo úspešne.',
        status: 200
      })
    }
  })
})

// update a admin
app.put('/api/admin/:id', function (req, res) {
  var id = req.params.id
  var admin = req.body.admin
  Admin.updateAdmin(id, admin, { new: true }, function (err, admin) {
    if (err) {
      res.send({ message: 'Error', status: 200 })
    } else {
      res.send({
        message: 'Dáta admina ' + admin.name + ' boli zmenené',
        status: 200,
        admin: admin
      })
    }
  })
})

// change password of a admin
app.put('/api/admin/changePassword/:id', function (req, res) {
  var id = req.params.id
  var admin = req.body.admin
  Admin.changePassword(id, admin, {}, function (err, db_admin) {
    console.log('admin: ', db_admin)
    if (err) {
      res.send({ message: 'Error nesprávne prihlasovacie údaje.', status: 200 })
    } else {
      res.send({
        message: 'Heslo admina ' + db_admin.name + ' bolo úspešne zmenené.',
        status: 200
      })
    }
  })
})

// remove admin permanently
app.delete('/api/admin/:id', function (req, res) {
  var id = req.params.id
  Admin.deletePermanentlyAdmin(id, function (err, admin) {
    if (err) {
      res.send({
        message: 'Nastala chyba pri vymávaní admina.'
      })
      throw err
    } else {
      res.json({
        message: 'Váš účet bol úspešne vymazaný.',
        status: 200
      })
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
