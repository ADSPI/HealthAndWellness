import React, {Component} from 'react';
import { Button, Segment, } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './header.css';
import firebase from './../../config/fireConnection';


export default class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: ''
    };
    this.sair = this.sair.bind(this);

  }

  sair(){
    firebase.auth().signOut();
    alert('Deslogado com sucesso!');
  }

  render(){
    
    return(
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          Health and Wellness
        </Link>
          <Button inverted onClick={this.sair}>Sair</Button>       
      </div>
    </header>
  );
}
}
