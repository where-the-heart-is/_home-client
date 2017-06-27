function parseQueryString(queryString) {
    queryString = queryString.split('=')
    return queryString[1];
}

function parseJSON (response) {
  return response.json();
}

function throwError() {
  return new Error("Error")
}
