'use strict';

const input = document.querySelector('#input-new-task');
const addTaskBtn = document.querySelector('.addTaskBtn');
const clearBtn = document.querySelector('.clearBtn');
const todoContainer = document.querySelector('.todo-container');

let todos = [];

const editTask = function(text){
  const newEdit = prompt('What should the new edit be?');
  (!newEdit) ? alert('Please Fill Something In!') : text.textContent = newEdit;
}

const resetInput = () => input.value = '';
const deleteTask = (elem) =>  todoContainer.removeChild(elem);
const newlyAddedToDo = () => Array.from(todoContainer.children)[0];
const getUserInput = () => input.value;

const addTask = function(){
  if(todos.length === 4){
    alert('you can only add 4 elements at a time!');
    resetInput();
    return -1;
  }

  if(!getUserInput()){
    alert('Please fill something in!');
    return -1;
  }

  const html = `
  <div class = 'todo'>
    <span class = 'description'>${getUserInput()}</span>
    <div>
      <button class = 'edit-btn'>Edit</button>
      <button class = 'delete-btn'>Delete</button>
    </div>
  </div>`;

  todoContainer.insertAdjacentHTML('afterbegin', html);
  resetInput();

  const justAddedToDo = newlyAddedToDo();
  todos.unshift(justAddedToDo);

  const [text, deleteAndEdit] = Array.from(justAddedToDo.children);
  const [editElement, deleteElement] = Array.from(deleteAndEdit.children);

  editElement.addEventListener('click', () => editTask(text));
  deleteElement.addEventListener('click', () => deleteTask(justAddedToDo));
};

addTaskBtn.addEventListener('click', addTask);
document.addEventListener('keypress', (e) => (e.key === 'Enter') && addTask());
clearBtn.addEventListener('click', () => {
  todoContainer.innerHTML = ''; 
  todos = [];
  resetInput()
});