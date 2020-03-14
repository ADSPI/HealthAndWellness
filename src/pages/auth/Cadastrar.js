import React, {Component} from 'react';
import firebase from './../../config/fireConnection';

export default class Cadastrar extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
    };

    this.cadastrar = this.cadastrar.bind(this);

  }

    cadastrar(e){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .catch((error) => {
        if(error.code === "auth/invalid-email"){
          alert('Email invalido');
        }
      })
        e.preventDefault();
    }      
  
  render(){
    return(
      <div>
        <form onSubmit={this.cadastrar}>
            <h1>Cadastro de usuário</h1>
            <label>Email:</label>
            <br/>
            <input type="text" value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})} />
           <br/>
           <label>Senha:</label>
           <br/>
           <input type="text" value={this.state.senha}
           onChange={(e) => this.setState({senha: e.target.value})} />
           <br/>
           <button type="submit">Cadastrar</button>
        </form>
      </div>
    )
  }
}