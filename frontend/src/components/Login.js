import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

class Login extends React.Component {
  static propTypes = {
    showLoginPage: PropTypes.bool,
    validationCodeInput: PropTypes.bool,
    errors: PropTypes.object,
    actions: PropTypes.shape({
      showLoginPage: PropTypes.func.isRequired,
      hideLoginPage: PropTypes.func.isRequired,
      enterPhoneNumber: PropTypes.func.isRequired,
      tokenVerification: PropTypes.func.isRequired,
      changeValidationCode: PropTypes.func.isRequired
    })
  };

  state = {
    phoneNumber: ''
  };

  closeWindow = () => {
    this.props.actions.hideLoginPage();
  };

  changeNumber = (e) => {
    this.setState({phoneNumber: e.target.value})
  };

  login = () => {
    if (!this.props.validationCodeInput) {
      this.props.actions.enterPhoneNumber(this.state.phoneNumber)
    } else {
      this.props.actions.tokenVerification(this.state.phoneNumber)
    }
  };

  checkValidCode = (e) => {
    this.props.actions.changeValidationCode(e.target.value);
  };

  renderButtonBlock=()=>(
    <div className="login-button">
      <button className="btn add-to-cart" onClick={this.login}>
        { !this.props.validationCodeInput ? "Send" :
          "Enter"
        }</button>
    </div>
  );

  renderInputBlock=()=>(
    <div className="row">
      <div className="col-lg-12">
        {!this.props.validationCodeInput ?
          <span className="title">Enter phone number</span> :
          <span className="title">Enter code from sms</span>}
      </div>
      <div className="col-8 p-0">
        {!this.props.validationCodeInput ?
          <div className="login-phone-block">
            <InputMask {...this.props} mask="0(999)\ 99 99 99" maskChar=" " onChange={this.changeNumber}
            placeholder={"Enter phone number"}/>
          </div>
          :
          <div className="login-phone-block">
            <input type="text" className="form-control" onChange={this.checkValidCode} value={this.props.code}
                   placeholder="Enter code"/>
            <span className="valid-code-error">{this.props.errors.validationCodeError}</span>
          </div>
        }
      </div>
    </div>
  );

  render() {
    if (!this.props.showLoginPage) return false;
    return (
      <div className="fade dark-modal basket-show-modal show" id="basket-show-modal" tabIndex="-1" role="dialog"
           aria-labelledby="basket-show-modal" aria-hidden="true">
        <div className="login-modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Auth</h5>
              <button type="button" className="close modal-close" data-dismiss="modal" aria-label="Close"
                      onClick={this.closeWindow}>
              </button>
            </div>
            <div className="modal-body">
              {this.renderInputBlock()}
              {this.renderButtonBlock()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;