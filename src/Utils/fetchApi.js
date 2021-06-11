const FetchAPI = ({ route, method, body, token }) => {
  const baseURL = "https://technotes-api.herokuapp.com/api/v1";
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["X-Jwt-Token"] = `Bearer ${token}`;
    }
    fetch(baseURL + route, {
      // mode: "no-cors",
      method,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((parseRes) => resolve(parseRes))
      .catch((err) => {
        resolve({ error: "Opps! Something went wrong" });
      });
  });
};

export default FetchAPI;
