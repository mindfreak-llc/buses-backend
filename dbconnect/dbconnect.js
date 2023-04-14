const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/busesdb")
.then(
    () => {
        console.log('connected to database');
    },
)
.catch((err) => {
    console.error(err);
})

module.exports = mongoose
