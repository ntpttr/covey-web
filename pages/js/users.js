function registerUser() {

    if ($('#username').val().trim().length === 0 || $('#password').val().trim().length === 0) {
        return;
    }

    var username = $('#username').val();
    var password = $('#password').val();

    $.post('users', {'username': username, 'password': password}, function(res) {
        //TODO Do stuff in the window instead of just console logging!
        if (res.status == false) {
            console.log(res.message);
        } else {
            console.log('Registered user!');
        }
    });
}

function login() {

    var username = $('#username').val();
    var password = $('#password').val();

    $.post('users/login', {'username': username, 'password': password}, function(res) {
        //TODO Do stuff in the window instead of just console logging!
        if (res.err) {
            console.log('Error: ' + res.err);
        } else if (res.status) {
            console.log('Login successful!');
        } else {
            if (res.foundUser) {
                console.log('Incorrect password for user ' + username);
            } else {
                console.log('User ' + username + ' not found!');
            }
        }
    });
}
