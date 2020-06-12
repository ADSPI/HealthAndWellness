import { API } from './../../config/api';
import firebase from './../../config/fireConnection';
import axios from 'axios';

class ServicePaciente{

    insertPacienteBanco(data){
        var patient = new Object();
        patient.name = data.name;
        patient.contact = data.contact;
        patient.email = data.email;
        patient.birth_date = data.birth_date;
        patient.password = data.password;

        return fetch('/hw/patient-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient),
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