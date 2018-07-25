import * as types from "./actionTypes";
import ProjectApi from "../api/projectApi";

//Called when get country data from server side
export function loadCountriesSuccess(countries) {
  return { type: types.LOAD_COUNTRIES_SUCCESS, countries };
}

//Called when get country ip transaction data from server side
export function getIpTransactionDetailsSuccess(transaction, no_of_transaction) {
  return {
    type: types.GET_IP_TRANSACTION_SUCCESS,
    transaction,
    no_of_transaction
  };
}

//Called when get country to country transaction data from server side
export function getCountryTransactionDetailsSuccess(countryTransaction) {
  console.log(countryTransaction);
  return {
    type: types.GET_COUNTRY_TRANSACTION_SUCCESS,
    countryTransaction
  };
}

//Api GET call to get country data from server side after it's dispatch action
export function loadCountries() {
  return function(dispatch) {
    return ProjectApi.getAllCountries()
      .then(countries => {
        dispatch(loadCountriesSuccess(countries));
      })
      .catch(error => {
        throw error;
      });
  };
}

//Api GET call to get country ip transaction data from server side after it's dispatch action
export function ipTransactionDetails(country_code, activePage) {
  return function(dispatch) {
    return ProjectApi.getAllIpTransactionDetails(country_code, activePage)
      .then(transaction => {
        dispatch(
          getIpTransactionDetailsSuccess(
            transaction.top_10_transaction,
            transaction.no_of_transaction
          )
        );
      })
      .catch(error => {
        throw error;
      });
  };
}

//Api GET call to get country to country transaction data from server side after it's dispatch action
export function countryTransactionDetails(country_code) {
  return function(dispatch) {
    return ProjectApi.getAllCountriesTransactionDetails(country_code)
      .then(transaction => {
        dispatch(getCountryTransactionDetailsSuccess(transaction));
      })
      .catch(error => {
        throw error;
      });
  };
}
