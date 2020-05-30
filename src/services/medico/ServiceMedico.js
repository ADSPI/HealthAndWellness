//import { CONFIG } from '../../config/cped';
import ServiceConsulta from './../consulta/ServiceConsulta';

class ServiceMedico{

    insertMedico(data){
        let medico = [];
        medico.crm = data.crm;
        medico.nome_med = data.nome_med;
        medico.contato_med = data.contato_med;
        medico.id_espec = data.id_espec;

        console.log(medico);

        data.id_medico = data.crm;
        ServiceConsulta.insertConsulta(data);
        return medico;
    };
}

export default new ServiceMedico();