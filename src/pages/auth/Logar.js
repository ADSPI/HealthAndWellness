import React, {Component} from 'react';
import firebase from './../../config/fireConnection';
import {Link, withRouter} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import logo from './../../img/logo.png';

import './Logar.css';
import './../../css/css_general.css';

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
          <br/>
          <Row className="justify-content-md-center">
          <Col lg={4} md={12}>
                <center><h2>Login</h2></center>
                <center>
                  <br/><br/>
                  <form onSubmit={this.entrar} id="login">
                    <table>
                      <thead>
                      <tr>
                        <th>
                          <label>Email</label><br/>
                          <InputText type="email" size="40" autoComplete="off" value={this.state.email} 
                          onChange={(e) => this.setState({email: e.target.value})} placeholder="Insira aqui seu email"/>
                        </th>
                      </tr>
                      <tr>
                        <th>
                        <label>Senha</label> <br/>
                          <InputText type="password" size="40" autoComplete="off" value={this.state.password}
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
                      </thead>
                    </table>
                  </form>
                </center>
            </Col>

            <Col lg={8} md={12}>
              <center>
                <h2>Nosso propósito</h2>
                <br/>
              </center>
              <p>O <b>Health and Wellness</b> é um sistema de controle de prontuário pessoal,
                no qual busca dar a oportunidade de carregar consigo mesmo todo seu histórico 
                de consulta e exame, trazendo a comodidade e liberdade de migrar de hospitais/médicos
                levando todos seus antecedentes de saúde.
              </p>
              <center>
                <img src={logo} alt="Logo da Health and Wellness" style={{width:'70%'}}/>
              </center>
              <p>Crie seu <Link to="/cadastro">cadastro</Link> e experimente a independência do seu prontuário na palma da sua mão.</p>
              <br/><br/>
            </Col>
            <br/>
          </Row>
          </section>
          
          </Container>        
      </div>
    );
  }
}

export default withRouter(Logar);