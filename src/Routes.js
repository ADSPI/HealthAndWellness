import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import firebase from './config/fireConnection';
//FRAGMENT
import MenuBar from './fragment/menuBar';
import Header from './fragment/header';
import HeaderSemLogar from './fragment/header/HeaderSemLogar';
import Footer from './fragment/footer';

//PAGES
import Cadastrar from './pages/auth/Cadastrar';
import Logar from './pages/auth/Logar';
import Home from './pages/home';
import ErrorUrl from './pages/error';
import novaConsulta from './pages/consulta/novaConsulta';
import historicoConsulta from './pages/consulta/historicoConsulta';
import historicoExame from './pages/exame/historicoExame';
import novoExame from './pages/exame/novoExame';
import perfil from './pages/perfil';
import Imc from './pages/imc';
import Loading from './pages/loading';

class Routes extends Component{

  state = {
    firebaseInitialized: null
  };

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      if(resultado == null) resultado = false;
      // Devolve o usuario
      this.setState({firebaseInitialized: resultado});
    })
  }

  render(){
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header/>
        <MenuBar/>
        {this.state.firebaseInitialized == null ?
          <Loading/>
          : 
          <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/novaConsulta" component={novaConsulta}/>
          <Route exact path="/historicoConsulta" component={historicoConsulta}/>
          <Route exact path="/historicoExame" component={historicoExame}/>
          <Route exact path="/novoExame" component={novoExame}/>
          <Route exact path="/imc" component={Imc}/>
          <Route exact path="/perfil" component={perfil}/>
          <Route path="*" component={ErrorUrl}/>
        </Switch>
        }
        
        <Footer/>
      </BrowserRouter>
    ) : (
          <BrowserRouter>
          <HeaderSemLogar/>
          {this.state.firebaseInitialized == null ?
          <Loading/>
          : 
          <Switch>
              <Route exact path="/cadastro" component={Cadastrar} />
              <Route exact path="/" component={Logar} />
              <Route path="*" component={Logar}/>
            </Switch>
          }
          <Footer/>
          </BrowserRouter>
    );
  }
}

export default Routes;

/*class Routes extends Component{

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
        <Header/>
        <MenuBar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/novaConsulta" component={novaConsulta}/>
          <Route exact path="/historicoConsulta" component={historicoConsulta}/>
          <Route exact path="/historicoExame" component={historicoExame}/>
          <Route exact path="/novoExame" component={novoExame}/>
          <Route exact path="/imc" component={Imc}/>
          <Route exact path="/perfil" component={perfil}/>
          <Route path="*" component={ErrorUrl}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    ) : (
          <BrowserRouter>
          <HeaderSemLogar/>
          <Switch>
            <Route exact path="/cadastro" component={Cadastrar} />
            <Route exact path="/" component={Logar} />
            <Route path="*" component={Logar}/>
          </Switch>
          <Footer/>
          </BrowserRouter>
    );
  }
}

export default Routes;*/