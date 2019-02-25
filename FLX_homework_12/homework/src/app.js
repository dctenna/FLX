const rootNode = document.getElementById('root');

const localStorageKeyTodo = 'myAwesomeTodoList';
const localStorageKeyDone = 'myAwesomeDoneList';
const jsonTodo = localStorage.getItem(localStorageKeyTodo);
const jsonDone = localStorage.getItem(localStorageKeyDone);

const todoItems = JSON.parse(jsonTodo) || [];
const doneItems = JSON.parse(jsonDone) || [];
const notExistIndex = -1;

function setLocalStorageObjectItem(array, localStorageKey) {
  localStorage.setItem(localStorageKey, JSON.stringify(array));
}

window.addEventListener('load', checkHash);
window.addEventListener('hashchange', checkHash);

const hashForMainPage = '';
const hashForAddNewItemPage = '#/add';
const hashForModifyItemPage = '#/modify/';

function checkHash() {
  if (location.hash === hashForMainPage) {
    renderMainPage();
  }

  if (location.hash === hashForAddNewItemPage) {
    renderAddNewItemPage();
  }

  if (location.hash.includes(hashForModifyItemPage)) {
    renderModifyItemPage();
  }
}

function renderMainPage() {
  rootNode.innerHTML = '';

  const h1 = document.createElement('h1');
  rootNode.appendChild(h1);

  const h1Text = document.createTextNode('Simple TODO application');
  h1.appendChild(h1Text);

  const addButton = document.createElement('button');
  rootNode.appendChild(addButton);

  const addButtonText = document.createTextNode('Add new task');
  addButton.appendChild(addButtonText);
  addButton.setAttribute('class', 'button');

  const arrToRender = todoItems.concat(doneItems);

  if (!arrToRender.length) {
      const paragraph = document.createElement('p');
      rootNode.appendChild(paragraph);

      const paragraphText = document.createTextNode('TODO is empty');
      paragraph.setAttribute('class', 'empty-list');
      paragraph.appendChild(paragraphText);

  } else {
    const todoItemsList = document.createElement('ul');
    rootNode.appendChild(todoItemsList);

    arrToRender.forEach((item) => {
      const actionListItem = document.createElement('li');
      actionListItem.setAttribute('class', 'action-list-item');
      rootNode.appendChild(actionListItem);
      actionListItem.setAttribute('id', item.id);

      const square = document.createElement('img');
      actionListItem.appendChild(square);
      square.setAttribute('class', 'square');

      const toDoAction = document.createElement('a');
      actionListItem.appendChild(toDoAction);

      const toDoActionDescription = document.createTextNode(item.description);
      toDoAction.appendChild(toDoActionDescription);
      toDoAction.setAttribute('class', 'action-description');
      toDoAction.setAttribute('href', `${hashForModifyItemPage}${item.id}`);

      if (!item.isDone) {
        square.setAttribute('src', './assets/img/todo-s.png');
      } else {
        square.setAttribute('src', './assets/img/done-s.png');
        toDoAction.style.backgroundColor = 'grey';
      }

      square.addEventListener('click', markChecked);

      const remove = document.createElement('img');
      actionListItem.appendChild(remove);
      remove.setAttribute('src', './assets/img/remove-s.jpg');
      remove.addEventListener('click', removeActionItem);
    });
  }
  addButton.addEventListener('click', setHashForAddNewItemPage);
}

function markChecked(event) {
  const itemId = parseInt(event.target.parentNode.id);
  const indexOfElementToRemove = todoItems.findIndex(item => item.id === itemId);
  if (indexOfElementToRemove === notExistIndex) {
    return
  }
  const currentActionItemInTodoList = todoItems[indexOfElementToRemove];
  currentActionItemInTodoList.isDone = true;
  todoItems.splice(indexOfElementToRemove, 1);
  doneItems.push(currentActionItemInTodoList);

  setLocalStorageObjectItem(todoItems, localStorageKeyTodo);
  setLocalStorageObjectItem(doneItems, localStorageKeyDone);

  renderMainPage();
}

