export default function fetchCountries(baseUrl, query, onData) {
  return fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    .then(resolve => resolve.json())
    .then(data => {
      onData(data);
    })
    .catch(error => {
      console.error(error);
    });
}
