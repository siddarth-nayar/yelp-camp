const mongoose = require('mongoose');
const cities = require('./cities.js');
const { places, descriptors } = require('./seedHelpers');

// Requiring the model
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// Logic to check if there is any error and if the databse is successfully opened
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database opened");
})

// To pick a random element from an array
const sample = array => array[Math.floor(Math.random() * array.length)];

// Clear the DB and then add new value
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60995366ef3ae52ae42d55e3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quisquam quaerat laboriosam aliquam itaque excepturi sint voluptatem ad nemo repellendus, et quis? Quisquam temporibus molestias totam delectus animi maiores cupiditate?',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dlpysioak/image/upload/v1620734791/YelpCamp/vjbydail6vgxdkvn6vau.png',
                  filename: 'YelpCamp/zpnnr8kxfxbwrhfamq8o'
                },
                {
                  url: 'https://res.cloudinary.com/dlpysioak/image/upload/v1620734793/YelpCamp/aqmhyissmflj9u5dcwhz.png',
                  filename: 'YelpCamp/nymznmdebj8nuzmz0s53'
                },
                {
                  url: 'https://res.cloudinary.com/dlpysioak/image/upload/v1620733798/YelpCamp/ftf1mhq2pholls8f6ahu.png',
                  filename: 'YelpCamp/vadfdvopyhyxgyb0pw71'
                }
              ]
        })
        await camp.save();
    }
}
// Execute
seedDB().then(() => {
    mongoose.connection.close();
})

// https://source.unsplash.com/collection/483251
// https://source.unsplash.com/collections/483251/in-the-woods