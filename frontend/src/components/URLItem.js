import React from 'react';
import PropTypes from 'prop-types';

const axios = require('axios');

class URLItem extends React.Component {
  constructor(props) {
    super(props);
    this.checkIfUrlExist = this.checkIfUrlExist.bind(this);
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  state = {statusCode: null, spinner: true};

  checkIfUrlExist = () => {
    const url = this.props.item.href;
    const token = localStorage.getItem('token');

    axios.get(`${'https://cors-anywhere.herokuapp.com/'}${url}`, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'application/json',
        'Authorization': token
      },
    })
      .then((response) => {
        this.stopSpinner();
        this.setState({statusCode: response.status});
      }).catch(() => {
        this.stopSpinner();
    })
  };

  stopSpinner = () => {
    this.setState({spinner: false})
  };

  componentDidMount() {
    this.checkIfUrlExist();
  }

  render() {
    const color = this.state.statusCode ? 'lightgreen' : 'red';

    return (
      <div className="row mt-lg-4">
        <div className="col-lg-8" style={{backgroundColor: color }}>
          <h1>{this.props.item.href}</h1>
          <div>{this.state.spinner && <span className="text-right"> wait loading...</span>}</div>
          <div>{!this.state.spinner && color === 'red' && <span className="text-right"> Url not exists</span>}</div>
          <div/>
        </div>
      </div>
    );
  }
}

export default URLItem;