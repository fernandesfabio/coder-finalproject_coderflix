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

const API_KEY = 'api_key=1e36fc8a00d8287511baac0503e55854'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/tv?include_adult=false&include_video=true&language=pt-BR&page=1&sort_by=popularity.desc&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = BASE_URL + '/search/tv?'+API_KEY;

  const container = document.getElementById('series--container');
  const form = document.getElementById('form');
  const search = document.getElementById('search');

  getSeries(API_URL)

function getSeries(url){
    fetch(url).then(res => res.json()).then(data => {
        showBox(data.results)
    })
}
function showBox(data) {
    container.innerHTML = '';
    data.forEach(box => {
        const {name, poster_path, vote_average, overview, id} = box;
        const boxEl = document.createElement('div');
        boxEl.classList.add('box');
        boxEl.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${name}" />

            <div class="box--info">
                <h3>${name}</h3>
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
    fetch(BASE_URL+'/movie/'+id +'/videos'+API_KEY).then(res => res.json())
    .then(videoData => {
        console.log(videoData);
        if(videoData){
            document.getElementById("myNav").style.width = "100%";
            if(videoData.results.length > 1){
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

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getSeries(SEARCH_URL+'&query='+searchTerm)
    }
} )