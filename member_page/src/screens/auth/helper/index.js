import {useEffect, useState} from "react";

let _auth = {};
let _listeners = [];
const TOKEN_KEY = "@nexus_resource/auth/token";

const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  _auth.token = token;
  _listeners.map(l => l());
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete _auth.token;
  _listeners.map(l => l());
}

const loadToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  _auth.token = token;
  _listeners.map(l => l());
}

const token = () => {
  return _auth.token;
}

const isLoggedIn = () => {
  return token() !== null;
}

const addListener = (listener) => {
  _listeners.push(listener);
  return () => {
    _listeners = _listeners.filter(l => l !== listener);
  }
}

const useToken = () => {
  const [_token, _setToken] = useState(false);
  useEffect(() => {
    const unsub = addListener(() => _setToken(token()));
    loadToken();
    return unsub;
  });
  return _token;
}

const AuthHelper = {
  saveToken,
  removeToken,
  loadToken,
  isLoggedIn,
  token,
  addListener,
  useToken
};

export default AuthHelper;
