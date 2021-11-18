
//save popular movie button in el
let popButton = document.getElementById('movies')

//store image of movie in el
const moviePoster = 'https://image.tmdb.org/t/p/w200';

//create empty arrays to result and add favorites
// let favMovies = [];
let arr = [];
let newArr = [];

//set page for movie search
let page = 1;

//add event listener to popButton
popButton.addEventListener('click', () => {

  //fetch popular movies
  fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc12b5e66ca8041bee3984a2f0e2c95e&page=${page}`)
  .then(res => (res.json())
  .then(function (data) {
    arr = data.results.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    })

    //if arr is values, stack new movies in new arr
    if (arr.length > 10) {
      newArr = newArr.concat(arr);
    }
    console.log("arr", arr)
    console.log("new arr", newArr)
    
    page++;
    displayArr(arr)

  }))
})


function displayArr(newArr) {
    
    //loop through results and capture each piece of data I need and console log it
    for (let i = 0; i < newArr.length; i++) {
      
      //create each el I need to store data in a serve to front end
      let movieEl        = document.createElement('div');
      let movieImg      = document.createElement('img');
      let movieTitle     = document.createElement('h3');
      let movieDate      = document.createElement('p');
      let movieOverview  = document.createElement('div');
      let movieFav       = document.createElement('button');

      //create main card for movies
      movieEl.setAttribute('class', 'movie-card');
      movieEl.setAttribute('onclick', 'showOverview(el)');

      //set class on img els and set url as src attr
      movieImg.setAttribute('class', 'movie-img');
      // movieImg.setAttribute('style', `background-image: url(${moviePoster + newArr[i].poster_path})`);
      movieImg.setAttribute('src', `${moviePoster + newArr[i].poster_path}`)
      
      //set class on h3 title el and change text to title
      movieTitle.setAttribute('class', 'movie-title');
      movieTitle.innerHTML = newArr[i].title;

      //set class on p date el and change text to date
      movieDate.setAttribute('class', 'movie-date');
      movieDate.innerHTML = `Release Date: ${newArr[i].release_date}`;

      // set class on div overview el and change text to overview
      movieOverview.setAttribute('class', 'movie-overview');
      movieOverview.style.display = 'none';
      movieOverview.innerHTML = newArr[i].overview;

      //set class on button fave and change text to add to fav
      // movieFav.setAttribute('class', 'favorite');
      // movieFav.innerHTML = 'Add to Favorites'

      //append all els to main movie element
      let main = document.getElementById('movie-content');
      main.appendChild(movieEl);
      movieEl.appendChild(movieImg);
      movieEl.appendChild(movieTitle);
      movieEl.appendChild(movieDate);
      movieEl.appendChild(movieOverview);
  }
}

//clear movies from page to prepare for new sort
function clearMovies() {
  let removeEl = document.getElementById('movie-content')
  removeEl.innerHTML = '';
}

//sort movies based on user selections in dropdowns
function filterMovies() {
  //set vars for filter and order values
  let f = document.getElementById("filter").value;
  let o = document.getElementById("order").value;

  //conditional statement to determine what filter options are selected
  if (f == 'year' && o == 'ascend') {
    //sort array
    let ascendArrByYear = newArr.sort(function(a, b) {
      //convert Date format
      aDate = new Date(a.release_date);
      bDate = new Date(b.release_date);
      //compare values and sort arr correctly
      return aDate - bDate;
    })
    clearMovies();
    displayArr(ascendArrByYear);
  } else if (f == 'year' && o == 'descend') {
    let descendArrByYear = newArr.sort(function(a, b) {
      aDate = new Date(a.release_date);
      bDate = new Date(b.release_date);
      return bDate - aDate;
    })
    clearMovies();
    displayArr(descendArrByYear);
  } else if (f == 'title' && o == 'ascend') {
    let ascendArrByTitle = newArr.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    })
    clearMovies();
    displayArr(ascendArrByTitle);
  } else {
    let descendArrByTitle = newArr.sort(function(a, b) {
      return b.title.localeCompare(a.title);
    })
    clearMovies();
    displayArr(descendArrByTitle);
  }
}

//show overview card w/ text when movie-card clicked
function showOverview(el) {
  //create div to show overview text and set attrs
  let overviewEl = document.createElement('div');
  overviewEl.setAttribute('id', 'overview-text');
  overviewEl.setAttribute('onclick', 'closeOverview(this)');

  //capture text from movie-card clicked and set it on el
  let overviewText = el.childNodes[3].innerHTML;
  overviewEl.innerHTML = overviewText
  document.body.appendChild(overviewEl);

}

//close overview card when clicked
function closeOverview(el) {
  //delete overview element from html
  document.body.removeChild(el);

}

//set var with current page
// let currentPage = 1;

// //if user clicks Next, show 10 more results
// function next() {
//   currentPage++;
//   console.log(currentPage);
// }

// //if user clicks Back, show previous 10 results
// function back(){
//   if (currentPage === 1) {
//     console.log(currentPage);
//   } else {
//     console.log(currentPage--);
//   }
// }
