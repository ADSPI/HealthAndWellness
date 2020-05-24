class Validador{

    formatNumber(e){
      var i;
      for (i = 0; i <= e.target.value.length; i++) {
        if((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)){
      } else {
        e.target.value = e.target.value.substring(0, (e.target.value.length - 1));
      }
      };
    };
    
  }

  export default new Validador();