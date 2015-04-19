window.addEventListener('load', function() {
  options.users.value = localStorage.users;
                                         // The display frequency, in minutes.

  options.update.onclick = function() {
    localStorage.users = options.users.value;
  };
});
