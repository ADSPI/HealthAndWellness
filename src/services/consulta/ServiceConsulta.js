//import { CONFIG } from '../../config/cped';
import firebase from './../../config/fireConnection';
import dadosConsulta from './../dados_mockados/historicoConsulta';

class ServiceConsulta{

    insertConsulta(data){
        let consulta = [];
        consulta.id_paciente = firebase.getUID().toString();
        consulta.sintoma = data.sintoma;
        consulta.diagnostico = data.diagnostico;
        consulta.medicacao = data.medicacao;
        consulta.id_medico = data.id_medico;
        consulta.titulo = data.titulo;
        console.log(consulta);
    };

    atualizaConsulta(data){
        let consulta = [];
        consulta.id_paciente = firebase.getUID().toString();
        consulta.sintoma = data.sintoma;
        consulta.diagnostico = data.diagnostico;
        consulta.medicacao = data.medicacao;
        consulta.id_medico = data.id_medico;
        consulta.titulo = data.titulo;
        console.log(consulta);
    };

    listaConsulta(){

        return null;
    }

    getConsulta(id_consulta){

        return null;
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