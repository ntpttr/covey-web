import { authHeader, handleResponse } from '../helpers';

export const userService = {
    login,
    getCurrentUser,
    getUserGroups,
    registerUser,
    updateUser,
    deleteUser,
};

const url = process.env.REACT_APP_COVEY_SERVER_URL;

function getCurrentUser() {
    const requestOptions = {
        method: 'GET',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader()),
    }

    return fetch(`${url}/me`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response.user;
    });
}

function getUserGroups() {
    const requestOptions = {
        method: 'GET',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader()),
    }

    return fetch(`${url}/me/groups`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response.groups;
    });
}

function login(identifier, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({identifier, password})
    };

    return fetch(`${url}/users/login`, requestOptions)
    .then(handleResponse)
    .then(response => {
        // store jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        return response.user;
    });
}

function registerUser(username, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, email, password}),
    }

    return fetch(`${url}/users`, requestOptions)
    .then(handleResponse);
}

function updateUser(properties) {
    const requestOptions = {
        method: 'PATCH',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader()),
        body: JSON.stringify(properties),
    };

    return fetch(`${url}/me`, requestOptions)
    .then(handleResponse)
    .then(response => {
        // store jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        return response;
    });
}

function deleteUser() {
    const requestOptions = {
        method: 'DELETE',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader()),
    }

    return fetch(`${url}/me`, requestOptions)
    .then(handleResponse);
}
