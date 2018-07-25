import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Modal,
  Table,
  Pagination
} from "react-bootstrap";

import * as actions from "../actions/projectActions";
import MapMarker from "./MapMarker";

import ReactMapboxGl, { Marker } from "react-mapbox-gl";

//Set mapbox token dependency
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYmhhdXRpayIsImEiOiJjajZ0MmpmYnEwOWpkMzJzNnBqcWdsbGduIn0.XXsMQFwF2fAlDNwrG3qKLg"
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      activePage: 1,
      selected_country: null,
      selected_country_code: null
    };
  }

  // Close ip transaction modal events
  closeIpTransactionModal(e) {
    this.props.actions.countryTransactionDetails(
      this.state.selected_country_code
    );
    this.setState({ showModal: false });
  }

  // Called when change Page Number events of PaginationBar
  changePageNo(eventKey) {
    console.log(eventKey);
    this.props.actions
      .ipTransactionDetails(this.state.selected_country_code, eventKey)
      .then(() =>
        this.setState({
          activePage: eventKey
        })
      );
  }

  //Called when Country ip transaction details events
  countryTransactionDetail(e, country_code, selected_country) {
    this.props.actions.ipTransactionDetails(country_code, 1);
    this.setState({
      selected_country_code: country_code,
      selected_country: selected_country,
      showModal: true,
      activePage: 1
    });
  }

  render() {
    const {
      countries,
      ipTransition,
      no_of_transaction,
      countryTransaction
    } = this.props.countries;

    const modalStyle = {
      overflowY: "auto",
      overflowX: "auto"
    };
    const paginationBar = {
      paddingBottom: "2%",
      paddingLeft: "20%"
    };
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
      >
        {countries ? (
          countries
            .map(c => ({
              ...c,
              latitude: parseFloat(c.latitude) % 90,
              longitude: c.longitude
            }))
            .map((country, i) => {
              return (
                <Marker
                  key={country.country_name}
                  coordinates={[country.longitude, country.latitude]}
                  anchor="bottom"
                  onClick={e =>
                    this.countryTransactionDetail(
                      e,
                      country.country_code,
                      country.country_name
                    )}
                >
                  <MapMarker
                    countryCode={country.country_code}
                    countryTransactions={countryTransaction}
                    selectedCountryCode={this.state.selected_country_code}
                  />
                  <Modal
                    bsSize="large"
                    aria-labelledby="contained-modal-title-lg"
                    show={this.state.showModal}
                    onHide={e => this.closeIpTransactionModal(e)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {this.state.selected_country} Transaction
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={modalStyle}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>IP​ SRC</th>
                            <th>IP​ ​DST</th>
                            <th>COUNTRY​ DST</th>
                            <th>TOTAL​ ​INTERACTIONS</th>
                            <th>LAST​ ​INTERACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ipTransition.length > 0 ? (
                            ipTransition.map((row, i) => (
                              <tr>
                                <td>{(this.state.activePage - 1) * 10 + i}</td>
                                <td>{row.ip_src}</td>
                                <td>{row.ip_dst}</td>
                                <td>{row.country_dest}</td>
                                <td>{row.totalInteraction}</td>
                                <td>{row.timestamp}</td>
                              </tr>
                            ))
                          ) : null}
                        </tbody>
                      </Table>
                    </Modal.Body>
                    <Modal.Footer>
                      <div style={paginationBar}>
                        <Pagination
                          prev
                          next
                          first
                          last
                          ellipsis
                          boundaryLinks
                          items={no_of_transaction}
                          maxButtons={5}
                          activePage={this.state.activePage}
                          onSelect={e => this.changePageNo(e)}
                        />
                      </div>
                      <Button onClick={e => this.closeIpTransactionModal(e)}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Marker>
              );
            })
        ) : null}
      </Map>
    );
  }
}

// How you get the stuff to display
function mapStateToProps(state) {
  return {
    countries: state.countries,
    ipTransition: state.ipTransition,
    no_of_transaction: state.no_of_transaction,
    countryTransaction: state.countryTransaction
  };
}

// How you handle events
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
