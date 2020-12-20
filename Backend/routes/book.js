const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Book = require("../models/Book");
router.post("/new", upload.single("image"), async (req, res) => {
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Create new user
        let book = new Book({
            description: req.body.description,
            title: req.body.title,
            imagePath: result.secure_url,
            cloudinary_id: result.public_id,
        });
        console.log("Res" + JSON.stringify(result))
        // Save user
        Book.createBook(book, function (err, book) {

            if (err) {
                res.send(err);
            }
            else {
                res.json({ Book: book })
            }
        });
    } catch (err) {
        res.send(err);
    }
});
router.post("/delete", async (req, res) => {
    try {
        console.log("route")
        var {
            id
        } = req.body;
        // Find user by id
        let book = await Book.findById(id);

        if (book.cloudinary_id) {
            // Delete image from cloudinary

            await cloudinary.uploader.destroy(book.cloudinary_id);
        }
        // Delete user from db
        Book.remove(id, function (err, Book) {
            if (err)
                res.send(err);
            res.json("");
        });
    } catch (err) {
        res.send(err);
    }
});
module.exports = router;