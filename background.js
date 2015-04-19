function show(title, body, click_url) {
  var notification = new Notification(title, {
    icon: '64.png',
    body: body
  });
	notification.onclick = function() {
		window.open(click_url);
	}
}

var interval_id;

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

function doStuff(users) {
	var user = users[0];
	chrome.storage.sync.get(user, function(last_permalink) {
		var new_perma = null;
		var stored_perma = "dummy";
		if (Object.keys(last_permalink).length != 0) {
			stored_perma = last_permalink[user];
		}
		var url = "http://www.reddit.com/user/" + user + ".json";
		$.get(url, function (data) {
			for (var i = 0; i < Object.keys(data.data.children).length; i++) {
			        var child = data.data.children[i];
			        if (!child.data.permalink) continue;
					if (child.data.permalink == stored_perma) break;


			        if (child.data.permalink != stored_perma && new_perma == null) {
			            new_perma = child.data.permalink;
					}
			        else {
			        	show(child.data.title, child.data.selftext, "http://reddit.com" + child.data.permalink);
			        }
			}
		}).done(function() {
			if (new_perma != null) {
				var user_obj = {};
				user_obj[user] = new_perma;
				chrome.storage.sync.set(user_obj, function() {
						console.log("last_perma updated!");
				});
			}
			if (users.length > 1) {
				doStuff(users.splice(1));				
			}
		});
		
	});
}

function initiate() {
  users = localStorage.users.split(",");
  interval_id = setInterval(function() { doStuff(users); } , 60000);
  doStuff(users);
}

// Test for notification support.
if (window.Notification) {
	initiate();
}
