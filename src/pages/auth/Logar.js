import React, {Component} from 'react';
import firebase from './../../config/fireConnection';
import {Link, withRouter} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';
import {Dropdown} from 'primereact/dropdown';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import logo from './../../img/logo.png';

import './Logar.css';

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
          if(error.code === 'auth/wrong-password'){
            alert('Ops, senha incorreta, tente novamente.');
          } else {
          alert('Codigo de erro:' + error.code);
          return null;
        }
      }
      });

    document.location.assign('/');
  }

  render(){
    return(
      <div>
        <Container>
          <section>
          <br/><vr/>
          <Row className="justify-content-md-center">
          <Col lg={4} md={12}>
                <center><h2>Login</h2></center>
                <center>
                  <form onSubmit={this.entrar} id="login">
                    <table>
                      <tr>
                        <th>
                          <label>Email</label><br/>
                          <InputText type="email" size="45" autoComplete="off" value={this.state.email} 
                          onChange={(e) => this.setState({email: e.target.value})} placeholder="Insira aqui seu email"/>
                        </th>
                      </tr>
                      <tr>
                        <th>
                        <br/>
                        <label>Senha</label> <br/>
                          <InputText type="password" size="45" autoComplete="off" value={this.state.password}
                          onChange={(e) => this.setState({password: e.target.value})} placeholder="Insira aqui sua senha" />
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <br/>
                            <center>
                              <Button label="Entrar" size="45" type="submit"/>
                            </center>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <center>
                            <Link to="/cadastro">Ainda não possui uma conta?</Link>
                          </center>
                          <br/><br/>
                        </th>
                      </tr>
                    </table>
                  </form>
                </center>
            </Col>

            <Col lg={8} md={12}>
              <center>
                <h2>Nosso propósito</h2>
              </center>
              <p>O <b>Health and Wellness</b> é um sistema de controle de prontuário pessoal,
                no qual busca dar a oportunidade de carregar consigo mesmo todo seu histórico 
                de consulta e exame, trazendo a comodidade e liberdade de migrar de hospitais/médicos
                levando todos seus antecedentes de saúde.
              </p>
              <p>Crie seu cadastro e experimente a independência do seu prontuário na palma da sua mão.</p>
              <center>
                <img src={logo} style={{width:'70%'}}/>
              </center>
              <br/><br/>
            </Col>
            
          </Row>
          </section>
          <br/><br/><br/>
          </Container>        
      </div>
    );
  }
}


  /*render(){
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
}*/

export default withRouter(Logar);