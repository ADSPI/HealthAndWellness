import React, {Component} from 'react';
import firebase from './../../config/fireConnection';

/*import Header from './../header';
import Topbar from './../menu/Topbar';*/

export default class Home extends Component{
	constructor(props){
    super(props);
  }


  render(){
    return(
      <div>
         Seja bem-vindo ao <b>Health and Wellness</b>
      </div>
    )
  }
}