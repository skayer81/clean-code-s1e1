
const taskInput  =  document.getElementById('new-task');
const addButton  =  document.getElementsByTagName('button')[0];
const incompleteTaskHolder  =  document.getElementById('incomplete-tasks');
const completedTasksHolder  =  document.getElementById('completed-tasks');


//New task list item
const createNewTaskElement = function(taskString){
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.classList.add('tasks-item');
  checkBox.type = 'checkbox';
  checkBox.classList.add('tasks-item__checkbox');
  label.innerText = taskString;
  label.className = 'tasks-item__label';
  editInput.type = 'text';
  editInput.className = 'tasks-item__task';
  editButton.innerText = 'Edit';
  editButton.className = 'button tasks-item__button-edit';
  deleteButton.className = 'button tasks-item__button-delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt  =  '';
  deleteButtonImg.classList.add('button__remove-img')

  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

const addTask = function(){
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
}

const editTask = function(){
  console.log('Edit Task...');
  console.log(`Change 'edit' to 'save'`);
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type = text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.tasks-item__button-edit');
  const containsClass = listItem.classList.contains('tasks-item_edit-mode');

  if(containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('tasks-item_edit-mode');
};

const deleteTask = function(){
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

const taskCompleted = function(label, target){
  console.log('Complete Task...');
  const listItem = target.parentNode;
  completedTasksHolder.appendChild(listItem);
  label.classList.toggle('tasks-item__label_completed')
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function(label, target){
  console.log('Incomplete Task...');
  const listItem = target.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  label.classList.toggle('tasks-item__label_completed')
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function(){
  console.log('AJAX Request');
}

addButton.onclick = addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);


const bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  console.log('bind list item events');
  const checkBox = taskListItem.querySelector('input[type = checkbox]');
  const editButton = taskListItem.querySelector('.tasks-item__button-edit');
  const deleteButton = taskListItem.querySelector('.tasks-item__button-delete');
  const label = taskListItem.querySelector('.tasks-item__label');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = (event) => {console.log(event); checkBoxEventHandler(label, event.target)};
}

for (let i = 0; i<incompleteTaskHolder.children.length;i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i = 0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
