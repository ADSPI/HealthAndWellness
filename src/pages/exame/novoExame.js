import React, {useState} from 'react';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useForm from "react-hook-form";
import ServiceExame from './../../services/exame/ServiceExame';
import {Calendar} from 'primereact/calendar';
import firebase from './../../config/fireConnection';

import './../../css/css_general.css';

export default function NovoExame() {

  const { register, handleSubmit, errors } = useForm();
  const [exameDoc, setExameDoc] = useState(null);
  const [dataExame, setDataExame] = useState(null);
  const [urlExame, setUrlExame] = useState('');
  const [progress, setProgress] = useState(0);
  const [stateInsert, setStateInsert] = useState(true);

  const onSubmit = async (data) => {
    data.data_exame = dataExame;
    //await insertExame(exameDoc);
    data.url = urlExame;
    ServiceExame.insertExame(data).then(retorno => {
      alert("Parabéns!");
      //document.location.assign('/');
    }).catch(error => {
      console.log(error);
    });
  }

  const handleFile = async (e) => {
    if(e.target.files[0]){
      const doc = e.target.files[0];
      if(doc.type === 'image/png' || doc.type === 'image/jpeg' || doc.type === 'image/jpg'){
        insertExame(doc).then(retorno =>{
          
        })
      } else {
        alert('Anexe um arquivo do tipo PNG ou JPG');
        setExameDoc(null);
        setStateInsert(true);
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

  const insertExame = async (doc) => {
    let uid = firebase.getUID();
    const uploadTasks = firebase.storage.ref(`exames/${uid}/${doc.name}`).put(doc);
    //return "url";
    await uploadTasks.on('state_changed',
    (snapshot)=> {
      //progress
      const progressState = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progressState);
    },
    (error) => {
        //Error
        console.log('Error imagem' + error);
    },
    () => {
      //sucess
      setExameDoc(doc);
      firebase.storage.ref(`exames/${uid}`)
      .child(doc.name).getDownloadURL()
      .then(url => {
        setUrlExame(url);
        setStateInsert(false);
      })

    })
  };

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
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label className="required">Exame</Form.Label><br/>
                      <input 
                      type="file"
                      onChange={(e) => handleFile(e)}
                      />
                      {urlExame !== '' ?
                        <img src={urlExame} width="250" height="150" alt="Imagem exame"/>
                          :
                        <progress value={progress} max="100"/>
                      }
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label className="required">ID da consulta</Form.Label>
                      <Form.Control
                        type="number"
                        name="appointment"
                        maxLength="50"
                        ref={register({maxLength: 4})}
                        placeholder="Insira aqui o ID da consulta"
                      />
                      {errors.appointment && errors.appointment.type === "maxLength" && <span className="alertField">O tamanho máximo é de 4 caracteres</span> }
                    </Col>
                  </Row>
                  <Row lg={6} className="justify-content-md-center">
                    <Col>
                      <br/><br/><br/>
                      <center>
                        <Button disabled={stateInsert} label="Cadastrar exame" size="45" className="p-button-danger" type="submit"/>
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