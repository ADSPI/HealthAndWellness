import React, { useState, useEffect } from 'react';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useForm from "react-hook-form";
import Loading from '../loading';
import {Link} from 'react-router-dom';
import firebase from './../../config/fireConnection';
import {Calendar} from 'primereact/calendar';

//SERVICE
import ServiceExame from './../../services/exame/ServiceExame';

import './../../css/css_general.css';

export default function NovoExame() {

  const { register, handleSubmit, errors } = useForm();
  const [stateEdit, setStateEdit] = useState(true);
  const [exame, setExame] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exameDoc, setExameDoc] = useState(null);
  const [dataExame, setDataExame] = useState(null);
  const [urlExame, setUrlExame] = useState('');
  const [progress, setProgress] = useState(0);
  const [stateInsert, setStateInsert] = useState(true);
  //const[dataExame, setDataExame] = useState();

  useEffect(() => {
    setLoading(true);

    var url = window.location.pathname;
    var idExame = url.split("/")[2];
    console.log(ServiceExame.getExameMockado(idExame));
    ServiceExame.getExame(idExame).then(response => getExame(response))
    .catch((erro) => {
      console.log(erro);
    });
    //setExame(ServiceExame.getExameMockado(idExame));
    window.setTimeout(function() {
      setLoading(false);
    }, 1500);
  }, []);

  const getExame = (response) => {
    response.json().then(data => {
      setUrlExame(data.data.file_path);
      setDataExame(data.data.creation_date);
      var parts = data.data.creation_date.split("/");
      data.data.creation_date =  new Date(parts[2], parts[1] - 1, parts[0]);
      setExame(data.data);
      setLoading(false);
    }).catch((erro) => {
      console.log(erro);
    });
  }

  const convertDate = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    setDataExame([day, mnth, date.getFullYear()].join("/"));
  }

  const onSubmit = data => {
    data.creation_date = dataExame;
    console.log(data);
  }

  const changeStateEdit = (state) => {
    setStateEdit(state);
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

  const updateName = (value) => {
    exame.name = value;
    setExame(exame);
  }

  const updateIdConsulta = (value) => {
    exame.appointment = value;
    setExame(exame);
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
                        name="name"
                        maxLength="50"
                        defaultValue={exame.name}
                        ref={register({required:true, maxLength: 50})}
                        placeholder="Insira aqui o título da consulta"
                        disabled={stateEdit}
                        onChange={(e) => updateName(e.target.value)}
                      />
                      {errors.nome_exame && errors.nome_exame.type === "required" && <span className="alertField">Campo nome exame é obrigatório</span>}
                      {errors.nome_exame && errors.nome_exame.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label>ID consulta</Form.Label>
                      <Form.Control
                        type="text"
                        name="appointment"
                        maxLength="50"
                        defaultValue={exame.appointment}
                        ref={register({maxLength: 50})}
                        placeholder="Insira aqui o ID da consulta"
                        disabled={stateEdit}
                        onChange={(e) => updateIdConsulta(e.target.value)}
                      />
                      {errors.id_consulta && errors.id_consulta.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label>Data exame</Form.Label><br/>
                      <Calendar
                        onChange={(e) => convertDate(e.target.value)}
                        dateFormat="dd/mm/yy"
                        monthNavigator={true}
                        yearNavigator={true}
                        yearRange="1900:2020"
                        placeholder="dd/mm/aaaa"
                        value={exame.creation_date}
                        disabled={stateEdit}
                      />
                      <br/>
                    </Col>
                    <Col lg={4} md={10}>
                      <br/>
                      <Form.Label className="required">Exame</Form.Label><br/>
                      <input 
                      type="file"
                      onChange={(e) => handleFile(e)}
                      disabled={stateEdit}
                      />
                      {urlExame !== '' ?
                        <img src={exame.file_path} width="250" height="150" alt="Imagem exame"/>
                          :
                        <progress value={progress} max="100"/>
                      }
                    </Col>
                  </Row>
                  {stateEdit ?
                    <Row>
                      <Col className="justify-content-md-center">
                        <br/><br/><br/>
                        <center>
                          <Link onClick={() => setStateEdit(false)}>Editar exame</Link>
                        </center>
                      </Col>
                    </Row> 
                    :
                    <Row lg={6} className="justify-content-md-center">
                      <Col>
                        <br/><br/><br/>
                        <center>
                          <Button label="Cancelar" onClick={() => setStateEdit(true)} className="p-button-secondary" />
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
                <br/><br/><br/><br/><br/><br/><br/>
              </div>}
              </Container>
            </div>
      )
}