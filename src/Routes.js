import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import firebase from './config/fireConnection';

//PAGES
import Cadastrar from './pages/auth/Cadastrar';
import Logar from './pages/auth/Logar';
import Home from './pages/home';
import ErrorUrl from './pages/error';


class Routes extends Component{

  state = {
    firebaseInitialized: false
  };

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      if(resultado == null) resultado = false;
      
      // Devolve o usuario
      this.setState({firebaseInitialized: resultado});
      //Linha adicionada
      console.log(resultado);
      
    })
  }

  render(){
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/app" component={() => <h1>Logado!</h1>} />
          <Route path="*" component={ErrorUrl}/>
        </Switch>
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <Switch>
          <Route exact path="/cadastro" component={Cadastrar} />
          <Route exact path="/" component={Logar} />
          <Route path="*" component={ErrorUrl}/>
        </Switch>
      </BrowserRouter>
      
    );
  }
}

export default Routes;