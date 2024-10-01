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
    <a onclick="generateOffcanvas(${element.id})" href="#offcanvasMovie" data-bs-toggle="offcanvas" role="button" class="list-group-item list-group-item-action custom-color">
      <div class="d-flex w-100 justify-content-between flex-column flex-sm-row">
        <h5 class="mb-1">${element.title}</h5>
        <small class="text-muted">${starRating}</small> 
      </div>
      <p class="mb-1">${element.tagline}</p>
    </a>
    `
   }
  )
}

let offcanvasTitle= document.getElementById('offcanvas-title')
let offcanvasBody = document.getElementById('offcanvas-body-movies')

function generateOffcanvas (id) {
  
  let clickedMovie = moviesArray.filter(element => element.id == id)
  console.log(clickedMovie)
  if (clickedMovie.length>0){
    let genresArray = clickedMovie[0].genres
    let genres = ""
    for (let i = 0; i< genresArray.length; i++) {
      if (i<genresArray.length-1){
        genres += `${genresArray[i].name} - `
      }
      else {
        genres +=`${genresArray[i].name}`
      }
      
    }
    let date = clickedMovie[0].release_date
    let year = date.slice(0,4)
    offcanvasTitle.innerHTML= `
  <h5 class="offcanvas-title" id="offcanvasMovieLabel">${clickedMovie[0].title}</h5>
  `
  offcanvasBody.innerHTML =`
  <div> 
  <small class="text-muted">${genres}</small> 
  <br>
  ${clickedMovie[0].overview}
  </div>
  <div class="dropdown mt-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
      More
   </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item disabled" href="#">Year: ${year} </a></li>
      <li><a class="dropdown-item disabled" href="#">Runtime: ${clickedMovie[0].runtime} min</a></li>
      <li><a class="dropdown-item disabled" href="#">Budget: USD ${clickedMovie[0].budget}</a></li>
      <li><a class="dropdown-item disabled" href="#">Revenue: USD ${clickedMovie[0].revenue}</a></li>
    </ul>
  </div>`
  }
  

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