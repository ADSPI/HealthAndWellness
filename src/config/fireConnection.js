import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';


  let firebaseConfig = {
    apiKey: "AIzaSyCX0iLmpJ6MSc5WTdqfGtSdWLX3MPth5S4",
    authDomain: "healthapp-e39c7.firebaseapp.com",
    databaseURL: "https://healthapp-e39c7.firebaseio.com",
    projectId: "healthapp-e39c7",
    storageBucket: "healthapp-e39c7.appspot.com",
    messagingSenderId: "794326135355",
    appId: "1:794326135355:web:85705dc7590702c597621e",
    measurementId: "G-CPWP9D6RE5"
  };


class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);

    //Referenciando a database para acessar em outros locais
    //this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logout(){
    return app.auth().signOut();
  }

  cadastrar(email, password){
      return app.auth().createUserWithEmailAndPassword(email, password);
    }   

  /*async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })

  }*/

  isInitialized(){
      return new Promise(resolve =>{
          app.auth().onAuthStateChanged(resolve);
      })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback);

  }




}

export default new Firebase();