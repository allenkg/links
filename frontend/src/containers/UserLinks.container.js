import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as MainPageActions from '../actions/main-page';
import * as LoginActions from '../actions/access';
import UserLinks from '../components/UserLinks';


function mapStateToProps(state) {
    return {
      ...state.mainPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
          ...MainPageActions
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLinks)