const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

//starting the app with express and the package punkAPI which is instantiated as a class
const app = express();
const punkAPI = new PunkAPIWrapper();

//app look for the vies in this path
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//static files are images and css
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials (partials are components)here:
hbs.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:
// base route --> /
app.get('/', (req, res) => {
  res.render('index'); //sending our index
});

// /random-beer route --> server pls render the hbs file random-beers when the user request
app.get('/random-beers', (req, res) => {
  res.render('random-beers');
});

//this route will have all the beers
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers() //method to get the list of beers
    .then(beers => {
      //parameter beers could be called anything
      console.log(beers); //console.log available in terminal just to check
      res.render('beers', { beers }); //server pls render the  //just use the same name inside {}
    })
    .catch(error => {
      console.log(error); //if there's an error it will be displayed
    });
});

//Method to get a random beer

app.listen(3000, () => console.log('🏃‍ on port 3000'));

/*
steps to create the handlebars to render the info we can to see using promises:

1. call the right method inside the route where we wanna render the info from the package:
app.get('/beers', (req, res)=>){
  punkAPI.getBeers()

}

2. this returns a promise. Call theses methods:
.then()
.catch()

3. place your parameter inside the then and create a function
.then(beers => {})

4. Call the render method inside the function you're passong to the then method. --> place the res you first wrote (response parameter in the callback function app.get) inside the then method:
then(beers => {
  res.render('beers');
})

5. Add 1 argument to that and it is the same beers but in {}, which is the "array of beers":
then(beers => {
  res.render('beers', { beers });
})

6. in the .cath() add an error parameter and anonymous function too:
.catch(error => {})

you can add console.log to check that nothing is breaking 
*/
