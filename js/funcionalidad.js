let peliculasArray = [];

document.addEventListener('DOMContentLoaded', function(){
    let peliculasJSON = 'https://japceibal.github.io/japflix_api/movies-data.json'
    getJSONData(peliculasJSON).then(function(respObj){
        if(respObj.status=="ok"){
            peliculasArray=respObj.data;
            console.log(peliculasArray);
        }
    });

});





let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
};