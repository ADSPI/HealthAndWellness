import React from 'react';
import logo from './../../img/logo.png';

export default function Home() {

  return (
    <div>
      <div>
        <center>
        <h1>Quem somos</h1>
        </center>
        <img src={logo} alt="Logo da Health and Wellness" style={{width:'30%'}}/>
        Seja bem-vindo ao Health and Wellness, não repare a bagunça, ainda estamos em estágio embrionário!
      </div>

    </div>
  );
}