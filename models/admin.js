const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const AdminSchema = new Schema({
  name: String,
  email: String,
  password: String
})

const Admin = mongoose.model('admin', AdminSchema)

module.exports = Admin

module.exports.getAllAdmins = function(callback, limit) {
  Admin.find(callback).limit(limit)
}

module.exports.getAdminById = function(adminId, callback) {
  Admin.findById(adminId, callback)
}

module.exports.addAdmin = function(admin, callback) {
  Admin.findOne({ email: admin.email }, function(err, db_admin) {
    if (db_admin) {
      let err = new Error(
        'Admin s emailom: ' + db_admin.email + ' už existuje.'
      )
      return callback(err)
    } else {
      bcrypt.hash(admin.password, 10, function(err, hash) {
        if (err) {
          return next(err)
        }
        var json = {
          name: admin.name,
          email: admin.email,
          password: hash
        }
        Admin.create(json, callback)
      })
    }
  })
}

module.exports.loginAdmin = function(admin, callback) {
  Admin.findOne({ email: admin.email }).exec(function(err, admin_found) {
    if (err) {
      return callback(err)
    } else if (!admin_found) {
      var err = new Error('Admin not found.')
      err.status = 401
      return callback(err)
    }
    bcrypt.compare(admin.password, admin_found.password, function(err, result) {
      if (result === true) {
        return callback(null, admin_found)
      } else {
        let err = new Error('Zadané heslo je nesprávne.')
        return callback(err)
      }
    })
  })
}

module.exports.updateAdmin = function(id, admin, options, callback) {
  var query = { _id: id }
  var update = {
    name: admin.name,
    email: admin.email
  }
  Admin.findOneAndUpdate(query, update, options, callback)
}

module.exports.changePassword = function(id, admin, options, callback) {
  var query = { _id: id }
  Admin.findById(id).exec(function(err, admin_found) {
    if (err) {
      return callback(err)
    } else if (!admin_found) {
      var err = new Error('Admin not found.')
      err.status = 401
      return callback(err)
    }
    bcrypt.compare(admin.oldPassword, admin_found.password, function(
      err,
      result
    ) {
      if (result === true) {
        let update = {
          password: admin.newPassword
        }
        bcrypt.hash(update.password, 10, function(err, hash) {
          if (err) {
            return next(err)
          }
          var json = {
            password: hash
          }
          Admin.findOneAndUpdate(query, json, { new: true }, callback)
        })
      } else {
        let err = new Error('Zadané heslo je nesprávne.')
        return callback(err)
      }
    })
  })
}

module.exports.removeAdmin = function(id, admin, options, callback) {
  var query = { _id: id }
  var update = {
    state: 'removed'
  }
  Admin.findOneAndUpdate(query, update, options, callback)
}

module.exports.deletePermanentlyAdmin = function(id, callback) {
  var query = { _id: id }
  Admin.deleteOne(query, callback)
  // Admin.findById(id).exec(function(err, admin_found) {
  //   callback(null, admin_found)
  // })
}
