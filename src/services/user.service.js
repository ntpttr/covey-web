import { authHeader } from '../helpers';

export const userService = {
    login,
    getCurrentUser,
    registerUser,
    updateUser,
    deleteUser,
    logout
};

const url = 'http://localhost:3000';

function getCurrentUser() {
    const requestOptions = {
        method: 'GET',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader()),
    }

    return fetch(`${url}/user`, requestOptions)
    .then(response => {
        if (!response.ok) {
            return null;
        }
        return response.user;
    });
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${url}/user/login`, requestOptions)
    .then(handleResponse)
    .then(response => {
        // store jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        return response.user;
    });
}

function registerUser(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    }

    return fetch(`${url}/user`, requestOptions)
    .then(handleResponse)
    .then(response => {
        // store jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        return response.user;
    });
}

function updateUser(property, value) {
    let body = {};
    body[property] = value;
    
    const requestOptions = {
        method: 'PUT',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader()),
        body: JSON.stringify(body),
    };

    return fetch(`${url}/user`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response.user;
    });
}

function deleteUser() {
    const requestOptions = {
        method: 'DELETE',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader()),
    }

    return fetch(`${url}/user`, requestOptions)
    .then(handleResponse)
    .then(response => {
        logout();
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        

        return data;
    });
}