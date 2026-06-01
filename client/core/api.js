const API = "http://localhost:5000/api";

async function post(url, data, token){
  return fetch(API + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(data)
  }).then(r => r.json());
}

async function get(url){
  return fetch(API + url).then(r => r.json());
}