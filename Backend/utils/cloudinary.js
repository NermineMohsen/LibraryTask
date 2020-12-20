const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name:"dzdymrmls",
    api_key:"682647656183818",
    api_secret:"8TEcHwAwkOeJTYq5CCPmIQvZp5M"
}); 
module.exports = cloudinary;