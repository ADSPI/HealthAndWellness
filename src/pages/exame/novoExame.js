import React, {useState} from 'react';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useForm from "react-hook-form";
import ServiceExame from './../../services/exame/ServiceExame';
import {Calendar} from 'primereact/calendar';

import './../../css/css_general.css';

export default function NovoExame() {

  const { register, handleSubmit, errors } = useForm();
  const [exameDoc, setExameDoc] = useState(null);
  const [dataExame, setDataExame] = useState(null);

  const onSubmit = async (data) => {
    data.data_exame = dataExame;
    let url = await ServiceExame.insertExame(exameDoc);
    data.url = url;
    console.log(data);
  }

  const handleFile = async (e) => {
    if(e.target.files[0]){
      const doc = e.target.files[0];
      if(doc.type === 'image/png' || doc.type === 'image/jpeg' || doc.type === 'image/jpg'){
        setExameDoc(doc);
      } else {
        alert('Anexe um arquivo do tipo PNG, JPG ou PDF');
        setExameDoc(null);
        return null;
      }
    }
  }

  const convertDate = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    setDataExame([day, mnth, date.getFullYear()].join("/"));
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
                      <Form.Label className="required">Título do exame</Form.Label>
                      <Form.Control
                        type="text"
                        name="nome_exame"
                        maxLength="50"
                        ref={register({required:true, maxLength: 50})}
                        placeholder="Insira aqui o título do exame"
                      />
                      {errors.nome_exame && errors.nome_exame.type === "required" && <span className="alertField">Campo nome exame é obrigatório</span>}
                      {errors.nome_exame && errors.nome_exame.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label>Data exame</Form.Label><br/>
                      <Calendar onChange={(e) => convertDate(e.target.value)} dateFormat="dd/mm/yy"
                      monthNavigator={true} yearNavigator={true} yearRange="1900:2020" placeholder="dd/mm/aaaa"/>
                      <br/>
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label className="required">Exame</Form.Label><br/>
                      <input 
                      type="file"
                      onChange={(e) => handleFile(e)}
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