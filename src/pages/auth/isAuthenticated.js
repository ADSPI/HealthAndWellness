import firebase from './../../config/fireConnection';

export function isAuthenticated() {

	//console.log( "tee" + firebase.auth().currentUser);
	return firebase.auth().onAuthStateChanged((user)=>{
		return user.j;
    });
	//return true;
	/*console.log(user);
 		if(user){
         	console.log("true");
          	return true;
        } else {
          	console.log("false");
        	return false;
        }*/
 /*firebase.auth().onAuthStateChanged((user)=>{
		console.log(user.email);
         if(user.email !== null){
         	console.log("true");
          	var state = true;
        } else {
          	console.log("false");
        	var state = false;
        }
    });*/
};

/*

export const isAuthenticated = () => (

firebase.auth().onAuthStateChanged((user)=>{
         if(user){
         	console.log("true");
            return true;
        } else {
        	console.log("false");
        	return false;
        }
    })
	
);*/