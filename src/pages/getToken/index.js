import React, { useEffect } from 'react';
import Loading from './../loading';
import firebase from './../../config/fireConnection';

export default function GenerateToken() {
  
  useEffect(() => {
    var url = window.location.pathname;
    var token = url.split("/")[2];

    firebase.signInWithCustomToken(token)
    .then(function() {
      localStorage.setItem('access', "token");
      localStorage.setItem('accessToken', firebase.getAccessToken());
      localStorage.setItem('refreshToken', firebase.getRefreshToken());
      document.location.assign('/');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });

    
  });

  return (
    <Loading/>
  );
}