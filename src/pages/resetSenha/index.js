import React, { useState } from 'react';
import useForm from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {Password} from 'primereact/password';
import Loading from '../loading';
import firebase from './../../config/fireConnection';
import Validador from './../../services/util/validador';
import {Link, withRouter} from 'react-router-dom';

import './../../css/css_general.css';

export default function Cadastrar (){
  
  const { register, handleSubmit, errors } = useForm();
  const [ loading, setLoading ] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(null);
  const [senha, setSenha] = useState();
  const [senhaConfirma, setSenhaConfirma] = useState();

  const [confirmaSenha, setConfirmaSenha] = useState(true);

  const setPassword = (e) => {
    if(e.target.name === "senha") {
      setSenha(e.target.value);
      if(e.target.value.length >= 6 && e.target.value === senhaConfirma){
        setConfirmaSenha(false);
      } else {
        setConfirmaSenha(true);
      }
    } else {
      if(e.target.name === "senhaConfirma"){
        setSenhaConfirma(e.target.value);
        if(e.target.value.length >= 6 && e.target.value === senha){
          setConfirmaSenha(false);
        } else {
          setConfirmaSenha(true);
        }
      }
    }
  };

  const convertDate = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    setDataNascimento([day, mnth, date.getFullYear()].join("/"));
  }

  const onSubmit = data => {
    setLoading(true);
    data.dataNascimento = dataNascimento;
    console.log(data);
    firebase.cadastrar(data.email, senha)
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
            alert("Ops, algum erro em seu cadastro: " + error.code)
          }
        }
    })
  }
  return (
    
    <div>
      <Container>
        {loading ?
            <Loading/> :
        <div>
        <br/>
        <center><h2>Alterar senha</h2></center><br/>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-md-center">
            <Col lg={4} md={12}>
              <br/>
              <Form.Label className="required">Senha atual</Form.Label><br/>
                <Password
                    size="40"
                    autoComplete="off"
                    name="senhaAtual"
                    weakLabel="Senha fraca"
                    mediumLabel="Senha média"
                    strongLabel="Senha forte"
                    placeholder="Insira aqui sua atual senha"
                />
            </Col>
            <Col lg={4} md={12}>
                <br/>
                <Form.Label className="required">Nova senha (mínimo de 6 catacteres)</Form.Label><br/>
                <Password
                    size="40"
                    autoComplete="off"
                    onChange={(e) => setPassword(e)}
                    name="senha"
                    weakLabel="Senha fraca"
                    mediumLabel="Senha média"
                    strongLabel="Senha forte"
                    placeholder="Insira aqui sua nova senha"
                />
            </Col>
            <Col lg={4} md={12}>
                <br/>
                <Form.Label  className="required">Confirmação de senha</Form.Label><br/>
                <Password
                    size="40"
                    autoComplete="off"
                    onChange={(e) => setPassword(e)}
                    name="senhaConfirma"
                    weakLabel="Senha fraca"
                    mediumLabel="Senha média"
                    strongLabel="Senha forte"
                    placeholder="Confirme sua nova senha"
                />
                <br/>
                {confirmaSenha?
                    <span className="alertField">As senhas devem coincidir</span> 
                    : null
                }
            </Col>
        </Row>
        <Row lg={6} className="justify-content-md-center">
            <Col>
              <br/><br/><br/>
              <center>
                <Link to="/perfil">
                    <Button label="Cancelar" className="p-button-secondary" />
                </Link>
              </center>
            </Col>
            <Col>
              <br/><br/><br/>
              <center>
                <Button disabled={confirmaSenha} label="Alterar senha" className="p-button-danger" type="submit"/>
              </center>
            </Col>
        </Row>
        </form>
        <br/><br/><br/>
        </div>
        }
        </Container>
      </div>
  )
}