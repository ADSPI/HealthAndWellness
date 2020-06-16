import React from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useForm from "react-hook-form";

import './../../css/css_general.css';

export default function NovoExame() {

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
  }

  const onBasicUpload = () => {
    console.log("Arquivo subido");
  }

    return (
            <div>
              <Container>
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
                        ref={register({required:true, maxLength: 50})}
                        placeholder="Insira aqui o título da consulta"
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
                        ref={register({maxLength: 50})}
                        placeholder="Insira aqui o ID da consulta"
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
                      />
                    </Col>
                  </Row>
                  <Row lg={6} className="justify-content-md-center">
                    <Col>
                      <br/><br/><br/>
                      <center>
                        <Button label="Cadastrar exame" size="45" className="p-button-danger" type="submit"/>
                      </center>
                    </Col>
                  </Row>
                </form>
                <br/><br/><br/><br/><br/>
              </div>
              </Container>
            </div>
      )
}