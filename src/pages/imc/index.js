import React, { useState } from 'react';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import {Button} from 'primereact/button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImcService from './../../services/imc/ImService';
import Container from 'react-bootstrap/Container';
import "./../../css/css_general.css"

export default function Imc() {

  const { register, handleSubmit, errors } = useForm();
  const [ showStatus, setShowStatus ] = useState();
  const [ showAlert, setshowAlert ] = useState(false);

  const onSubmit = data => {
    let valor =  ImcService.calculaImc(data);

    setshowAlert(true);
    setShowStatus(valor);
  };

  return (
    <Container>
      <div >
      <center><h1>Índice de Massa Corporal (IMC)</h1></center>
      <br/>
          <p align="justify">Uma das maneiras de saber se o seu peso está adequado à sua altura é calculando o <b>Índice de Massa Corporal (IMC)</b>.
          O resultado dessa fórmula matemática poderá indicar, por exemplo, se você está com peso adequado,
          se apresenta magreza, sobrepeso ou obesidade. Considere apenas como um ponto de partida,
          pois o IMC não avalia o seu estado nutricional como todo e precisa ser interpretado por um 
          profissional de saúde, que analisará uma série de outras medidas e características suas, como idade,
          sexo, percentual de gordura, entre outros aspectos, antes de um diagnóstico.</p>

          <Row className="justify-content-md-center">
              <Col xs lg="4">
                <center><h2>Consulta de IMC</h2></center>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control name="peso" type="text" ref={register({min: 1, max: 3})} placeholder="Insira seu peso em kg" />
                    {errors.peso && errors.peso.type === "required" && <span className="alertField">Campo peso é requerido</span>}

                    <Form.Label>Altura</Form.Label>
                    <Form.Control name="altura" type="number" ref={register({maxlength: 2})} placeholder="Insira sua altura em cm" />
                    {errors.altura && errors.altura.type === "required" && <span className="alertField">Campo altura é requerido</span>}

                  </Form.Group>
                                      
                  <Row className="justify-content-md-center">
                    <Button label="Calcular" type="submit"/>
                  </Row>
                </form>            
              </Col>
        </Row>
        <br/><br/>
        {showAlert?
          <center>
            <h3>{showStatus}</h3>
          <br/><br/><br/>
          </center> 
        : null}
      </div>
    </Container>
  );
}