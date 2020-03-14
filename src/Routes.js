import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Cadastrar from './pages/auth/Cadastrar';
import Logar from './pages/auth/Logar';
import Home from './pages/home';
import {firebaseAuth} from './config/fireConnection';


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}


export default class Routes extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Router>
        <Switch>
          <Route exact path="/cadastro" component={Cadastrar} />
          <Route exact path="/login" component={Logar} />
          <PrivateRoute exact authed={this.state.authed} path="/" component={Home} />
        </Switch>
    </Router>
    );
  }
}