function removeActionItem(event) {
  const itemId = parseInt(event.target.parentNode.id);
  const removeFromTodoItems = todoItems.findIndex(item => item.id === itemId);
  if (removeFromTodoItems !== notExistIndex) {
    todoItems.splice(removeFromTodoItems, 1);
  }
  const removeFromDoneItems = doneItems.findIndex(item => item.id === itemId);

  if (removeFromDoneItems !== notExistIndex) {
    doneItems.splice(removeFromDoneItems, 1);
  }

  setLocalStorageObjectItem(todoItems, localStorageKeyTodo);
  setLocalStorageObjectItem(doneItems, localStorageKeyDone);

  renderMainPage();
}

function setHashForAddNewItemPage(event) {
  window.location.hash = hashForAddNewItemPage;
  event.preventDefault();
}

function renderAddNewItemPage() {
  rootNode.innerHTML = '';

  const h1 = document.createElement('h1');
  rootNode.appendChild(h1);
  const h1Text = document.createTextNode('Add task');
  h1.appendChild(h1Text);

  const inputNewTask = document.createElement('input');
  inputNewTask.setAttribute('id', 'input-field');
  rootNode.appendChild(inputNewTask);

  const divForButtons = document.createElement('div');
  divForButtons.setAttribute('class', 'buttons');
  rootNode.appendChild(divForButtons);
  const cancelButton = document.createElement('button');
  divForButtons.appendChild(cancelButton);
  cancelButton.setAttribute('class', 'button');
  const cancelButtonText = document.createTextNode('Cancel');
  cancelButton.appendChild(cancelButtonText);
  const saveChangesButton = document.createElement('button');
  divForButtons.appendChild(saveChangesButton);
  saveChangesButton.setAttribute('class', 'button');
  const saveChangesButtonText = document.createTextNode('Save changes');
  saveChangesButton.appendChild(saveChangesButtonText);

  cancelButton.addEventListener('click', setHashForMainPage);
  saveChangesButton.addEventListener('click', saveAfterAdd);
}

function setHashForMainPage(event) {
  window.location.hash = hashForMainPage;
  event.preventDefault();
}

function saveAfterAdd() {
  const newAction = document.getElementById('input-field').value;

  if (!newAction) {
    return;
  }
  todoItems.push({isDone: false, id: generateId(), description: newAction});
  setLocalStorageObjectItem(todoItems, localStorageKeyTodo);
  setHashForMainPage(event);
}

function generateId() {
  const ids = todoItems.concat(doneItems).map((item) => item.id);
  return ids.length ? 1 + Math.max(...ids) : 1;
}

function renderModifyItemPage() {
  const itemId = parseInt(location.hash.split('/').pop());
  const itemToModify = todoItems.find(item => item.id === itemId);

  if (!itemToModify) {
    window.location.hash = hashForMainPage;
    return;
  }
  rootNode.innerHTML = '';

  const h1 = document.createElement('h1');
  rootNode.appendChild(h1);
  const h1Text = document.createTextNode('Modify item');
  h1.appendChild(h1Text);

  const inputWithActionItem = document.createElement('input');
  inputWithActionItem.setAttribute('id', 'input-field');
  rootNode.appendChild(inputWithActionItem);
  inputWithActionItem.defaultValue = itemToModify.description;

  const divForButtons = document.createElement('div');
  divForButtons.setAttribute('class', 'buttons');
  rootNode.appendChild(divForButtons);
  const cancelButton = document.createElement('button');
  divForButtons.appendChild(cancelButton);
  cancelButton.setAttribute('class', 'button');
  const cancelButtonText = document.createTextNode('Cancel');
  cancelButton.appendChild(cancelButtonText);
  const saveChangesButton = document.createElement('button');
  divForButtons.appendChild(saveChangesButton);
  saveChangesButton.setAttribute('class', 'button');
  const saveChangesButtonText = document.createTextNode('Save changes');
  saveChangesButton.appendChild(saveChangesButtonText);

  cancelButton.addEventListener('click', setHashForMainPage);
  saveChangesButton.addEventListener('click', saveAfterModify);
}

function saveAfterModify(event) {
  const modifiedAction = document.getElementById('input-field').value;

  if (!modifiedAction) {
    return;
  }
  const itemId = parseInt(location.hash.split('/').pop());
  todoItems.find(item => item.id === itemId).description = modifiedAction;
  setLocalStorageObjectItem(todoItems, localStorageKeyTodo);
  setHashForMainPage(event);
}
