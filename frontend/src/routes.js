import React from 'react';
import App from "./containers/App";
import Layout from "./containers/Layout";
import MainPage from "./containers/MainPage.container";
import UserLinks from "./containers/UserLinks.container";
import { IndexRoute, Route } from "react-router";


export default (
  <Route component={App}>
    <Route path="/" component={Layout}>
      <IndexRoute component={MainPage}/>
      <Route path='user-links' component={UserLinks}/>
    </Route>
  </Route>
)