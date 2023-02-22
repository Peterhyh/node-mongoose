// const mongoose = require('mongoose');
// const Campsite = require('./models/campsite');

// //setting const for the url of the mongodb server
// //this will automatically connect us to the nucampsitedb in the mongodb server.
// const url = 'mongodb://localhost:27017/nucampsite';

// //connect to the server:
// const connect = mongoose.connect(url, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
//the connect method returns a promise so now we can use the .then() method
// connect.then(() => {            
//     console.log('Connected correctly to server');
//     
// instatiate a new doc: const 
//     newCampsite = new Campsite({
//         name: "React Lake Campground",
//         description: "test"
//     });
//         //using the save method on this new document to save to the campsite's collection in the database and return a promise:
//         newCampsite.save()
//         .then(campsite => {
//             console.log(campsite);
//             return Campsite.find();
//         })
//         .then(campsites => {
//             console.log(campsites);
//             return Campsite.deleteMany();
//         })
//         .then(() => {
//             return mongoose.connection.close();
//         })
//         .catch(err => {
//             console.log(err);
//             mongoose.connect.close();
//         });
// }); 


//PART 2:
// const mongoose = require('mongoose');
// const Campsite = require('./models/campsite');

// const url = 'mongodb://localhost:27017/nucampsite';

// const connect = mongoose.connect(url, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// connect.then(() => {            
//     console.log('Connected correctly to server');

//     Campsite.create({
//         name: "React Lake Campground",
//         description: "test"
//     })


// dont need the save method anymore because Campsite.create() is able to save automatically.


//     .then(campsite => {
//         console.log(campsite);
//         return Campsite.find();
//     })
//     .then(campsites => {
//         console.log(campsites);
//         return Campsite.deleteMany();
//     })
//     .then(() => {
//         return mongoose.connection.close();
//     })
//     .catch(err => {
//         console.log(err);
//         mongoose.connect.close();
//     });
// }); 


//PART 3
const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';

const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server');

    Campsite.create({
        name: "React Lake Campground",
        description: "test"
    })
        .then(campsite => {
            console.log(campsite);
            return Campsite.findByIdAndUpdate(campsite._id, {
                $set: { description: 'Updated Test Document' }
            }, {
                new: true //this will cause this method to return the updated document
            });
        })
        //console logging the campsite document that was returned (original document, then a console log of the document with the updated description)
        .then(campsite => {
            console.log(campsite)


            campsite.comments.push({
                rating: 5,
                text: 'What a magnificent view!',
                author: "Tinus Lorvaldes"
            });

            return campsite.save(); //in order for this subcdocument update to take effect. this will return the campsite that was saved with the new comments subdocument. We will be receiving a single campsite document for the next .then()
        })
        .then(campsite => {
            console.log(campsite);
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