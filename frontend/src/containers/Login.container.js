import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as AccessActions from "../actions/access";
import Login from "../components/Login";

function mapStateToProps(state) {
  return {
    ...state.accessReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccessActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)