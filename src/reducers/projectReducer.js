import * as types from "../actions/actionTypes";
import initialState from "./initialState";
// import {browserHistory} from 'react-router';

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_COUNTRIES_SUCCESS:
      return {
        countries: action.countries,
        ipTransition: state.ipTransition,
        no_of_transaction: state.no_of_transaction,
        countryTransaction: state.countryTransaction
      };

    case types.GET_IP_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        countries: state.countries,
        ipTransition: action.transaction,
        no_of_transaction: action.no_of_transaction,
        countryTransaction: []
      });

    case types.GET_COUNTRY_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        countries: state.countries,
        ipTransition: [],
        no_of_transaction: 1,
        countryTransaction: action.countryTransaction
      });

    default:
      return state;
  }
}
