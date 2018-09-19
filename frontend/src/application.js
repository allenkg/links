import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";
import configureStore from "./store";
import Root from "./containers/Root";

export default class Application {
  static createApplication() {
    return new Application();
  }

  init() {
    this.createStore();
    this.createHistory();
    this.enableHotReload();
  }

  start() {
    this.renderComponent(Root)
  }

  createStore() {
    this.store = configureStore();
  }

  createHistory() {
    this.history = syncHistoryWithStore(browserHistory, this.store)
  }

  renderComponent(Component) {
    ReactDOM.render((
      <AppContainer>
        <Component store={this.store} history={this.history}/>
      </AppContainer>
    ), document.getElementById('root'))
  }

  enableHotReload() {
    if (module.hot) {
      module.hot.accept('./containers/Root', () => {
        this.renderComponent(Root);
      });
    }
  }
}