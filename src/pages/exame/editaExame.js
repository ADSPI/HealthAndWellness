import React, { useState, useEffect } from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useForm from "react-hook-form";
import Loading from '../loading';
import {Link} from 'react-router-dom';

//SERVICE
import ServiceExame from './../../services/exame/ServiceExame';

import './../../css/css_general.css';

export default function NovoExame() {

  const { register, handleSubmit, errors } = useForm();
  const [stateEdit, setStateEdit] = useState(true);
  const [exame, setExame] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    var url = window.location.pathname;
    var idExame = url.split("/")[2];
   
    setExame(ServiceExame.getExameMockado(idExame));
    setLoading(false);
  }, []);


  const onSubmit = data => {
    console.log(data);
  }

  const onBasicUpload = () => {
    console.log("Arquivo subido");
  }

  const changeStateEdit = (state) => {
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
                  <h2>Cadastrar novo exame</h2>
                </center>
                <br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="justify-content-md-center">
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label className="required">Nome do exame</Form.Label>
                      <Form.Control
                        type="text"
                        name="nome_exame"
                        maxLength="50"
                        value={exame.nome_exame}
                        ref={register({required:true, maxLength: 50})}
                        placeholder="Insira aqui o título da consulta"
                        disabled={stateEdit}
                      />
                      {errors.nome_exame && errors.nome_exame.type === "required" && <span className="alertField">Campo nome exame é obrigatório</span>}
                      {errors.nome_exame && errors.nome_exame.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label>ID consulta</Form.Label>
                      <Form.Control
                        type="text"
                        name="id_consulta"
                        maxLength="50"
                        value={exame.id_consulta}
                        ref={register({maxLength: 50})}
                        placeholder="Insira aqui o ID da consulta"
                        disabled={stateEdit}
                      />
                      {errors.id_consulta && errors.id_consulta.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label className="required">Exame</Form.Label><br/>
                      <FileUpload
                        mode="basic"
                        chooseLabel="Selecionar arquivo de exame"
                        name="demo[]"
                        url="./upload.php"
                        accept="image/*"
                        maxFileSize={1000000}
                        onUpload={onBasicUpload}
                        disabled={stateEdit}
                      />
                    </Col>
                  </Row>
                {stateEdit ?
                    <Row lg={6} className="justify-content-md-center">
                        <Col>
                        <br/><br/><br/>
                            <center>
                            <Link to='/historicoExame'>
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
                                <Link to='/historicoExame'>
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
                <br/><br/><br/><br/><br/>
              </div>}
              </Container>
            </div>
      )
}