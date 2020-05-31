import { API } from './../../config/api';
import firebase from './../../config/fireConnection';
import dadosConsulta from './../dados_mockados/historicoConsulta';

class ServiceConsulta{

    insertConsulta(data){
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();

        return fetch(API.SERVICE_BACKEND.INSERE_CONSULTA, {
            method: 'POST',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          });
    };

    atualizaConsulta(data){
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();
        
        return fetch(API.SERVICE_BACKEND.ATUALIZA_CONSULTA, {
            method: 'PUT',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    };

    listaConsulta(){
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();

        return fetch(API.SERVICE_BACKEND.LISTA_CONSULTA, {
            method: 'GET',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            }
        });
    }

    buscaConsulta(id_consulta){
        var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();
        
        return fetch(`${API.SERVICE_BACKEND.BUSCA_CONSULTA + id_consulta}` , {
            method: 'GET',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            }
        });
    }

    listaConsultaMockado(){
        return dadosConsulta.consultas();
    }

    getConsultaMockado(idConsulta){
        return dadosConsulta.consulta();
    }

    especialidade(){
        return [
            {label: 'Anestesiologia', value: '1'},
            {label: 'Cardiologia', value: '2'},
            {label: 'Cirurgia geral', value: '3'},
            {label: 'Cirurgia plástica', value: '4'},
            {label: 'Coloproctologia', value: '5'},
            {label: 'Dermatologia', value: '6'},
            {label: 'Endocrinologia', value: '7'},
            {label: 'Gastroenterologia', value: '8'},
            {label: 'Genética médica', value: '9'},
            {label: 'Geriatria', value: '10'},
            {label: 'Ginecologia e obstetrícia', value: '11'},
            {label: 'Hematologia', value: '12'},
            {label: 'Mastologia', value: '13'},
            {label: 'Medicina de emergência', value: '14'},
            {label: 'Medicina legal ou medicina forense', value: '15'},
            {label: 'Neurologia', value: '16'},
            {label: 'Oftalmologia', value: '17'},
            {label: 'Oncologia', value: '18'},
            {label: 'Ortopedia', value: '19'},
            {label: 'Pediatria', value: '20'},
            {label: 'Psiquiatria', value: '21'},
            {label: 'Urologia', value: '22'}
          ];
    };

}

export default new ServiceConsulta();