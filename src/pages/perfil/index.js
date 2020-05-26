import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Validador from './../../services/util/validador';
import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import Loading from '../loading';
import {Link} from 'react-router-dom';

export default function Perfil() {

  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(null);
  const [stateEdit, setStateEdit] = useState(true);
  const [senha, setSenha] = useState();
  const [senhaConfirma, setSenhaConfirma] = useState();

  const [confirmaSenha, setConfirmaSenha] = useState(true);

  useEffect(() => {
    console.log("Iniciando");
  });

  const onSubmit = data => {

  };

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

  return (
    <div>
      <Container>
        {loading? 
        <Loading/> :
        <div>
          <br/>
          <center><h2>Seu perfil de usuário</h2></center><br/><br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-md-center">
              <Col lg={5} md={10}><br/>
                <Form.Label className="required">Nome completo</Form.Label>
                <Form.Control 
                  type="text" 
                  name="nome"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  placeholder="Insira aqui seu nome completo"
                  disabled={stateEdit}
                />
              {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
              {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
              <Col lg={5} md={10}><br/>
                <Form.Label>Telefone</Form.Label><br/>
                <Form.Control
                  type="text"
                  name="telefone"
                  maxLength="11"
                  ref={register({maxLength: 11})}
                  placeholder="Insira aqui seu telefone (apenas números)"
                  onKeyUp={(e) => Validador.formatNumber(e)}
                  disabled={stateEdit}
                />
                {errors.telefone && errors.telefone.type === "maxLength" && <span className="alertField">O tamanho máximo é de 11 números</span> }
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={5} md={10}><br/>
                <Form.Label>Data nascimento</Form.Label><br/>
                <Calendar
                  onChange={(e) => convertDate(e.target.value)}
                  monthNavigator={true}
                  yearNavigator={true}
                  yearRange="1900:2020"
                  placeholder="dd/mm/aaaa"
                  dateFormat="dd/mm/yy"
                  disabled={stateEdit}
                />
              </Col>
              <Col lg={5} md={10}><br/>
                <Form.Label  className="required">Email</Form.Label>
                <Form.Control 
                  type="email"
                  name="email"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  placeholder="Insira aqui seu email"
                  disabled={stateEdit}
                />
              {errors.email && errors.email.type === "required" && <span className="alertField">Campo email é obrigatório</span>}
              {errors.email && errors.email.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
            </Row>
            {stateEdit ?
            <Row>
              <Col className="justify-content-md-center">
                <br/><br/><br/>
                <center>
                  <Button label="Editar" onClick={() => setStateEdit(false)} className="p-button-danger"/>
                </center><br/>
                <center>
                  <Link to="/resetSenha">Mudar senha?</Link>
                </center>

              </Col>
            </Row> :
            <Row lg={6} className="justify-content-md-center">
              <Col>
                <br/><br/><br/>
                <center>
                  <Button label="Cancelar" onClick={() => setStateEdit(true)} className="p-button-secondary" />
                </center>
              </Col>
              <Col>
                <br/><br/><br/>
                <center>
                  <Button label="Atualizar" className="p-button-danger" type="submit"/>
                </center>
              </Col>
            </Row>
            }
          </form>
          <br/><br/><br/>
        </div>  
      }
      </Container>
    </div>
  );
}