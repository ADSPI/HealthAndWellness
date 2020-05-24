import React, { useState, useEffect } from 'react';
import logo from './../../img/logo.png';
import firebase from './../../config/fireConnection';

export default function Home() {

  return (
    <div>
      <div>
        <center>
        <h1>Quem somos</h1>
        </center>
        <img src={logo} style={{width:'30%'}}/>
        Seja bem-vindo ao Health and Wellness, não repare a bagunça, ainda estamos em estágio embrionário!
      </div>

    </div>
  );
}