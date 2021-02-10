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
  form.reset();
  viewEntries();
  location.reload();
}

function renderEntry(entry) {
  var entryItem = document.createElement('li');
  entryItem.className = 'entry';

  var row = document.createElement('div');
  row.className = 'row';
  entryItem.append(row);

  var firstColumnHalf = document.createElement('div');
  firstColumnHalf.className = 'column-half';
  row.append(firstColumnHalf);

  var entryImage = document.createElement('img');
  entryImage.className = 'entry-image';
  entryImage.setAttribute('src', entry.photoUrl);
  entryImage.setAttribute('alt', 'Entry Image');
  firstColumnHalf.append(entryImage);

  var secondColumnHalf = document.createElement('div');
  secondColumnHalf.className = 'column-half';
  row.append(secondColumnHalf);

  var entryTitle = document.createElement('h2');
  entryTitle.className = 'entry-title';
  entryTitle.textContent = entry.title;
  secondColumnHalf.append(entryTitle);

  var entryNotes = document.createElement('p');
  entryNotes.className = 'entry-notes';
  entryNotes.textContent = entry.notes;
  secondColumnHalf.append(entryNotes);

  return entryItem;
}

function DOMContentLoaded(event) {
  var entries = document.querySelector('.entries');
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = renderEntry(data.entries[i]);
    entries.append(renderedEntry);
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

var inputPhotoUrl = document.querySelector('.input-photo-url');
var placeholderImage = document.querySelector('.entry-image');
inputPhotoUrl.addEventListener('input', updatePhoto);

var form = document.querySelector('.form');
form.addEventListener('submit', clickSubmit);

document.addEventListener('DOMContentLoaded', DOMContentLoaded);

var entryForm = document.querySelector('.entry-form');
var entries = document.querySelector('.entries');
var newButton = document.querySelector('.new-entry');
newButton.addEventListener('click', createNewEntry);

var entriesNav = document.querySelector('.entries-nav');
entriesNav.addEventListener('click', viewEntries);

if (data.view === 'entry-form') {
  createNewEntry();
} else {
  viewEntries();
}
