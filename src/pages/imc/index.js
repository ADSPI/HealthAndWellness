import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImcService from './../../services/imc/ImService';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default function Imc() {

  const { register, handleSubmit, watch, errors } = useForm();
  
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
        
        <p align="justify">A fórmula do IMC é a mesma para todas as pessoas. O que muda são os pontos de corte, ou seja, os valores
        considerados como referências para a classificação do seu peso. Essas referências são específicas para
        crianças, adolescentes, adultos, idosos e gestantes.</p>

        <Row className="justify-content-md-center">
            <Col xs lg="4">
                <Card bg="light" style={{ width: '18rem' }}>
                    <Card.Header><Card.Title><center>Consulta de IMC</center></Card.Title></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Peso</Form.Label>
                                        <Form.Control name="peso" type="text" ref={register({min: 1, max: 3})} placeholder="Insira seu peso em kg" />
                                        
                                        <Form.Label>Altura</Form.Label>
                                        <Form.Control name="altura" type="number" ref={register({maxlength: 2})} placeholder="Insira sua altura em cm" />
                                    </Form.Group>
                                    
                                    <Row className="justify-content-md-center">
                                        <Button className="justify-content-md-center" type="submit" variant="primary">Consultar</Button>
                                    </Row>

                                </form>
                            </Card.Text>
                        </Card.Body>
                </Card>
            
            </Col>
      </Row>
      <br/><br/>
      {showAlert?
        <center><h3>{showStatus}</h3></center> 
      : null}
    </div>
    </Container>
  );
}