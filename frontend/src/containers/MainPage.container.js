import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as MainPageActions from '../actions/main-page';
import * as LoginActions from '../actions/access';
import MainPage from '../components/MainPage';


function mapStateToProps(state) {
    return {
      ...state.mainPage,
      ...state.accessReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
          ...MainPageActions,
          ...LoginActions
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)