import React, {Component} from 'react';
import firebase from './../../config/fireConnection';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {Password} from 'primereact/password';

import './../../css/css_general.css';

export default class Cadastrar extends Component{
  constructor(props){
    super(props);
    this.state = {
      nome: '',
      dataNascimento: '',
      telefone: '',
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
      <div className="telaFull">
      <div>
        <Container>
          <br/>
          <Row className="justify-content-md-center">
            <center><h2>Criar uma nova conta</h2></center><br/><br/>
          </Row>
          <form onSubmit={this.insereUser}>
          <Row className="justify-content-xs-center">
              
              <Col lg={4} md={12}>
                <br/>
                <label>Nome</label> <br/>
                <InputText type="text" size="45" autoComplete="off" value={this.state.nome} 
                onChange={(e) => this.setState({nome: e.target.value})} placeholder="Insira aqui seu nome"/>
                <br/><br/>
                <label>Data nascimento</label><br/>
                <Calendar value={this.state.dataNascimento} onChange={(e) => this.setState({dataNascimento: e.value})}
                monthNavigator={true} yearNavigator={true} yearRange="2010:2030" placeholder="Data de nascimento"/>   
              </Col>
              <Col lg={4} md={12}>
                <br/>
                <label>Telefone</label> <br/>
                <InputText type="text" size="45" autoComplete="off" value={this.state.telefone} 
                onChange={(e) => this.setState({telefone: e.target.telefone})} placeholder="Insira aqui seu telefone"/>
                <br/><br/>
                <label>Email</label> <br/>
                <InputText type="email" size="45" autoComplete="off" value={this.state.email} 
                onChange={(e) => this.setState({email: e.target.value})} placeholder="Insira aqui seu email"/>
              </Col>
              <Col>
                <br/>
                <label>Senha</label> <br/>
                <Password value={this.state.password} size="45" autoComplete="off" promptLabel="Insira sua senha" weakLabel="Senha fraca" mediumLabel="Senha média" strongLabel="Senha forte"
                onChange={(e) => this.setState({password: e.target.value})} placeholder="Insira aqui sua senha" />
                <br/><br/>
                <label>Confirmação de senha</label> <br/>
                <Password value={this.state.password} size="45" autoComplete="off" promptLabel="Confirme sua senha" weakLabel="Senha fraca" mediumLabel="Senha média" strongLabel="Senha forte"
                onChange={(e) => this.setState({password: e.target.value})} placeholder="Insira aqui sua senha" />
              </Col>              
          </Row>
          <Row>
            <Col className="justify-content-md-center">
              <br/><br/><br/>
              <center>
                <Button label="Cadastrar-se" size="45" type="submit"/>
              </center>
            </Col>
          </Row>
          </form>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </Container>
      </div>
      </div>
    )
  }
}