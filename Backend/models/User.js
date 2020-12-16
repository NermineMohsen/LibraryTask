
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    username: {
        type: String
    },
    type: {
        type: Number
    }
}
    , { collection: "User" }
);


const Model = mongoose.model
var User = (module.exports = Model("User", userSchema));

module.exports.createUser = function (newUser, callback) { //signup
    var query = { email: newUser.email };

    User.findOne(query, function (err, response) {
        if (err) throw err;
        if (response != null) {
            return callback(null, { error: "user exists" })
        }
        else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    newUser.password = hash;
                    newUser.save(callback);
                });
            });
        }
    })
}

module.exports.login = function (email, password, callback) {

    var query = { email: email };
    User.findOne(query, function (err, response) {
        if (err) throw err;
        if (response != null) {

            comparePassword(password, response.password, function (err, rep) {
                if (rep) { callback(null, response) }
                else
                    callback(null, { error: "wrong pass" })
            })

        }
        else {
            return callback(null, { error: "wrong email" })
        }
    });
}


module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}
function comparePassword(givenPassword, hash, callback) {

    bcrypt.compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getAllUsers = function (callback) {
    User.find(callback)
}