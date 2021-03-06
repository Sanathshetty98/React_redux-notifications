import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Notifications, { success, error, warning, info, removeAll } from 'react-notification-system-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
const notificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Hey, it\'s good to see you!',
  message: 'Now you can see how easy it is to use notifications in React!',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'Click me!!',
    callback: () => alert('clicked!')
  }
};

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }

  dispatchNotification(fn, timeout) {
    setTimeout(() => {
      fn(notificationOpts);
    }, timeout);
  }

  handleClick() {
    const { success, error, warning, info, removeAll } = this.props;
    this.dispatchNotification(success, 250);
    this.dispatchNotification(error, 500);
    this.dispatchNotification(warning, 750);
    this.dispatchNotification(info, 1000);
  }

  handleRemoveAll() {
    this.props.removeAll();
  }

  render() {
    const {notifications} = this.props;

    return (
      <div>
        <hr />
        <button className="btn btn-primary" onClick={this.handleClick}>Spawn some notifications!!!</button>
        <hr />
        <button  className="btn btn-secondary" onClick={this.handleRemoveAll}>Remove all notifications</button>
        <hr />
        <Notifications notifications={notifications} />
      </div>
    );
  }
}

Container.propTypes = {
  error: PropTypes.func.isRequired,
  info: PropTypes.func.isRequired,
  notifications: PropTypes.array,
  removeAll: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired,
  warning: PropTypes.func.isRequired
};

export default connect(
  state => ({ notifications: state.notifications }),
  {
    success, error, warning, info, removeAll
  }
)(Container);
