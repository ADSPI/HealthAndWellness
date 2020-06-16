import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';
import ServiceToken from './../../services/token/ServiceToken';

export default function GenerateToken() {

  const [ showToken, setshowToken ] = useState(false);
  const [ customToken, setCustomToken ] = useState();
  const [ labelCopiar, setLabelCopiar ] = useState("Copiar token");

  const setCustomTokenUser = (response) => {
    var url = window.location.href;
    url = url.replace('/generateToken', '');
    url = url + "/getToken/";

    response.json().then(data => {
      setCustomToken(url + data.data.custom_token);
      setshowToken(true);
    }).catch((erro) => {
      console.log(erro);
    });
  }

  const getToken = () => {
    ServiceToken.getToken().then(response => setCustomTokenUser(response))
    .catch((erro) => {
      console.log(erro);
    });
  }

  const copyToClipboard = () => {
    var textField = document.createElement('textarea');
    textField.innerText = customToken;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    setLabelCopiar("Token copiado");
  };

  return (
    <div>
      <Container>
        <br/>
        <center><h2>Geração de token para consulta</h2></center><br/><br/>
        {showToken?
        <Row className="justify-content-md-center">
            <Col lg={10} md={10}>
              <div>
                <Form.Control
                  as="textarea"
                  rows="12"
                  cols="30"
                  name="token"
                  value={customToken}
                  disabled={true}
                />
                 <span className="alertField">O token é válido nos próximos 60 minutos.</span>
              <br/><br/><br/>
              <center>
                <Button 
                label={labelCopiar}
                size="45"
                type="submit"
                onClick={() => copyToClipboard()}
                />
              </center>
              </div> 
              
            </Col>
        </Row>
        : 
        <Row lg={6} className="justify-content-md-center">
          <Col md={10}>
            <center>
                <Button 
                label="Gerar token"
                className="p-button-danger"
                size="45"
                type="submit"
                onClick={() => getToken()}
                />
            </center>
          </Col>
        </Row>
        }
        <br/><br/><br/><br/><br/><br/><br/>
      </Container>
    </div>
  );
}