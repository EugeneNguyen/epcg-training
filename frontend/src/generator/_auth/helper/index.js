let _auth = {};
let _listeners = [];
const TOKEN_KEY = "@nexus_resource/auth/token";

const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  _listeners.map(l => l());
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete _auth.token;
  _listeners.map(l => l());
}

const loadToken = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    _auth.token = token;
  }
  catch (error) {
    _auth.token = null;
  }
}

const token = () => {
  if (!_auth.token) {
    loadToken();
  }

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

export default {
  saveToken,
  removeToken,
  loadToken,
  isLoggedIn,
  token,
  addListener,
};
