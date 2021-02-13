/* global data */
/* exported data */
function updatePhoto(event) {
  var photoUrl = event.target.value;
  placeholderImage.setAttribute('src', photoUrl);
}

function clickSave(event) {
  event.preventDefault();
  if (data.editing === null) {
    var entryObject = {};
    entryObject.entryId = data.nextEntryId;
  } else {
    var entryListElement = data.editing;
    entryObject = getEntryObject(entryListElement);
  }
  entryObject.title = form.elements.title.value;
  entryObject.photoUrl = form.elements.photoUrl.value;
  entryObject.notes = form.elements.notes.value;
  var renderedEntry = renderEntry(entryObject);

  if (data.editing === null) {
    entryList.prepend(renderedEntry);
    data.entries.unshift(entryObject);
    data.nextEntryId++;
  } else {
    entryListElement.replaceWith(renderedEntry);
  }
  viewEntries();
}

function renderEntry(entry) {
  var entryListElement = document.createElement('li');
  entryListElement.className = 'entry';

  var entryRow = document.createElement('div');
  entryRow.className = 'row';
  entryListElement.append(entryRow);

  var leftColumnHalf = document.createElement('div');
  leftColumnHalf.className = 'column-half';
  entryRow.append(leftColumnHalf);

  var entryImage = document.createElement('img');
  entryImage.className = 'entry-image';
  entryImage.setAttribute('src', entry.photoUrl);
  entryImage.setAttribute('alt', 'Entry Image');
  leftColumnHalf.append(entryImage);

  var rightColumnHalf = document.createElement('div');
  rightColumnHalf.className = 'column-half';
  entryRow.append(rightColumnHalf);

  var entryTitleRow = document.createElement('div');
  entryTitleRow.className = 'row';
  rightColumnHalf.append(entryTitleRow);

  var entryTitleLeftHalf = document.createElement('div');
  entryTitleLeftHalf.className = 'half-row';
  entryTitleRow.append(entryTitleLeftHalf);

  var entryTitleRightHalf = document.createElement('div');
  entryTitleRightHalf.className = 'half-row button-div right';
  entryTitleRow.append(entryTitleRightHalf);

  var entryTitle = document.createElement('h2');
  entryTitle.className = 'entry-title';
  entryTitle.textContent = entry.title;
  entryTitleLeftHalf.append(entryTitle);

  var editIcon = document.createElement('i');
  editIcon.className = 'fas fa-edit edit-icon';
  entryTitleRightHalf.append(editIcon);

  var entryNotes = document.createElement('p');
  entryNotes.className = 'entry-notes';
  entryNotes.textContent = entry.notes;
  rightColumnHalf.append(entryNotes);

  entryListElement.setAttribute('data-entry-id', entry.entryId);
  return entryListElement;
}

function DOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = renderEntry(data.entries[i]);
    entryList.append(renderedEntry);
  }
}

function viewEntryForm(event) {
  entryForm.className = 'container entry-form';
  entries.className = 'container entries hidden';
  data.view = 'entry-form';
}

function viewEntries(event) {
  entryForm.className = 'container entry-form hidden';
  entries.className = 'container entries';
  data.view = 'entries';
  deleteButton.className = 'delete-div hidden';
  data.editing = null;
}

function createEntry(event) {
  form.reset();
  placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewEntryForm();
}

function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  viewEntryForm();
  deleteButton.className = 'delete-button';

  var entryListElement = event.target.closest('li');
  data.editing = entryListElement;
  var entryObject = getEntryObject(entryListElement);

  inputTitle.value = entryObject.title;
  inputPhotoUrl.value = entryObject.photoUrl;
  placeholderImage.setAttribute('src', entryObject.photoUrl);
  inputNotes.value = entryObject.notes;
}

function getEntryObject(entryListElement) {
  var entryId = entryListElement.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId.toString()) {
      var entryObject = data.entries[i];
      return entryObject;
    }
  }
}

function clickDelete(event) {
  deletePopUp.className = 'delete-confirmation-div';
  overlay.className = 'overlay';
}

function cancelDelete(event) {
  deletePopUp.className = 'delete-confirmation-div hidden';
  overlay.className = 'overlay hidden';
}

function confirmDelete(event) {
  var entryListElement = data.editing;
  var entryId = entryListElement.getAttribute('data-entry-id');

  var entryNodeList = document.querySelectorAll('.entry');
  for (var i = 0; i < entryNodeList.length; i++) {
    if (entryNodeList[i].getAttribute('data-entry-id') === entryId) {
      entryNodeList[i].remove();
    }
  }
  for (i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId.toString()) {
      data.entries.splice(i, 1);
    }
  }
  cancelDelete();
  viewEntries();
}

var entryForm = document.querySelector('.entry-form');
var entries = document.querySelector('.entries');

var entryList = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

var entriesNav = document.querySelector('.entries-nav');
entriesNav.addEventListener('click', viewEntries);

var newButton = document.querySelector('.new-button');
newButton.addEventListener('click', createEntry);

var form = document.querySelector('.form');
form.addEventListener('submit', clickSave);

var inputTitle = document.querySelector('.input-title');
var inputNotes = document.querySelector('.input-notes');

var inputPhotoUrl = document.querySelector('.input-photo-url');
var placeholderImage = document.querySelector('.entry-image');
inputPhotoUrl.addEventListener('input', updatePhoto);

entryList.addEventListener('click', editEntry);

var deletePopUp = document.querySelector('.delete-confirmation-div');
var overlay = document.querySelector('.overlay');
var deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', clickDelete);

var cancelDeleteButton = document.querySelector('.cancel');
cancelDeleteButton.addEventListener('click', cancelDelete);

var confirmDeleteButton = document.querySelector('.confirm');
confirmDeleteButton.addEventListener('click', confirmDelete);

if (data.view === 'entry-form') {
  viewEntryForm();
} else {
  viewEntries();
}
