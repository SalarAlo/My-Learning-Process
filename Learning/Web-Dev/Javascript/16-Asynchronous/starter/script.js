'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// AJAX CALLS
//! most old school

const renderCountry = function (data, className) {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);

  const html = `
  <article class="country ${className}">
    <img class="country__img" src= "${data.flags.svg}">
    <div class="country__data">
      <h3 class="country__name"> ${data.name.official}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} million</p>
      <p class="country__row"><span>🗣️</span>${languages[0]}</p>
      <p class="country__row"><span>💰</span>${currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('afterbegin', html);
};

const renderError = function(message){
  countriesContainer.insertAdjacentText('beforeend', message);
};

/* 
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function (e) {
    const [data] = JSON.parse(this.responseText);
    // * render country 1
    renderCountry(data);
    // todo: get neighbour country
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    const neighbourRequest = new XMLHttpRequest();
    neighbourRequest.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    neighbourRequest.send();

    neighbourRequest.addEventListener('load', function () {
      renderCountry(JSON.parse(this.responseText)[0], 'neighbour');
    })
  });
}; 
*/

//! old way of making ajax calls
/* 
  request.open('GET', `https://restcountries.com/v3.1/name/germany`);
  const request = new XMLHttpRequest();
  request.send();

  request.addEventListener('load', function(){
    (...)
  })
*/

//! modern way of makeing ajax calls
//* this will return a promise...

const getCountryData = function (country) {
  const request =
    getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];

        if(!neighbour) 
          throw new Error('Country has no neighbouring country!');

        return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, `Counry not found`)
      })
      .then(data => {
        return renderCountry(data[0], 'neighbour')
      })
      .catch(error => renderError(error.message))
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
};

btn.addEventListener('click', () => getCountryData('australia'));

const getJSON = function(url, errorMsg = 'Something went wrong...'){
  return fetch(url)
  .then(response => {
    if(!response.ok)
      throw new Error(errorMsg);

    return response.json()
  });
};

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API
 to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON
 function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage
 like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console

5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch()
 does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have 
been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/


