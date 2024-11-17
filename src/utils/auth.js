import { baseUrl, headers, processServerRequest } from "./api";

const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(processServerRequest);
};

const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(processServerRequest);
};

const getUser = (token) => {
  headers.authorization = `Bearer ${token}`;
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: headers,
  }).then(processServerRequest);
};

const editProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerRequest);
};

export { register, login, getUser, editProfile };
