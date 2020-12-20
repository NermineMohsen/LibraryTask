var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')
var expressValidator = require('express-validator');//req.checkbody()
const User = require('./models/User')

const Book = require('./models/Book')
const TypedError = require('./modules/ErrorHandler')
const Request = require('./models/Request');



mongoose.connect("mongodb+srv://IDSC:IDSC2020@cluster0.9khav.mongodb.net/library?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, }, function (error) {
  if (error) throw error
  console.log(`connect mongodb success`);
});

var app = express()
app.use(cors())

// Express validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.lenght) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//set static dir
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Books', require('./routes/book'))


//GET /Books (getallBooks)
app
  .get('/Books', function (req, res, next) {
    // const { query, order } = categorizeQueryString(req.query)
    Book.getAllBooks(function (e, Books) {
      if (e) {
        e.status = 406; return next(e);
      }
      if (Books.length < 1) {
        return res.status(404).json({ message: "Books not found" })
      }
      res.json({ Books: Books })
    })
  })

  /*//POST /Books (addBook)
  .post('/Books/new', function (req, res, next) {
    const {
      imagePath,
      title,
      description,
    } = req.body;
    var newBook = new Book({
      imagePath: imagePath,
      title: title,
      description: description,
    });

    Book.createBook(newBook, function (err, book) {

      if (err) {
        res.send(err);
      }
      else {
        res.json({ Book: book })
      }
    });
  })*/
  /*//POST /Books (delete)
  .post('/Books/delete', function (req, res, next) {
    var {
      id
    } = req.body;
    Book.remove(id, function (err, Book) {
      if (err)
        res.send(err);
      res.json("");
    });
  })*/
  .post('/Request/delete', function (req, res, next) {
    var {
      id
    } = req.body;
    Request.cancelRequest(id, function (err, Book) {
      if (err)
        res.send(err);
      res.json("");
    });
  })
  //GET /Books/:id  (getbyID)
  .get('/Books/:id', function (req, res, next) {
    let BookId = req.params.id;
    Book.getBookByID(BookId, function (e, item) {
      if (e) {
        e.status = 404; return next(e);
      }
      else {
        res.json({ Book: item })
      }
    });
  })
  // GET filter (search)
  .get('/filter', function (req, res, next) {
    let result = {}
    const {
      title
    } = req.body;
    Book.filterBookByTitle(title, function (err, p) {
      if (err) return next(err)
      if (p.length > 0) {
        return res.json({ filter: p })

      }
      else {
        let error = new TypedError('search', 404, 'not_found', { message: "no Book exist" })
        return next(error)
      }
    })
  })
  //GET /requests (getallrequests)
  .get('/allrequests/:id', function (req, res, next) {
    let id = req.params.id;
    Request.getRequestByUserId(id, function (e, Requests) {
      if (e) {
        e.status = 404; return next(e);
      }
      if (Requests.length < 1) {
        return res.status(404).json({ message: "requests not found" })
      }
      else {
        res.json({ Requests: Requests })
      }
    });
  })
  //GET /requests/:id  (getbyID)
  .get('/request/:id', function (req, res, next) {
    let id = req.params.id;
    Request.getRequestById(id, function (e, item) {
      if (e) {
        e.status = 404; return next(e);
      }
      else {
        res.json({ Request: item })
      }
    });
  })

  //PUT Request (update status of request by requestid)
  .put("/Request/status", function (req, res, next) {
    const {
      id,
      status,
    } = req.body;
    Request.updateRequestByRequestId(
      id, status, function (err, result) {
        if (err) return next(err);
        res.json(result);
      }
    );
  })
  //POST /Requests (newRequest)
  .post('/Request/new', function (req, res, next) {
    const {
      user,
      book,
    } = req.body;


    var newRequest = new Request({
      book: book,
      status: 0,
      user: user,
    });
    Request.createRequest(newRequest, function (err, Request) {

      if (err)
        res.send(err);
      else
        res.json({ Requests: Request })
    });
  })
  .get('/Requests', function (req, res, next) {
    // const { query, order } = categorizeQueryString(req.query)
    Request.getAllRequests(function (e, Requests) {
      if (e) {
        e.status = 406; return next(e);
      }
      if (Requests.length < 1) {
        return res.status(404).json({ message: "requests not found" })
      }
      else
        res.json({ Requests: Requests })
    })
  })
  .post('/login', function (req, res, next) {
    const {
      email,
      password
    } = req.body;
    User.login(email, password, function (err, p) {
      if (err) return next(err)
      if (p.type == "1") {
        Book.getAllBooks(function (e, Books) {
          if (e) {
            e.status = 406; return next(e);
          }
          if (Books.length < 1) {
            return res.status(404).json({ message: "Books not found" })
          }
          res.json({ Books: Books, User: p })
        })
      }
      else if (p.type == "0") {
        Request.getAllRequests(function (e, Books) {
          if (e) {
            e.status = 406; return next(e);
          }
          if (Books.length < 1) {
            return res.status(404).json({ message: "Books not found" })
          }
          res.json({ Requests: Books, User: p })
        })
      }
    })
  })
  .post('/signup', function (req, res, next) {
    const {
      email,
      password,
      username,
      type

    } = req.body;
    var newUser = new User({
      email: email,
      password: password,
      username: username,
      type: type
    });

    User.createUser(newUser, function (err, p) {

      if (err) {
        console.log(err)
        return next(err);
      } else{
        if (p.type == "1") {
          Book.getAllBooks(function (e, Books) {
            if (e) {
              e.status = 406; return next(e);
            }
            if (Books.length < 1) {
              return res.status(404).json({ message: "Books not found" })
            }
            res.json({ Books: Books, User: p })
          })
        }
        else if (p.type == "0") {
          Request.getAllRequests(function (e, Books) {
            if (e) {
              e.status = 406; return next(e);
            }
            if (Books.length < 1) {
              return res.status(404).json({ message: "Books not found" })
            }
            res.json({ Requests: Books, User: p })
          })
        }
      }
    });
  })
  .get('/', (req, res) => res.send("in"))

port = process.env.PORT || 80
var listener = app.listen(port, function () {
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