const getPosition = () => new Promise(function(resolve, reject){
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

/* 
const whereAmI = function(){
  const request = 
  getPosition()
    .then(pos =>{
      return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`)
    })
    .then(response => {
      if(response.status == 403)
        throw new Error(`you have reloaded to fast! please enter the chill zone XD`);

      return response.json()
    })
    .then(data => getCountryData(data.countryName))
    .catch(err => renderError(err.message))
    .finally(() => countriesContainer.style.opacity = 1);
}

whereAmI(); 
*/
 
/////////////////////////////////////////////////
/* 
//! builidng a promise
const promiseExample = new Promise(function(resolve, reject) {
  console.log('Lottery draw is happening ⏳');
  setTimeout(() => {
  if(Math.random() >= 0.5)
    resolve('You won 💸...');
  else
    reject(new Error('You lost your money 💩'));
  }, 3000);
});

promiseExample.
then(res => console.log(res))
.catch(err => console.error(err)); 
*/

//! promisifying
const wait = function(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
.then(() => wait(2))
.then(() => wait(2))
.then(() => wait(2))
.then(() => wait(2));

// promise resolve returns a promise that will immediatly be resolved
// the param passed in will be the value resolved!
/* 
Promise.resolve('abc').then(x => console.log(x));
Promise.reject('abc').catch(x => console.error(x));
 */

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// Coding Challenge #2

/* 
  Build the image loading functionality that I just showed you on the screen.

  Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

  PART 1
  1. Create a function 'createImage' which receives imgPath as an input.
  This function returns a promise which creates a new image (use document.createElement('img')) and sets the 
  .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' 
  class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

  If this part is too tricky for you, just watch the first part of the solution.

  PART 2
  2. Consume the promise using .then and also add an error handler;
  3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
  4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned 
    by the createImage promise to 
    hide the current image. You will need a global variable for that 😉);
  5. After the second image has loaded, pause execution for 2 seconds again;
  6. After the 2 seconds have passed, hide the current image.

  TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' 
  in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/* 
const createImage = function(path){
  return new Promise(function(resolve, reject){
    const img = document.createElement('img');
    img.src = path;

    img.addEventListener('load', function(){
      document.querySelector('.images').append(this);
      resolve(this);
    });

    img.addEventListener('error', reject);
  });
};

const image = 
createImage('img/img-1.jpg')
.then(img =>
  wait(2)
  .then(() => img.style.display = 'none')
  .then(() => wait(2))
  .then(() => createImage('img/img-2.jpg')))
.then(img => 
  wait(2)
  .then(() => img.style.display = 'none'))
.catch(() => console.error('err'));
 */



// special kind of function: async
const whereAmIAsync1 = async function(){
  try{
    const pos = await getPosition();
    const {latitude: lat, longitude: lng} = pos.coords;
  
    const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    
    if(!resGeo.ok)
      throw new Error('Problem getting location Data');

    const dataGeo = await resGeo.json();
    

    const respCountry = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.countryName}`);

    if(!respCountry.ok)
      throw new Error('Problem getting country');

    const data = await respCountry.json();
  
    renderCountry(data[0]);
    countriesContainer.style.opacity = '1';

    return `you are in ${dataGeo.countryName}`
  }
  catch(err){
    renderError(err.message)

    // Reject promise returned from async function
    return err;
  }
};
/* 
const get3Countries = async function(c1, c2, c3){
  try{
    const [[cData1], [cData2], [cData3]] = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`, 'Country not found!'), 
      getJSON(`https://restcountries.com/v3.1/name/${c2}`, 'Country not found!'),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`, 'Country not found!')
    ]);

    console.log(cData1.capital[0], cData2.capital[0], cData3.capital[0]);
  }catch(err){
    console.error(err.message);
  }
};

get3Countries('portugal', 'germany','france'); 
*/

// * Promise.race
// ! this combinator function takes in an array of promises and returns a the 
// ! promise that settled first also as a promise whos fullfiled value/ rejected value wil be
// ! the same value of the promise that settled first

const resp = Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/germany`, 'Country not found!'), 
  getJSON(`https://restcountries.com/v3.1/name/portugal`, 'Country not found!'),
  getJSON(`https://restcountries.com/v3.1/name/france`, 'Country not found!')
]).then(vals => console.log(vals));

const timeout = s => new Promise(
  (_, reject) => setTimeout(() => reject(new Error('Request took to long')), s * 1000)
);

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/france`),
  timeout(0.1)
])
.then(data => console.log(data))
.catch(err => console.error(err));

// * Promise.allSettled
// ! this function takes in an array of promises and returns an array of all of the settled promises
// ! no matter if their rejected or resolved!

Promise.allSettled([
  Promise.resolve('Sucess'),
  Promise.reject('Error'),
  Promise.resolve('Sucess'),
])
.then(res => console.log(res))
.catch(err => console.error(err.message));





const createImage = function(path){
  return new Promise(function(resolve, reject){
    const img = document.createElement('img');
    img.src = path;

    img.addEventListener('load', function(){
      document.querySelector('.images').append(this);
      resolve(this);
    });

    img.addEventListener('error', () => reject(new Error('an error occured')));
  });
};
/* 
const image = 
createImage('img/img-1.jpg')
.then(img =>
  wait(2)
  .then(() => img.style.display = 'none')
  .then(() => wait(2))
  .then(() => createImage('img/img-2.jpg')))
.then(img => 
  wait(2)
  .then(() => img.style.display = 'none'))
.catch(() => console.error('err'));
*/


/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). 
Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
/* 
const loadNPause = async function(){
  let image = await createImage('img/img-1.jpg');
  await wait(2);

  image.style.display = 'none';
  await wait(2);

  image = await createImage('img/img-2.jpg');
  await wait(2);

  image.style.display = 'none';
};

const loadAll = async function(imgArr){
  const imgs = await Promise.all(imgArr.map(path => createImage(path)));
  imgs.forEach(img => img.classList.add('parallel'));
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']); 
*/