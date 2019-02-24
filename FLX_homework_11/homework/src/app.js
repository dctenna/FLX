let actionsCounter = 0;
const inputAddNewAction = document.getElementById('add-new-action-input');
const addButton = document.getElementById('add-button');
let amountOfActionChanged = 1;

inputAddNewAction.addEventListener('keyup', checkInput);
addButton.addEventListener('click', verifyActionsLimit);

function verifyActionsLimit() {
  if (inputAddNewAction.value.trim()) {
    let maxActionItems = 10;
    if (actionsCounter < maxActionItems) {
      addNewAction();
    }
    if (actionsCounter === maxActionItems) {
      document.getElementById('notification').textContent = 'Maximum item per list are created';
      inputAddNewAction.value = '';
      inputAddNewAction.setAttribute('disabled', 'disabled');
    }
  }
}

function addNewAction() {
  const actionList = document.getElementById('action-list');
  const actionItem = document.createElement('li');

  actionItem.setAttribute('draggable', 'true');
  actionItem.addEventListener('dragstart', handleDragStart, false);
  actionItem.addEventListener('dragover', handleDragOver, false);
  actionItem.addEventListener('drop', handleDrop, false);
  actionItem.setAttribute('class', 'action-item');
  actionList.appendChild(actionItem);
  actionList.addEventListener('click', clickOnItem);

  const squareAndText = document.createElement('div');
  squareAndText.setAttribute('class', 'square-and-text');
  actionItem.appendChild(squareAndText);

  const uncheckedSquare = document.createElement('i');
  squareAndText.appendChild(uncheckedSquare);
  uncheckedSquare.setAttribute('class', 'material-icons md-36 unchecked-square');
  const uncheckedSquareText = document.createTextNode('check_box_outline_blank');
  uncheckedSquare.appendChild(uncheckedSquareText);

  const action = document.createElement('p');
  squareAndText.appendChild(action);
  const actionText = document.createTextNode(inputAddNewAction.value);
  action.appendChild(actionText);

  const bin = document.createElement('i');
  actionItem.appendChild(bin);
  bin.setAttribute('class', 'material-icons md-36 delete');
  const binText = document.createTextNode('delete');
  bin.appendChild(binText);

  actionsCounter += amountOfActionChanged;

  inputAddNewAction.value = '';
  addButton.setAttribute('class', 'material-icons md-dark md-inactive md-36');
  addButton.style.cursor = 'default';
}

function checkInput() {
  if (inputAddNewAction.value.trim()) {
    addButton.setAttribute('class', 'material-icons md-36');
    addButton.style.cursor = 'pointer';
  } else {
    addButton.setAttribute('class', 'material-icons md-dark md-inactive md-36');
  }
}

function clickOnItem(event) {
  if (event.target.classList.contains('delete')) {
    deleteAction(event);
  }
  if (event.target.classList.contains('unchecked-square')) {
    markActionDone(event);
  }
}

function markActionDone(event) {
  event.target.textContent = 'check_box';
  event.target.setAttribute('id', 'checked-square');
}

function deleteAction(event) {
  event.target.parentElement.remove();
  actionsCounter -= amountOfActionChanged;
  document.getElementById('notification').textContent = '';
  inputAddNewAction.removeAttribute('disabled');
  addButton.setAttribute('class', 'material-icons md-36');
  addButton.style.cursor = 'pointer';
}

let dragSourceElement = null;

function handleDragOver(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }

  return false;
}

function handleDragStart(event) {
  dragSourceElement = this;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDrop(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  if (dragSourceElement !== this) {
    dragSourceElement.innerHTML = this.innerHTML;
    this.innerHTML = event.dataTransfer.getData('text/html');
    this.addEventListener('click', clickOnItem);
    dragSourceElement.addEventListener('click', clickOnItem);
  }

  return false;
}