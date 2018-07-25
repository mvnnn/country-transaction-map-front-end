import fetch from "isomorphic-fetch";

class ProjectApi {
  static getAllCountries() {
    return fetch("http://localhost:4000/country")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static getAllIpTransactionDetails(country_code, activePage) {
    return fetch(
      `http://localhost:4000/transaction/${country_code}/${activePage}`
    )
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static getAllCountriesTransactionDetails(country_code) {
    return fetch(`http://localhost:4000/countrytransaction/${country_code}`)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}

export default ProjectApi;
