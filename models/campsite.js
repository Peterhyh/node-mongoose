const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating the schema
//Instatiate a new object called campsiteSchema
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
    //giving the schema a second optional argument which is used for setting various configuration options:
}, {
    timestamps: true //this will automatically add 2 properties to schema called, 'created at' and 'updated at'
});


//creating the model using the schema:
//mongoose.model returns a contructor function to instantiate objects
//in this case this model will be used to instantiate documents for mongodb
const Campsite = mongoose.model('Campsite', campsiteSchema) //this creates a model named 'Campsite'. First argument must be capitalized, singular version of the collection that you want to use for this model.

module.exports = Campsite;

//creating Node app to uses Mongoose and model&schema in campsite.js
