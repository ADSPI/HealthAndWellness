import React, { useState } from 'react';
import useForm from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {RadioButton} from 'primereact/radiobutton';

//SERVICE
import Validador from './../../services/util/validador';
import ServiceConsulta from './../../services/consulta/ServiceConsulta';
import ServiceMedico from './../../services/medico/ServiceMedico';

import './../../css/css_general.css';

export default function NovaConsulta (){
  
  const { register, handleSubmit, errors } = useForm();
  const [medicoCadastrado, setMedicoCadastrado] = useState(true);
  const [idMedico, setIdMedico] = useState("Informe seu CRM");
  const [id_espec, setId_espec] = useState("Informe sua especialidade");

  let medicos = [
    {label: '111111', value: '111111'},
    {label: '222222', value: '222222'},
    {label: '333333', value: '333333'},
    {label: '444444', value: '444444'},
    {label: '555555', value: '555555'},
    {label: '666666', value: '666666'},
    {label: '777777', value: '777777'},
    {label: '888888', value: '888888'},
    {label: '999999', value: '999999'}
  ];

  const onSubmit = data => {
    if(medicoCadastrado === true){
      data.id_medico = idMedico;
      ServiceConsulta.insertConsulta(data);
    }
    if(medicoCadastrado === false){
      data.id_espec = id_espec;
      ServiceMedico.insertMedico(data);
    }
  }

  const setCRMMedico = (e) => {
    console.log(e.value);
    setIdMedico(e.value);
  }

  const setEspecialidadeMedico = (e) => {
    setId_espec(e.value);
  }

  const medicoJaCadastrado = (e) => {
    if(e.value === "sim"){
      setMedicoCadastrado(true);
    } else {
      if(e.value === "nao"){
        setMedicoCadastrado(false);
        setIdMedico("");
      }
    }
  }

  return (
    <div>
      <Container>
          <div>
          <br/>
          <center>
            <h2>Cadastrar nova consulta</h2>
          </center>
          <br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-md-center">
              <Col lg={4} md={12}>
                <br/>
                <Form.Label>CRM do Médico</Form.Label><br/>
                <Dropdown
                  options={medicos}
                  name="id_medico"
                  onChange={setCRMMedico}
                  style={{width: '20em'}}
                  value={idMedico}
                  filter={true}
                  filterPlaceholder="CRM médico"
                  filterBy="label,value"
                  showClear={true}
                  disabled={!medicoCadastrado}
                />
              </Col>
              <Col lg={4} md={12}>
                <br/>
                <Form.Label className="required">Médico já cadastrado?</Form.Label>
                <div className="p-col-12">
                  <RadioButton
                    inputId="sim"
                    name="cadastrado"
                    value="sim"
                    onChange={(e) => medicoJaCadastrado(e)}
                    checked={medicoCadastrado === true}
                  />
                  <label htmlFor="rb1" className="p-radiobutton-label">Sim</label>
                </div>
                <div className="p-col-12">
                  <RadioButton
                    inputId="nao"
                    name="cadastrado"
                    value="nao"
                    onChange={(e) => medicoJaCadastrado(e)} 
                    checked={medicoCadastrado === false}
                  />
                  <label htmlFor="rb2" className="p-radiobutton-label">Não</label>
                </div>
              </Col>
              <Col lg={4} md={12}>
              <br/>
              <Form.Label className="required">Título da consulta</Form.Label>
              <Form.Control type="text" name="titulo" maxLength="50" ref={register({required:true, maxLength: 50})}
               placeholder="Insira aqui o título da consulta"/>
              {errors.titulo && errors.titulo.type === "required" && <span className="alertField">Campo título é obrigatório</span>}
              {errors.titulo && errors.titulo.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
            </Col>
            </Row>
          {!medicoCadastrado ?
            <div>
              <br/>
              <center><h4>Cadastre-se agora, é rápido e fácil!</h4></center>
            <Row className="justify-content-md-center">
              <Col lg={4} md={10}>
                <br/>
                <Form.Label className="required">Nome médico</Form.Label>
                <Form.Control
                  type="text"
                  name="nome_med"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  placeholder="Insira aqui seu nome completo"
                />
                {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
                {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
              <Col lg={4} md={10}>
                <br/>
                <Form.Label className="required">CRM</Form.Label>
                <Form.Control
                  type="text"
                  name="crm"
                  maxLength="6"
                  ref={register({required:true, maxLength: 6})}
                  placeholder="Insira aqui seu CRM"
                />
                {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo CRM é obrigatório</span>}
                {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 6 caracteres</span> }
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={4} md={10}>
                <br/>
                <Form.Label>Telefone</Form.Label><br/>
                <Form.Control
                  type="text"
                  name="contato_med"
                  maxLength="14"
                  ref={register({maxLength: 14})}
                  placeholder="Insira aqui seu ddd e telefone (apenas números)"
                  onKeyUp={(e) => Validador.formatNumber(e)}
                />
                {errors.telefone && errors.telefone.type === "maxLength" && <span className="alertField">O tamanho máximo é de 11 números</span> }
              </Col>
              
              <Col lg={4} md={10}>
                <br/>
                <Form.Label>Especialiadade</Form.Label><br/>
                <Dropdown
                  options={ServiceConsulta.especialidade()}
                  name="id_especialidade"
                  onChange={setEspecialidadeMedico}
                  style={{width: '25em'}}
                  value={id_espec}
                  filter={true}
                  filterPlaceholder="Especialidade médico"
                  filterBy="label,value"
                  showClear={true}
                />
              </Col>
            </Row>
            <br/>
            </div>
            : <br/> }
            <Row className="justify-content-md-center">
              <Col lg={4} md={12}><br/>
                <Form.Label className="required">Sintomas</Form.Label><br/>
                <Form.Control
                  as="textarea"
                  rows="5"
                  cols="30"
                  placeholder="Insira aqui os sintomas"
                  maxLength="240"
                  name="sintoma"
                  ref={register({required:true, maxLength: 240})}
                />
                {errors.sintoma && errors.sintoma.type === "required" && <span className="alertField">Campo sintomas é obrigatório</span>}
                {errors.sintoma && errors.sintoma.type === "maxLength" && <span className="alertField">O tamanho máximo é de 240 caracteres</span> }
              </Col>
              <Col lg={4} md={12}><br/>
                <Form.Label>Diagnóstico(CID)</Form.Label><br/>
                <Form.Control
                  as="textarea"
                  rows="5"
                  cols="30"
                  placeholder="Insira aqui o diagnóstico"
                  maxLength="240"
                  name="diagnostico"
                  ref={register({maxLength: 240})}
                />
              </Col>
              <Col lg={4} md={12}><br/>
                <Form.Label>Medicação</Form.Label><br/>
                <Form.Control
                  as="textarea"
                  rows="5"
                  cols="30"
                  placeholder="Insira aqui a medicação"
                  maxLength="240"
                  name="medicacao"
                  ref={register({maxLength: 240})}
                />
              </Col>
            </Row>
            <Row lg={6} className="justify-content-md-center">
              <Col>
                <br/><br/><br/>
                <center>
                  <Button label="Cadastrar consulta" size="45" className="p-button-danger" type="submit"/>
                </center>
              </Col>
            </Row>
          </form>
          <br/><br/><br/><br/><br/><br/>
          </div>
        </Container>
      </div>
  )
}