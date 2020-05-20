import React, {Component} from 'react';
import {Menubar} from 'primereact/menubar';

export default class MenuBar extends Component {

    constructor() {
        super();
        
        this.state = {
            items:[
                {
                    label:'Início',
                    icon:'pi pi-home'                   
                },
                {
                    label:'Consulta',
                    icon:'pi pi-file-o',
                    items:[
                       {
                          label:'Nova consulta',
                          icon:'pi pi-fw pi-align-left'
                       },
                       {
                          label:'Histórico',
                          icon:'pi pi-fw pi-align-right'
                       }
                    ]
                },
                {
                   label:'Exame',
                   icon:'pi pi-save',
                   items:[
                      {
                         label:'Novo exame',
                         icon:'pi pi-fw pi-align-left'
                      },
                      {
                         label:'Histórico',
                         icon:'pi pi-fw pi-align-right'
                      }
                   ]
                },
                {
                   label:'Perfil',
                   icon:'pi pi-fw pi-user'
                },
                {
                   label:'Blog',
                   icon:'pi pi-fw pi-calendar'                   
                },
             ]
        };
    }

    render() {
        return (
            <div>
                <div className="content-section implementation">
                    <Menubar model={this.state.items} />
                </div>
            </div>
        );
    }
}