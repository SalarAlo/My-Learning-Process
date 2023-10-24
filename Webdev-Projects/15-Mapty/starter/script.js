'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  id = String(new Date().getTime()).slice(-10);
  clicks = 0;

  constructor(distance, duration, coordinates) {
    this.distance = distance;
    this.duration = duration;
    this.coordinates = coordinates; // [latitude, langitude]
  }

  _setDescription(){
    console.log(this.date);
    this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
  }

  click(){
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(distance, duration, coordinates, cadence) {
    super(distance, duration, coordinates);
    this.cadence = cadence;

    this.#calcPace();
    this._setDescription();
  }

  #calcPace() {
    // min per km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, coordinates, elevationGain) {
    super(distance, duration, coordinates);
    this.elevationGain = elevationGain;

    this.#calcSpeed();
    this._setDescription();
  }

  #calcSpeed() {
    // min per km
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

//////////////////////////////////////////////////
// ! APPLICATION ARCHITECTURE


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');

// input
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// buttons
const sortBtn =  document.querySelector('.sort-btn');
const deleteAllBtn = document.querySelector('.delete-all-btn');
const showAllBtn = document.querySelector('.show-all-btn');

class App {
  #workouts = [];
  #map;
  #mapZoomDef = 13;
  #mapEvent;
  #storageKey = 'workouts';

  constructor() {
    // get users position
    this.#getPosition();

    this.#renderLocalStorage();

    form.addEventListener('submit', this.#newWorkout.bind(this));
    inputType.addEventListener('change', this.#toggleElevationField.bind(this));
    containerWorkouts.addEventListener('click', this.#moveToMarker.bind(this));

    sortBtn.addEventListener('click', this.#sortWorkouts.bind(this));
    deleteAllBtn.addEventListener('click', this.#reset);
    showAllBtn.addEventListener('click', this.#showAllWorkouts.bind(this));
  }

  #getPosition() {
    if (!navigator.geolocation)
      return;

    navigator.geolocation.getCurrentPosition(this.#loadMap.bind(this), () => alert('Could not get Position'));
  }

  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coordinates = [latitude, longitude];

    this.#map = L.map('map').setView(coordinates, this.#mapZoomDef);
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(this.#map);
    this.#map.addEventListener('click', this.#showForm.bind(this));
    
    this.#workouts.forEach(work => 
      this.#renderWorkoutMarker(work)
    );
  }

  #showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  #toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  #newWorkout(e) {
    e.preventDefault();

    // * Get the current coordinates
    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];

    // * Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    
    let workout;

    // * Todo check if data is valid
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);  
    const allValid = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allNonEmpty = (...inputs) => inputs.every(inp => inp !== 0);
    
    // * if activity = running, create running object
    if(type === 'running'){
      const cadence = +inputCadence.value;

      if(!allNonEmpty(duration, distance, cadence))
        return alert('Not all Inputs have been filled out!');
      
      if(!allValid(cadence, distance, duration))
        return alert('Inputs contains invalid number!');

      if(!allPositive(cadence, distance, duration))
        return alert('Inputs contains negative number!');

      workout = new Running(distance, duration, coords, cadence);
    }

    // * if activity = cycling, create cycling object
    if(type === 'cycling'){
      const elevation = +inputElevation.value;

      if(!allPositive(distance, duration))
        return alert('Inputs contains negative number!');
      
      if(!allValid(elevation, distance, duration))
        return alert('Inputs contains invalid number!');

      workout = new Cycling(distance, duration, coords, elevation);
    }
    
    // * Add new object tp work out array 
    this.#workouts.push(workout);
    
    // * Render Workout on map as a marker
    this.#renderWorkoutMarker(workout, type);

    // * Render workout list
    this.#renderWorkout(workout);

    // * Hide form + clear workout input
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = inputCadence.value = '';
    form.classList.add('hidden');

    // * set local storage to all workouts
    this.#setLocalStorage();
  }

  #renderWorkout(workout){
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>

      <div class="workout__details">
        <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>

      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      `;

    if(workout.type === 'running'){
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>

        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
        
        <button class = 'delete-btn'>
          Delete
        </button>
      </li>
      `;
    }

    if(workout.type === 'cycling'){
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>

        <button class = 'delete-btn'>
          Delete
        </button>
      </li>`;
    }

    html += ``

    form.insertAdjacentHTML('afterend', html);
    const currentDeleteButton = document.querySelector('.delete-btn');
    console.log(currentDeleteButton);
    this.#addDeleteConnection(currentDeleteButton, workout);
  }

  #addDeleteConnection(btn, workout){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      this.#deleteWorkout.call(this, workout);
    }.bind(this));
  }

  #renderWorkoutMarker(workout){
    const marker = L.marker(workout.coordinates);
    const popup = L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${workout.type}-popup`,
      content: (workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️') + '  ' + workout.description
    });

    marker.bindPopup(popup);
    marker.addTo(this.#map).openPopup();
  }

  #moveToMarker(e){
    const workoutElement = e.target.closest('.workout');

    if(!workoutElement)
      return ;

    const workout = this.#workouts.find(
      workout => workout.id === workoutElement.dataset.id
    );
    
    this.#map.setView(workout.coordinates, this.#mapZoomDef, {
      animate: true,
      pan: 1,
    });

    workout.click();
  }

  #setLocalStorage(){
    localStorage.setItem(this.#storageKey, JSON.stringify(this.#workouts));
  }

  #renderLocalStorage(){
    const data = JSON.parse(localStorage.getItem(this.#storageKey));

    if(!data)
      return ;

    this.#restorePropertyChain(data);

    this.#workouts = data;
    this.#workouts.forEach(work => {
      this.#renderWorkout(work);
    });
  }

  #restorePropertyChain(data){
    data.forEach((work, i) => {
      data[i] = work.type === 'running' ? 
      new Running(work.distance, work.duration, work.coordinates, work.cadence) :
      new Cycling(work.distance, work.duration, work.coordinates, work.elevationGain);
    });
  }

  #sortWorkouts(){
    const sortType = +prompt(`by what so you want to sort? 
    Distance? Please type in '1'
    Duration? Please type in '2'`);

    if(!this.#workouts[0])
      return alert('please dont use the sort button on no workouts');

    if(sortType != 1 && sortType != 2)
      return alert('please dont enter any other number then 1 or 2');

    //* sort by duration
    
    const sortedWorkouts = sortType == 2 ? 
        [...this.#workouts].sort((w1, w2) => w1.duration - w2.duration) :
        [...this.#workouts].sort((w1, w2) => w1.distance - w2.distance) ;

    this.#workouts = sortedWorkouts;

    this.#setAndReload();
  }

  #reset(){
    localStorage.removeItem('workouts');
    location.reload();
  }

  #deleteWorkout(targetWorkout){
    this.#workouts = this.#workouts.filter(work => work != targetWorkout);
    this.#setAndReload();
  }

  #setAndReload(){
    this.#setLocalStorage();
    location.reload();
  }

  #showAllWorkouts(){
    const averageLatitude = this.#workouts.reduce((accu, work) => accu + work.coordinates[0], 0) / this.#workouts.length;
    const averageLongitude = this.#workouts.reduce((accu, work) => accu + work.coordinates[1], 0) / this.#workouts.length;
    const coords = [averageLatitude, averageLongitude];

    this.#map.setView(coords, 10)
  }
}

const app = new App();