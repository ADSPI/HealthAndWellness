import React, {Component} from 'react';


export default class ErrorUrl extends Component{

  render(){
    return(
        <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Empty Page</h1>
                        <p>Ops, não encontramos esse endereço em nosso servidor! :(</p>
                    </div>
                </div>
            </div>
        );
  }
}