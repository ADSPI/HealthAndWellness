import { API } from './../../config/api';
import firebase from './../../config/fireConnection';
import exame from './../dados_mockados/exame';

class ServiceExame{

    insertExame(doc){
        let uid = firebase.getUID();
        const uploadTasks = firebase.storage.ref(`exames/${uid}/${doc.name}`).put(doc);
        return "url";
        /*await uploadTasks.on('state_changed',
        (snapshot)=> {
            //progress
        },
        (error) => {
            //Error
            console.log('Error imagem' + error);
        },
        () => {
            //sucess
        })*/
        //firebase.storage
        /*var refreshToken = firebase.getRefreshToken();
        var accessToken = firebase.getAccessToken();

        return fetch(API.SERVICE_BACKEND.INSERE_EXAME, {
            method: 'POST',
            headers: {
              'refreshToken': refreshToken,
              'accessToken': accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });*/
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