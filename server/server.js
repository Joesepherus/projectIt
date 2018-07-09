var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
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

var db = mongoose.connection;

const tsFormat = () => (new Date()).toLocaleTimeString();
date = new Date();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

console.log("Starting application");

// DB SETUP
MONGOLAB_URI = process.env.MONGOLAB_URI_PROJECTIT;

console.log("Initializing connection to MongoDB");
mongoose.connect(MONGOLAB_URI, function (error) {
  if (error) console.error(error);
  else console.log("Successfuly connected to MongoDB");
});

// ===== PROJECT =====

Project = require('./models/project.js');
Task = require('./models/task.js');
Section = require('./models/section.js');

// display all projects
app.get('/api/project', function (req, res) {
  Project.getAllProjects(function (err, allProjects) {
    if (err) {
      throw err;
    }
    console.log(allProjects);
    res.json(allProjects);
  });

})

// display a project with a certain ID
app.put('/api/project/:id', urlencodedParser, function (req, res) {
  let id = req.params.id;
  let projectId = req.body.id;

  Project.getProjectById(id,
    function (err, project) {
      if (err) {
        throw err;
      }
      let returned = false;
      var promise0 = new Promise(function (resolve, reject) {

        var promise1 = new Promise(function (resolve, reject) {
          Section.getAllSectionsOfProject(projectId, function (err, allSections) {
            if (err) {
              throw err;
            }
            resolve(allSections);
          })
        })

        promise1.then(function (sections) {
          project.sections = sections;
          console.log('=asd[as=da ' + project.sections);
          for (let i = 0; i < sections.length; i++) {

            var promise2 = new Promise(function (resolve, reject) {
              Task.getAllTasksOfSection(sections[i]._id, function (err, allTasks) {
                if (err) {
                  throw err;
                }
                resolve(allTasks);
              })
            })
            promise2.then(function (allTasks) {
              project.sections[i].tasks = allTasks;
              console.log('picovina');
              console.log(i);
              console.log(sections.length);

              if (i === sections.length - 1) {
                resolve(project);
              }
            });
          }
          if (sections.length === 0) {
            reject(project);
          }

        });
      })
      promise0.then(function (project) {
        console.log('1.');
        reutrned = true;
        console.log(project);
        res.json(project);
      }).catch(function (project) {
        // Log the rejection reason
        res.json(project);

        console.log('Handle rejected promise here.');
      });
      // console.log('2.');
      // if (returned === false) {
      //   console.log(project);
      //   res.json(project);
      // }
      // res.json(project);
    })
})

// add a new project
app.post('/api/project', function (req, res) {
  var project = req.body;
  console.log('????');
  console.log(project);

  Project.addProject(project, function (err, project) {
    if (err) {
      throw (err);
      res.send({
        message: 'something went wrong'
      });
    }
    else {
      res.json(project);
    }
  });
})

// update a project
app.put('/api/project/:id', function (req, res) {
  var id = req.params.id;
  var project = req.body;

  Project.updateProject(id, project, {},
    function (err, project) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(project);
      }
    });
})

// change projects state to removed project
app.put('/api/project/removed/:id', function (req, res) {
  var id = req.params.id;
  var project = req.body;
  console.log(id);

  console.log(project);
  Project.removeProject(id, project, {},
    function (err, project) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(project);
      }
    });
})

// remove project permanently
app.delete('/api/project/deleted/:id', function (req, res) {
  var id = req.params.id;
  Project.deletePermanentlyProject(id,
    function (err, project) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(project);
      }
    });
})


// ===== SECTION =====

// display all sections
app.get('/api/section/:id', function (req, res) {
  var id = parseInt(req.params.id);

  Section.getAllSectionsOfProject(id, function (err, allSections) {
    if (err) {
      throw err;
    }

    // var projectsSections = [];
    // for (var i = 0; i < allSections.length; i++) {
    //   if (allSections[i].projectId === id) {
    //     projectsSections[i] = allSections[i];
    //   }
    // }
    console.log("dafuq is going on here ?")
    console.log(allSections);
    res.json(allSections);
  });
})

// display a section with a certain ID
app.get('/api/section/:id', function (req, res) {
  Section.getSectionById(req.params.id,
    function (err, section) {
      if (err) {
        throw err;
      }
      res.json(section);
    });
})

// add a new section
app.post('/api/section', urlencodedParser, function (req, res) {
  console.log('creating new section');
  var section = req.body;
  console.log(section);

  Section.addSection(section, function (err, section) {
    if (err) {
      throw (err);
      res.send({
        message: 'something went wrong'
      });
    }
    else {
      res.json(section);
    }
  });
})

// update a section
app.put('/api/section/:id', function (req, res) {
  var id = req.params.id;
  var section = req.body;

  Section.updateSection(id, section, {},
    function (err, section) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(section);
      }
    });
})

// change sections state to removed section
app.put('/api/section/removed/:id', function (req, res) {
  var id = req.params.id;
  var section = req.body;
  console.log(id);

  console.log(section);
  Section.removeSection(id, section, {},
    function (err, section) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(section);
      }
    });
})

// remove section permanently
app.delete('/api/section/deleted/:id', function (req, res) {
  var id = req.params.id;
  Section.deletePermanentlySection(id,
    function (err, section) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(section);
      }
    });
})


// ===== TASK =====


// display all tasks
app.get('/api/task', function (req, res) {
  Task.getAllTasks(function (err, allTasks) {
    if (err) {
      throw err;
    }
    console.log(allTasks);
    res.json(allTasks);
  });
})

// display a task with a certain ID
app.get('/api/task/:id', function (req, res) {
  Task.getTaskById(req.params.id,
    function (err, task) {
      if (err) {
        throw err;
      }
      res.json(task);
    });
})

// add a new task
app.post('/api/task', urlencodedParser, function (req, res) {
  var task = req.body;
  console.log('==============');
  console.log(task);

  Task.addTask(task, function (err, task) {
    if (err) {
      throw (err);
      res.send({
        message: 'something went wrong'
      });
    }
    else {
      res.json(task);
    }
  });
})

// update a task
app.put('/api/task/:id', function (req, res) {
  var id = req.params.id;
  var task = req.body;

  Task.updateTask(id, task, {},
    function (err, task) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(task);
      }
    });
})

// change task state to completed task
app.put('/api/task/completed/:id', function (req, res) {
  var id = req.params.id;
  console.log('completing a task');

  Task.completeTask(id, {},
    function (err, task) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(task);
      }
    });
})

// change task state to removed task
app.put('/api/task/removed/:id', function (req, res) {
  var id = req.params.id;
  var task = req.body;
  console.log(id);

  console.log(task);
  Task.removeTask(id, task, {},
    function (err, task) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(task);
      }
    });
})

// remove task permanently
app.delete('/api/task/deleted/:id', function (req, res) {
  var id = req.params.id;
  Task.deletePermanentlyTask(id,
    function (err, task) {
      if (err) {
        throw (err);
        res.send({
          message: 'something went wrong'
        });
      }
      else {
        res.json(task);
      }
    });
})

// get all tasks of a section
app.get('api/allTasksOfSection/:id', function (req, res) {
  var id = req.params.id;

  let tasks = Task.getAllTasks(
    function (err, allTasks) {
      if (err) {
        throw err;
      }
      return allTasks;
    });

  array1.forEach(function (element) {
    if (element.sectionId === id) {
      return element;
    }
  });
})

// getAllTasksOfASection() {

// }

// calling server to listen on port
var server = app.listen(process.env.PORT || 3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
})
// --------------------------------------------------------------------------------------------