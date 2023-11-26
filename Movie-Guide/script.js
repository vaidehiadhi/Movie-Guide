const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox= document.querySelector('.inputBox');

// function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
    try{

    
    const myAPIKey = "961a0f3f";
    const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Unable  to fetch movie data");

    }
    const data =  await response.json();

    showMovieData(data);
}
catch (error){
    showErrorMessage("No Movie Found!")

}
}
//function to show movie data on screen

const showMovieData = (data) =>{
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;
    
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date:</strong>${Released}
                             <p><strong>Duration:</strong>${Runtime};
                             <p><strong>Cast:</strong>${Actors};
                             <p><strong>Plot:</strong>${Plot}`;

    //poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}
// display error 
const showErrorMessage = (message) =>{
    movieContainer.innerHTML = `<h2> Enter Movie Name to get Information</h2>`;
    movieContainer.classList.add('noBackground');
}
// adding even listener to search form
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        getMovieInfo(movieName);
    }
    else{
        movieContainer.innerHTML = `<h2> Enter Movie name to get movie information</h2>`
    }
});
