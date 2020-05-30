import React, { useState, useEffect } from 'react';
import useForm from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import Loading from '../loading';
import {Link} from 'react-router-dom';

//SERVICE
import ServiceConsulta from './../../services/consulta/ServiceConsulta';

import './../../css/css_general.css';

export default function EditaConsulta (){
  
  const { register, handleSubmit, errors } = useForm();
  const [idMedico, setIdMedico] = useState("Informe seu CRM");
  const [loading, setLoading] = useState(false);
  const [consulta, setConsulta] = useState([]);
  const [stateEdit, setStateEdit] = useState(true);

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

  useEffect(() => {
    setLoading(true);

    var url = window.location.pathname;
    var idConsulta = url.split("/")[2];
   
    setConsulta(ServiceConsulta.getConsultaMockado(idConsulta));
    setLoading(false);
  }, []);

  const onSubmit = data => {
      
      data.id_medico = idMedico;
      ServiceConsulta.atualizaConsulta(data);
  }

  const setCRMMedico = (e) => {
      consulta.nome_med = 'Nome será atualizado conforme CRM';
      setConsulta(consulta);
      setIdMedico(e.value);
  }

  const changeStateEdit = (state) => {
    setIdMedico(consulta.id_medico);
    setStateEdit(state);
  }

  return (
    <div>
      <Container>
        {loading ?
          <Loading/> :
          <div>
          <br/>
          <center>
            <h2>Consulta</h2>
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
                  value={stateEdit ? consulta.id_medico : idMedico}
                  filter={true}
                  filterPlaceholder="CRM médico"
                  filterBy="label,value"
                  showClear={true}
                  disabled={stateEdit}
                />
              </Col>
              <Col lg={4} md={10}>
                <br/>
                <Form.Label>Nome médico</Form.Label>
                <Form.Control
                  type="text"
                  name="nome_med"
                  maxLength="50"
                  ref={register({required:true, maxLength: 50})}
                  defaultValue={consulta.nome_med}
                  disabled={true}
                  placeholder="Insira aqui seu nome completo"
                />
                {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
                {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
              <Col lg={4} md={12}>
                <br/>
                <Form.Label className="required">Título da consulta</Form.Label>
                <Form.Control
                type="text"
                name="titulo"
                maxLength="50"
                ref={register({required:true, maxLength: 50})}
                placeholder="Insira aqui o título da consulta"
                defaultValue={consulta.titulo}
                disabled={stateEdit}                
                />
                {errors.titulo && errors.titulo.type === "required" && <span className="alertField">Campo título é obrigatório</span>}
                {errors.titulo && errors.titulo.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
              </Col>
            </Row>
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
                  defaultValue={consulta.sintoma}
                  disabled={stateEdit}
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
                  defaultValue={consulta.diagnostico}
                  disabled={stateEdit}
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
                  defaultValue={consulta.medicacao}
                  disabled={stateEdit}
                />
              </Col>
            </Row>
            {stateEdit ?
            <Row lg={6} className="justify-content-md-center">
                <Col>
                <br/><br/><br/>
                    <center>
                    <Link to='/historicoConsulta'>
                        <Button label="Voltar" className="p-button-secondary"/>
                    </Link>
                    </center>
                </Col>
              <Col className="justify-content-md-center">
                <br/><br/><br/>
                <center>
                  <Button label="Editar" onClick={() => changeStateEdit(false)}  type="" className="p-button-danger"/>
                </center>
                <br/><br/><br/>
              </Col>
            </Row> :
            <Row lg={6} className="justify-content-md-center">
                <Col>
                    <br/><br/><br/>
                    <center>
                        <Link to='/historicoConsulta'>
                            <Button label="Voltar" className="p-button-secondary"/>
                        </Link>
                    </center>
                </Col>
                <Col>
                    <br/><br/><br/>
                    <center>
                    <Button label="Atualizar" className="p-button-danger" title="Submit" onPress={handleSubmit(onSubmit)} type="submit"/>
                    </center>
                </Col>
            </Row>
            }
          </form>
          <br/><br/><br/><br/>
          </div> }
        </Container>
      </div>
  )
}