import React from 'react';
import PropTypes from 'prop-types';
import Login from "../containers/Login.container";
import {Link} from "react-router";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinkForm: false,
      linkAddress: ''
    }
  }

  static PropTypes = {
    token: PropTypes.string.isRequired,
    showLoginPage: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      showLoginPage: PropTypes.func.isRequired,
      hideLoginPage: PropTypes.func.isRequired,
      changeValidationCode: PropTypes.func.isRequired,
      enterPhoneNumber: PropTypes.func.isRequired,
      addLink: PropTypes.func.isRequired,
    })
  };

  enterLinkClickHandler = () => this.setState({showLinkForm: true});

  clickLoginHandler = (e) => {
    this.props.actions.showLoginPage();
  };

  changeLinkAddress = (e) => this.setState({linkAddress: e.target.value});

  submitForm = () => {
    this.setState({showLinkForm: false});
    this.props.actions.addLink(this.state.linkAddress)
  };

  logoutClickHandler = () => localStorage.clear();

  render() {
    const {showLoginPage} = this.props;
    const user = localStorage.getItem('user');

    return (
      <div className="container">
        {!user &&
        <h5 onClick={this.clickLoginHandler} className="mt-lg-4" style={{cursor: "pointer"}}> Press to login </h5>
        }
        {showLoginPage ?
          <Login/> :
          <div className="mt-lg-4">
            <div className="row">
              <div className="col-lg-2 text-left">
                <button className="btn btn-primary" onClick={this.enterLinkClickHandler}> enter Link</button>
              </div>
              <div className="col-lg-2 text-right"><Link to='/user-links'> verify my links </Link></div>
              <div className="col-lg-2 text-right"><a href='#' onClick={this.logoutClickHandler}> Logout </a></div>
            </div>
          </div>
        }
        {
          this.state.showLinkForm &&
          <form onSubmit={this.submitForm}>
            <input type="text" className="form-control col-md-8 mt-lg-4" placeholder="http://www.example.com"
                   onChange={this.changeLinkAddress}/>
            <button type="submit" className="btn btn-success mt-3"> Save</button>
          </form>
        }
      </div>
    )
  }
}

export default MainPage;