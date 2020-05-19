import React, {Component} from 'react';
import firebase from './../../config/fireConnection';


export default class Cadastrar extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
    };

    this.insereUser = this.insereUser.bind(this);

  }

  insereUser = async (e) => {
    firebase.cadastrar(this.state.email, this.state.senha)
    .then(retorno => {
      alert("Parabéns, você foi cadastrado com sucesso!");
      document.location.assign('/');
    })
    .catch((error) => {
      
        if(error.code === "auth/invalid-email"){
          alert('Email em formato inválido.');
        } else {
          if(error.code === "auth/weak-password"){
          alert("Senha fraca, tamanho mínimo de 6 caracteres.");
          } else {
            alert("Código de erro: " + error.code)
          }
        }
    })
    this.setState({email: ''});
    this.setState({senha: ''});
    e.preventDefault();
  };
  
  render(){
    return(
      <div>
        <h2>Cadastro de usuário</h2>
        <form onSubmit={this.insereUser}>
          <label>Email:</label>
          <br/>
          <input type="text" value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})} placeholder="Seu email"/>
          <br/>
          <label>Senha:</label>
          <br/>
          <input type="password" autoComplete="off" value={this.state.senha}
           onChange={(e) => this.setState({senha: e.target.value})} placeholder="Sua senha"/>
          <br/>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    )
  }
}