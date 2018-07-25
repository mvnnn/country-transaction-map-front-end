import React from "react";
import App from "./components/App";
import "babel-polyfill";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { browserHistory } from "react-router";
import { HashRouter as Router, Route } from "react-router-dom";
import { loadCountries } from "./actions/projectActions";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

// loads all country data when front server starts
store.dispatch(loadCountries());

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <Route path="/" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
