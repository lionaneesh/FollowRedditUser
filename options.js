window.addEventListener('load', function() {
  options.users.value = localStorage.users;
  options.update.onclick = function() {
    localStorage.users = options.users.value;
  };
});
