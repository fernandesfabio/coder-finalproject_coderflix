// MENU MOBILE //

window.addEventListener("scroll", function(){
    let header = this.document.querySelector('#header');
    header.classList.toggle('rolagem',window.scrollY > 0);
})

/*Menu Mobile*/
let bntMenu = document.getElementById('btn--open')
let menu = document.getElementById('menu--mobile')
let overlay = document.getElementById('overlay--menu')

bntMenu.addEventListener('click', ()=>{
    menu.classList.add('open--menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('open--menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('open--menu')
})



// TMDB API //

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTM2ZmM4YTAwZDgyODc1MTFiYWFjMDUwM2U1NTg1NCIsInN1YiI6IjY1NjI4MzRlMzY3OWExMDk3N2UwY2ZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dOmmZZ_EakO2qkVa6JMZqC-ijgO5UY_CZaXdoeUk0U0'
    }
  };
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  const container = document.getElementById('movies--container');
  const form = document.getElementById('form');
  const search = document.getElementById('search');
  
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=1&sort_by=popularity.desc', options)
    .then(res => res.json())
    .then(data => showBox(data.results) )
    


function showBox(data) {
    container.innerHTML = '';
    data.forEach(box => {
        const {title, poster_path, vote_average, overview, id} = box;
        const boxEl = document.createElement('div');
        boxEl.classList.add('box');
        boxEl.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}" />

            <div class="box--info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="box--overview">
                
                <h3>Sinopse</h3><br>
                ${overview} <br>
                <button class="know-more" id="${id}">Veja Mais</button>
            </div>
        `

        container.appendChild(boxEl);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav(box);
        })
    })
}

const overlayContent = document.getElementById('overlay-content')
/* Open when someone clicks on the span element */
function openNav(box) {
    let id = box.id;
    fetch('https://api.themoviedb.org/3'+'/movie/'+id +'/videos', options).then(res => res.json())
    .then(videoData => {
        console.log(videoData);
        if(videoData){
            document.getElementById("myNav").style.width = "100%";
            if(videoData.results.length > 0){
                let embed = [];
                videoData.results.forEach(video => {
                    let {name, key, site} = video

                    if(site == 'YouTube'){
                        embed.push(`
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        
                        `)
                    }
                })

                overlayContent.innerHTML = embed.join('');
            }else{
                overlayContent.innerHTML = `<h1 class="no-results">Video Não disponivel</h1>`
            }
        }
    })
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

function getColor(vote){
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}