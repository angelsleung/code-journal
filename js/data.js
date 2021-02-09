/* exported data */
function beforeUnload(event) {
  var entriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('entries-local-storage', entriesJSON);
}

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('entries-local-storage');
if (previousEntriesJSON !== null) {
  data.entries = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', beforeUnload);
