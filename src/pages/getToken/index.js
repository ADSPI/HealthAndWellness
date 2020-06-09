import React, { useEffect } from 'react';
import Loading from './../loading';

export default function GenerateToken() {
  
  useEffect(() => {
    var url = window.location.pathname;
    var accessToken = url.split("/")[2];
    var refreshToken = url.split("/")[3];

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    document.location.assign('/token');
  });

  return (
    <Loading/>
  );
}