import { API } from './../../config/api';
import firebase from './../../config/fireConnection';
import exame from './../dados_mockados/exame';

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
        return fetch('https://api-health-wellness.herokuapp.com/hw/exam', {
            method: 'GET',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            }
        });
        
    }

    getExame(idExame){
        return fetch(`${'https://api-health-wellness.herokuapp.com/hw/exam/' + idExame}`, {
            method: 'GET',
            headers: {
              'refresh-token': localStorage.getItem('refreshToken').toString(),
              'access-token': localStorage.getItem('accessToken').toString(),
              'Content-Type': 'application/json'
            }
        });
    }

    listaExameMockado(){
        console.log(exame.exames());
        return exame.exames();
    }

    getExameMockado(idConsulta){
        return exame.exame();
    }

}

export default new ServiceExame();