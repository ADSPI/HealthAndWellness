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
  const [atualPassword, setAtualPassword] = useState();

  const [confirmaSenha, setConfirmaSenha] = useState(true);

  const setPassword = (e) => {
    if(e.target.name === "senhaAtual"){
        setAtualPassword(e.target.value);
        if((senhaConfirma === senha) && senha.length >= 6){
            setConfirmaSenha(false);
        }
    } else{
        if(e.target.name === "senha") {
            setSenha(e.target.value);
            if(e.target.value.length >= 6 && e.target.value === senhaConfirma && atualPassword !== "" && atualPassword !== null && atualPassword !== undefined){
              setConfirmaSenha(false);
            } else {
              setConfirmaSenha(true);
            }
          } else {
            if(e.target.name === "senhaConfirma" ){
              setSenhaConfirma(e.target.value);
              if(e.target.value.length >= 6 && e.target.value === senha && atualPassword !== "" && atualPassword !== null && atualPassword !== undefined){
                setConfirmaSenha(false);
              } else {
                setConfirmaSenha(true);
              }
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
    let user = firebase.updatePassWord(atualPassword, senha);

    //string newPassword = "SOME-SECURE-PASSWORD";
    /*if (user != null) {
        user.updatePassword(senha).then(() => {
            console.log("Senha atualizada");
            // Update successful.
          }, (error) => {
              console.log("Senha fracassada");
            // An error happened.
          });*/
        /*user.UpdatePasswordAsync(senha).ContinueWith(task => {
        if (task.IsCanceled) {
            console.log("UpdatePasswordAsync was canceled.");
            return;
        }
        if (task.IsFaulted) {
            console.log("UpdatePasswordAsync encountered an error: " + task.Exception);
        return;
        }
        console.log("Senha alterada com sucesso");
    });*/
    //}
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
                    onChange={(e) => setPassword(e)}
                    onChange={(e) => setAtualPassword(e.target.value)}
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