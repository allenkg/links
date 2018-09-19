import React from 'react';
import PropTypes from 'prop-types';
import URLItem from "./URLItem";
import {Link} from "react-router";

class UserLinks extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      fetchData: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    this.props.actions.fetchData();
  }

  renderEmptyData = () => {
    const user = localStorage.getItem('user');
    if (user === 'null') {
      return (
        <div>Please <Link to='/'>register or login</Link> first</div>
      )
    } else {
      return (<div>You don't have links, Please <Link to='/'>add</Link> link</div>)
    }
  };

  render() {

    if (this.props.isLoading) {
      return (<div>...Loading</div>)
    }

    return (
      <div className="container">
        { this.props.data.length > 0 ?
          this.props.data.map((item, index) =>
            <URLItem key={index} item={item} isLoading={this.props.isLoading}/>
          ) :
          <div>
            {this.renderEmptyData()}
          </div>
        }
      </div>
    );
  }
}

export default UserLinks;