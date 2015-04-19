window.addEventListener('load', function() {
  options.users.value = localStorage.users;
  options.update.onclick = function(e) {
    e.preventDefault();
    localStorage.users = options.users.value;
    chrome.storage.sync.set({"users": options.users.value}, function() {
        $("#message").html("Updated");
    });
  };
});
