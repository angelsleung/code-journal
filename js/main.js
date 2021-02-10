/* global data */
/* exported data */
function updatePhoto(event) {
  var photoUrl = event.target.value;
  placeholderImage.setAttribute('src', photoUrl);
}

function clickSubmit(event) {
  event.preventDefault();
  var entry = {};
  entry.title = form.elements.title.value;
  entry.photoUrl = form.elements.photoUrl.value;
  entry.notes = form.elements.notes.value;
  entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entry);
  placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  var renderedEntry = renderEntry(entry);
  entryList.prepend(renderedEntry);
  viewEntries();
  form.reset();
}

function renderEntry(entry) {
  var entryItem = document.createElement('li');
  entryItem.className = 'entry';

  var entryRow = document.createElement('div');
  entryRow.className = 'row';
  entryItem.append(entryRow);

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
  entryTitleRightHalf.className = 'half-row button-div';
  entryTitleRow.append(entryTitleRightHalf);

  var entryTitle = document.createElement('h2');
  entryTitle.className = 'entry-title';
  entryTitle.textContent = entry.title;
  entryTitleLeftHalf.append(entryTitle);

  var editIcon = document.createElement('i');
  editIcon.className = 'fas fa-edit';
  entryTitleRightHalf.append(editIcon);

  var entryNotes = document.createElement('p');
  entryNotes.className = 'entry-notes';
  entryNotes.textContent = entry.notes;
  rightColumnHalf.append(entryNotes);

  entryItem.setAttribute('data-entry-id', entry.entryId);
  return entryItem;
}

function DOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = renderEntry(data.entries[i]);
    entryList.append(renderedEntry);
  }
}

function createNewEntry(event) {
  entryForm.className = 'container entry-form';
  entries.className = 'container entries hidden';
  data.view = 'entry-form';
}

function viewEntries(event) {
  entryForm.className = 'container entry-form hidden';
  entries.className = 'container entries';
  data.view = 'entries';
}

function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  createNewEntry();
  var entryItem = event.target.closest('li');
  data.editing = entryItem;

  var entryId = entryItem.getAttribute('data-entry-id');
  var numEntries = data.entries.length;
  var entryIndex = numEntries - entryId;
  var entryObject = data.entries[entryIndex];

  inputTitle.value = entryObject.title;
  inputPhotoUrl.value = entryObject.photoUrl;
  placeholderImage.setAttribute('src', entryObject.photoUrl);
  inputNotes.value = entryObject.notes;
}

var entryForm = document.querySelector('.entry-form');
var entries = document.querySelector('.entries');

var entryList = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

var entriesNav = document.querySelector('.entries-nav');
entriesNav.addEventListener('click', viewEntries);

var newButton = document.querySelector('.new-button');
newButton.addEventListener('click', createNewEntry);

var form = document.querySelector('.form');
form.addEventListener('submit', clickSubmit);

var inputTitle = document.querySelector('.input-title');
var inputNotes = document.querySelector('.input-notes');

var inputPhotoUrl = document.querySelector('.input-photo-url');
var placeholderImage = document.querySelector('.entry-image');
inputPhotoUrl.addEventListener('input', updatePhoto);

entryList.addEventListener('click', editEntry);

if (data.view === 'entry-form') {
  createNewEntry();
} else {
  viewEntries();
}
