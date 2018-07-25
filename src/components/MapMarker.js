import React, { Component } from "react";

let Updated_countryTransactions = [],
  Updated_Selected_country = null;
var no_of_country_transaction = new Map();
class MapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_code: this.props.countryCode,
      selected_country_code: this.props.selectedCountryCode,
      country_transactions: this.props.countryTransactions
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.country_transactions !== nextProps.countryTransactions &&
      Updated_countryTransactions !== nextProps.countryTransactions
    ) {
      Updated_countryTransactions = nextProps.countryTransactions;
      no_of_country_transaction.clear();
      Updated_countryTransactions.map(data =>
        no_of_country_transaction.set(data.country_dest, data.total_transaction)
      );
    }

    if (
      this.state.selected_country_code !== nextProps.selectedCountryCode &&
      Updated_Selected_country !== nextProps.selectedCountryCode
    ) {
      this.setState({
        selected_country_code: nextProps.selectedCountryCode
      });
    }
  }

  render() {
    let Color = "#00b386",
      width = "30px",
      height = "20px",
      borderRadius = "10px";

    if (this.state.selected_country_code === this.state.country_code) {
      Color = "red";
      width = "45px";
      borderRadius = "40px";
    }
    if (no_of_country_transaction.has(this.state.country_code)) {
      if (no_of_country_transaction.get(this.state.country_code) < 10) {
        Color = "#ff9900";
      } else if (no_of_country_transaction.get(this.state.country_code) < 20) {
        Color = "#4286f4";
      } else if (no_of_country_transaction.get(this.state.country_code) < 30) {
        Color = "#ff0066";
      } else if (no_of_country_transaction.get(this.state.country_code) < 40) {
        Color = "#9900ff";
      } else {
        Color = "#00cc00";
      }
    }

    const shield = {
      width: `${width}`,
      height: `${height}`,
      backgroundColor: `${Color}`,
      position: "relative",
      MozBorderRadius: "10px",
      WebkitBorderRadius: "10px",
      borderRadius: `${borderRadius}`
    };
    const country = {
      textAlign: "center"
    };
    return (
      <div style={shield}>
        <div style={country}>{this.state.country_code}</div>
      </div>
    );
  }
}

export default MapMarker;
