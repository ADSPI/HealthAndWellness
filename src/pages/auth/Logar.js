import React, {Component} from 'react';
import firebase from './../../config/fireConnection';
import {Link, withRouter} from 'react-router-dom';

class Logar extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.entrar = this.entrar.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      if(resultado){
        return this.props.history.replace('/');
      }
      // Devolve o usuario
    })
  }

  entrar(e){
    e.preventDefault();

    this.login();
  }

  login = async () => {
    const {email, password} = this.state;

      await firebase.login(email, password)
      .catch((error)=>{
        if(error.code === 'auth/user-not-found'){
          alert('Este usuario não existe!');
        }else{
          alert('Codigo de erro:' + error.code);
          return null;
        }
      });

    document.location.assign('/');
  }

  render(){
    return(
      <div>
        <h2>Login do usuário</h2>
        <form onSubmit={this.entrar} id="login">
          <label>Email:</label><br/>
          <input type="email" autoComplete="off" autoFocus value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})} placeholder="Insira seu email"/>
          <br/>
          <label>Password:</label><br/>
          <input type="password" autoComplete="off" value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})} placeholder="Insira sua senha"
          /><br/>

          <button type="submit">Entrar</button>
          <br/>
          <Link to="/cadastro">Ainda não possui uma conta?</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Logar);