window.addEventListener('load', function load(event) {
  document.getElementById('submit').addEventListener('click', function() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    if (username !== '') {
      chrome.storage.local.set({ username, email }, function() {
        console.log('Value is set to ' + username);
      });
    }
  });
});