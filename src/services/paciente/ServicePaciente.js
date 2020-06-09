import { API } from './../../config/api';
import firebase from './../../config/fireConnection';

class ServicePaciente{

    insertPacienteBanco(data){
        //let paciente = [];
        var paciente = {
            name: data.nome_pac,
            contact: data.nome_pac,
            email: data.email_pac,
            birth_date: data.data_nasc,
            password: data.senha
        };
        console.log(paciente);
        //API.SERVICE_BACKEND.INSERE_PACIENTE 
        return fetch('https://api-health-wellness.herokuapp.com/hw/patient-auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: paciente,
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