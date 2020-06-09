import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import Form from 'react-bootstrap/Form';
import firebase from './../../config/fireConnection';

export default function GenerateToken() {

  const [ showToken, setshowToken ] = useState(false);
  const [ token, setToken ] = useState(false);

  useEffect(() => {
    console.log("Iniciando");
  });

  const onSubmit = data => {

  };

  const generateToken = () => {
    let uid = firebase.getUID();
    firebase.getTokenCreateCustomToken(uid);
    /*.then(function(customToken) {
        console.log(customToken);
        setToken(customToken);
      })
      .catch(function(error) {
        console.log('Error creating custom token:', error);
    });
    /*setshowToken(false);
    var url = window.location.href;
    url = url.replace('/generateToken', '');
    url = url + "/token/" + localStorage.getItem('accessToken');
    url = url + "/" + localStorage.getItem('refreshToken');
    
    setToken(url);
    setshowToken(true);
    console.log(url);*/
    //console.log('token ' + tokenNew);
    setshowToken(true);
  }

  const copyToClipboard = () => {
    var textField = document.createElement('textarea');
    textField.innerText = token;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    //textField.remove()

  };

  return (
    <div>
      <Container>
        <br/>
        <center><h2>Geração de token para consulta</h2></center><br/><br/>
        <Row className="justify-content-md-center">
            <Col lg={10} md={10}>
              {showToken?
              <div>
                <Form.Control
                  as="textarea"
                  rows="12"
                  cols="30"
                  name="token"
                  value={token}
                  disabled={true}
                />
                 <span className="alertField">O token é válido nos próximos 60 minutos.</span>
              <br/>
              <center>
                <Button 
                label="Copiar token"
                size="45"
                type="submit"
                onClick={() => copyToClipboard()}
                />
              </center>
              </div> 
              : null}
            </Col>
        </Row>
        <br/><br/>
        <Row lg={6} className="justify-content-md-center">
            <Col md={10}>
                <center>
                    <Button 
                    label="Gerar token"
                    className="p-button-danger"
                    size="45"
                    type="submit"
                    onClick={() => generateToken(false)}
                    />
                </center>
            </Col>
        </Row>
        <br/><br/><br/><br/><br/>
      </Container>
    </div>
  );
}