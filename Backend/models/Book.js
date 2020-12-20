var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Request = require('./Request');

const bookSchema = new Schema({
  imagePath: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  }

},
  { collection: "Book" }
);


const Model = mongoose.model
var Book = (module.exports = Model("Book", bookSchema));

module.exports.createBook = function (newBook, callback) {

  newBook.save(callback);
};
module.exports.getAllBooks = function (callback) {
  Book.find(null, callback);
};
module.exports.remove = function (id, callback) {
  Book.findByIdAndDelete(id, function (err, res) {
    if (err) throw err;
    else {
      Request.deleterequests(id, callback);
    }
  })
};

module.exports.filterBookByTitle = function (title, callback) {
  let regexp = new RegExp(`${title}`, "i");
  var query = { title: { $regex: regexp } };
  Book.find(query, callback);
};
module.exports.getBookByID = function (id, callback) {
  Book.findById(id, callback);
};
