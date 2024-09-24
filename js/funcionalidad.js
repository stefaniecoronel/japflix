let moviesArray = [];
let moviesList = document.getElementById('lista')

document.addEventListener('DOMContentLoaded', function(){
    let peliculasJSON = 'https://japceibal.github.io/japflix_api/movies-data.json'
    getJSONData(peliculasJSON).then(function(respObj){
        if(respObj.status=="ok"){
            moviesArray=respObj.data;
            console.log(moviesArray);
        }
    });
  document.getElementById('btnBuscar').addEventListener('click', function(){
   let userSearchInput=document.getElementById('inputBuscar').value.toLowerCase();
   searchMovies(userSearchInput, moviesArray);
  });
});



function searchMovies(searchInput, array){
  moviesList.innerHTML ="";
  let newMoviesArray = array.filter (element => 
    element.title.toLowerCase().includes(searchInput)||
    element.tagline.toLowerCase().includes(searchInput)||
    element.overview.toLowerCase().includes(searchInput) ||
    element.genres.some(genre => genre.name.toLowerCase().includes(searchInput)));

  if (newMoviesArray.length > 0){
    showMovies(newMoviesArray); 
  }
  else {
    moviesList.innerHTML += `
    <div class="alert alert-danger" role="alert">
    No se encontraron resultados para su búsqueda.
    </div>
    `
  }
                    
}

function showMovies(movies){
   moviesList.innerHTML = "";
   movies.forEach( (element)=>{
    let stars = element.vote_average/2
    console.log(stars)
    let starRating =""
    if (stars<=1.2){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      `
    } else if (stars>1.2 && stars<=1.7){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa-regular fa-star-half-stroke checked"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      `
    } else if (stars>1.7 && stars<=2.2){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      `
    } else if (stars>2.2 && stars<=2.7){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa-regular fa-star-half-stroke checked"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      `
    } else if (stars>2.7 && stars<=3.2){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      `
    } else if (stars>3.2 && stars<= 3.7){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa-regular fa-star-half-stroke checked"></i>
      <i class="fa fa-star"></i>
      `
    } else if (stars>3.7 && stars<= 4.2){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star"></i>
      `
    } else if (stars>4.2 && stars<= 4.7){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa-regular fa-star-half-stroke checked"></i>
      `
    } else if (stars>4.7){
      starRating=`<i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      <i class="fa fa-star checked"></i>
      `
    }
    moviesList.innerHTML += `  
    <a href="#" class="list-group-item list-group-item-action custom-color">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${element.title}</h5>
        <small class="text-muted">${starRating}</small> 
      </div>
      <p class="mb-1">${element.tagline}</p>
    </a>
    `
   }
  )
}


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