import { authHeader, handleResponse } from '../helpers';

export const groupService = {
    getGroupDetails,
};

const url = process.env.REACT_APP_COVEY_SERVER_URL;

function getGroupDetails(groupIdent) {
    const requestOptions = {
        method: 'GET',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader()),
    }

    return fetch(`${url}/groups/${groupIdent}`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response;
    });
}
