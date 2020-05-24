import React, {Component} from 'react';
import not_found from './../../img/not_found.png';
import './../../css/css_general.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

export default class ErrorUrl extends Component{

  render(){
    return(
        <Container>
            
            <Row className="justify-content-md-center">
                <Col>
                <br/>
                <center>
                    <h2>Ops, não encontramos esse endereço em nosso sistema!<span role="img" aria-label="sheep">🙁</span></h2>
                    <h4>Verifique a URL e tente novamente</h4>
                    <img src={not_found} style={{width:'50%'}} alt="Imagem de URL não encontrada"/>
                </center>
                </Col>
            </Row>
        </Container>
        );
  }
}