export default function apiCaller(method, route, data = null) {
  return fetch(process.env.REACT_APP_API_URL + route, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  }).then((res) => res.json());
}
