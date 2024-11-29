export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.lastsprint.crabdance.com"
    : "http://localhost:3001";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function processServerRequest(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(processServerRequest);
}

function postItem(data, token) {
  console.log(data);
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      weather: data.type,
      imageUrl: data.link,
    }),
  }).then(processServerRequest);
}

function deleteItem(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerRequest);
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerRequest);
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerRequest);
}

export {
  getItems,
  postItem,
  deleteItem,
  processServerRequest,
  addCardLike,
  removeCardLike,
};
