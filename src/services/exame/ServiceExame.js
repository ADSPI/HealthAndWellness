import { API } from './../../config/api';
import firebase from './../../config/fireConnection';
import exame from './../dados_mockados/exame';
import { getAllByPlaceholderText } from '@testing-library/react';

class ServiceExame{

    insertExame(data){
        if(data.appointment === '') data.appointment = null;
        var exam = {
            file_path : data.url,
            creation_date : data.data_exame,
            name : data.nome_exame,
            patient : localStorage.getItem('userId'),
            appointment : null,
        }

        console.log(exam);

        return fetch('https://api-health-wellness.herokuapp.com/hw/exam', {
            method: 'POST',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(exam),
        });
    };

    atualizaExame(data){
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();
        
        return fetch(API.SERVICE_BACKEND.ATUALIZA_EXAME, {
            method: 'PUT',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    };

    listaExame(){
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();

        return fetch(API.SERVICE_BACKEND.LISTA_EXAME, {
            method: 'GET',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            }
        });
    }

    buscaExame(id_exame){
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();
        
        return fetch(`${API.SERVICE_BACKEND.BUSCA_EXAME + id_exame}` , {
            method: 'GET',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            }
        });
    }

    listaExameMockado(){
        return exame.exames();
    }

    getExameMockado(idConsulta){
        return exame.exame();
    }

}

export default new ServiceExame();