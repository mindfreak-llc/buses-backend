const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/busesdb")
.then(
    () => {
        console.log('connected to database');
    },
)
.catch((err) => {
    console.error(err);
})

module.exports = mongoose