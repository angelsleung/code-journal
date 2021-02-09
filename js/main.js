/* global data */
/* exported data */
function updatePhoto(event) {
  var photoUrl = event.target.value;
  placeholderImage.setAttribute('src', photoUrl);
}

var inputPhotoUrl = document.querySelector('.input-photo-url');
var placeholderImage = document.querySelector('.placeholder-image');
inputPhotoUrl.addEventListener('input', updatePhoto);
