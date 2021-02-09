/* global data */
/* exported data */
function updatePhoto(event) {

  var photoUrl = event.target.value;
  placeholderImage.setAttribute('src', photoUrl);
}

function submit(event) {
  event.preventDefault();
  var entry = {};
  entry.title = form.elements.title.value;
  entry.photoUrl = form.elements.photoUrl.value;
  entry.notes = form.elements.notes.value;
  entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.shift(entry);
}

var inputPhotoUrl = document.querySelector('.input-photo-url');
var placeholderImage = document.querySelector('.placeholder-image');
inputPhotoUrl.addEventListener('input', updatePhoto);

var form = document.querySelector('.form');
form.addEventListener('submit', submit);
