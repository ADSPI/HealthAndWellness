import { API } from './../../config/api';
import firebase from './../../config/fireConnection';

class ServicePaciente{

    insertPacienteBanco(data){        
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();

        return fetch(API.SERVICE_BACKEND.INSERE_PACIENTE, {
            method: 'POST',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    };

    updatePacienteBanco(data){
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();

        return fetch(API.SERVICE_BACKEND.ATUALIZA_PACIENTE, {
            method: 'POST',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    };

}

export default new ServicePaciente();