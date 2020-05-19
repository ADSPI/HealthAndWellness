import React, {Component} from 'react';
import firebase from './../../config/fireConnection';

/*import Header from './../header';
import Topbar from './../menu/Topbar';*/

export default class Home extends Component{
	constructor(props){
    super(props);
    this.state = {
      nome: localStorage.nome
    };
        this.logout = this.logout.bind(this);
  }

   /*async componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/logar');
      return null;
    }

    firebase.getUserName((info)=>{
      localStorage.nome = info.val().nome;
      this.setState({nome: localStorage.nome });
    })

  }*/

  logout = async () => {
    await firebase.logout()
    .catch((error)=>{
      console.log(error);
    });
    localStorage.removeItem("nome");
    
    document.location.assign('/');
  }

  render(){
    return(
      <div>
          olá mundo
          <button onClick={()=> this.logout()}>Deslogar</button>
      </div>
    )
  }
}