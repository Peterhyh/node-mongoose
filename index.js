const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

//setting const for the url of the mongodb server
//this will automatically connect us to the nucampsitedb in the mongodb server.
const url = 'mongodb://localhost:27017/nucampsite';

//connect to the server:
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {            //the connect method returns a promise so now we can use the .then() method
    console.log('Connected correctly to server');
    //PART 1
    //instatiate a new doc: const 
    //newCampsite = new Campsite
    //PART 2
    //we can use .create() which takes an argument an object that defines the new document to create, then automatically saves it. This create method returns a promise.
    Campsite.create({
        name: "React Lake Campground",
        description: "test"
    })
        //PART 1
        //using the save method on this new document to save to the campsite's collection in the database and return a promise:
        //newCampsite.save()
        //PART2 : dont need the save method anymore because Campsite.create() is able to save automatically.
        .then(campsite => {
            console.log(campsite);
            return Campsite.find();
        })
        .then(campsites => {
            console.log(campsites);
            return Campsite.deleteMany();
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch(err => {
            console.log(err);
            mongoose.connect.close();
        });
}); 
