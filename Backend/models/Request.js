
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const Book = require('./Book')

const RequestSchema = new Schema({
  book: {
    type: Object
  },
  status: {
    type: Number  //0=pending, 1=accepted, -1=rejected
  },
  user: {
    type: Object
  },

},
  { collection: "Request" }

)

const Model = mongoose.model
//var Request = Model('Request', RequestSchema)
var Request = (module.exports = Model("Request", RequestSchema));

//get all requests
module.exports.getRequestByUserId = function (uid, callback) {
  let query = { "user._id": uid }
  Request.find(query, callback)
}
//get request by id
module.exports.getRequestById = function (id, callback) {
  Request.findById(id, callback)
}
//get all requests 
module.exports.getAllRequests = function (callback) {
  Request.find(null, callback)
}
//update request by id (status update)
module.exports.updateRequestByRequestId = function (RequestId, newstat, callback) {
  Request.findByIdAndUpdate(
    { _id: RequestId },
    {
      $set: { status: newstat }
    },
    callback
  )
}
//delete request
module.exports.deleterequests = function (deletedbook, callback) {
  Request.find({ "book._id": deletedbook }, function (err, res) {
    if (err) return err;
    else { console.log("result:" + JSON.stringify(res)) }
  })
  Request.deleteMany({ "book._id": deletedbook }, callback)
}
//delete request
module.exports.cancelRequest = function (_id, callback) {
  Request.findByIdAndDelete(_id, callback);
}

//new request
module.exports.createRequest = function (newRequest, callback) {

  var query = { user: newRequest.user, book: newRequest.book };

  Request.findOne(query, function (e, Requests) {
    if (e) {
      e.status = 406; return next(e);
    }
    else { console.log("RES:" + JSON.stringify(Requests)) }
    if (Requests == null) {

      newRequest.save(callback)
    }
    else {
      //  e.status = 503; return next(e);
      return callback({ message: "request already exist" })
    }
  });
}