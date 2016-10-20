/**
 * This File is based off a file from Tyler Rockwell's Rose-Hulman
 *  Hacker Authentication Talk given in Spring 2016 
 */

function isLoggedIn() {
    // In practice this would look for an auth token to be used in the header
    // Because we have no backend, we are just going to use the email
    return !!localStorage.getItem('email');//Double ! changes it to a boolean
};

function setToken(type, token) {
    localStorage.setItem(type, token);
};

function getToken(tokenName) {
    return localStorage.getItem(tokenName);
}

function removeToken(type){
    localStorage.removeItem(type);
}

function loadLogin() {

};

function logoutStorage() {
    localStorage.removeItem('email');
};