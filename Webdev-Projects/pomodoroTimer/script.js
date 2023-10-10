'use strict';

//! Elements !//
// buttons
const startBtn = document.querySelector('.btn-start');
const cancelTaskBtn = document.querySelector('.cancel-btn');
const saveTaskBtn = document.querySelector('.save-btn');
const addTaskBtn = document.querySelector('.btn-add-todo');
const optionsTodoBtn = document.querySelector('.options-btn');

// labels
const timerLabel = document.querySelector('.timer-label');
const sessionsCountLabel = document.querySelector('.counter'); 

// containers
const addTaskModal = document.querySelector('.add-container');
const todoContainer = document.querySelector('.todo-container');

// inputs
const taskInp = document.querySelector('.task-input');


const originTime = timerLabel.textContent;


let currentTimeInSeconds = Number.parseInt(timerLabel.textContent) * 60 - 1;
let sessionsCount = 1;
let timerIsRunning = false;

let timerObject = null;

let todos = [];

const checked = [];
const unchecked = [];

const addZero = num => num >= 10 ? num : '0' + num;
const setLabelTime = (minutes, seconds) => timerLabel.textContent = `${addZero(minutes)}:${addZero(seconds)}`;

class Todo {
  constructor(todoElement, checkBox, amountElement){
    this.todoElement = todoElement;
    this.checkBox = checkBox;
    this.amountElement = amountElement;
  }
};

const finishTimer = function(){
  timerLabel.textContent = originTime;
  sessionsCount++;
  sessionsCountLabel.textContent = `#${sessionsCount}`;
  startBtn.textContent = 'START';
  stopTimer();
}

const startTimer = function(){
  timerIsRunning = true;
  startBtn.textContent = 'STOP';
  const decrease = function(){
    const [displayMinutes, displaySeconds] = [Math.floor(currentTimeInSeconds / 60), currentTimeInSeconds % 60];
    currentTimeInSeconds--;
    setLabelTime(displayMinutes, displaySeconds);

    if(displayMinutes == '0' && displaySeconds == '0')
      finishTimer();
  };

  timerObject = setInterval(decrease, 1000);
};

const stopTimer = function(){
  timerIsRunning = false;
  startBtn.textContent = 'START';
  clearInterval(timerObject);
  timerObject = null;
};

const resetSessionCount = function(){
  const userWantsReset = confirm('Do you really want to reset your sessions?');
  
  if(!userWantsReset)
    return;

  sessionsCount = 1;
  sessionsCountLabel.textContent = '#1';
};

const discoverTodoUI = () => addTaskModal.classList.remove('hidden');

const resetTodoModal = function(){
  addTaskModal.classList.add('hidden');
  setTimeout(()=>{
    taskInp.value = '';
  }, 100)
}

const cancelTask = () =>{
  resetTodoModal();
};

const addTodoUI = function(){
  const todoHeader = taskInp.value;

  resetTodoModal();

  if(!todoHeader){
    alert('please enter in every requirement')
    return ;
  }

  const html = `
  <div class = 'todo'>
    <div>
      <input
      class="checkbox-todo"
      type="checkbox">
      <p class = 'todo-label-heading'>${todoHeader}</p>
    </div>

    <p class = 'todo-label-heading' style = 'color: rgb(90, 90, 90);'>0/1</p>
  </div>`;

  todoContainer.insertAdjacentHTML('afterbegin', html);

  const todoAdded = document.querySelector('.todo');
  const checkbox = todoAdded.children[0].children[0];
  const done = todoAdded.children[1];

  todos.unshift(new Todo(todoAdded, checkbox, done));

  checkbox.addEventListener('change', function(){
    if(this.checked) {
      this.parentElement.parentElement.classList.add('todo-done');
      done.textContent = '1/1';
    }
    else{
      this.parentElement.parentElement.classList.remove('todo-done');
      done.textContent = '0/1';
    }
  });
};


startBtn.addEventListener('click', () => !timerIsRunning ? startTimer() : stopTimer());
sessionsCountLabel.addEventListener('click', resetSessionCount);
addTaskBtn.addEventListener('click', discoverTodoUI);
cancelTaskBtn.addEventListener('click', cancelTask);
saveTaskBtn.addEventListener('click', addTodoUI);
/* optionsTodoBtn.addEventListener('click', ); */