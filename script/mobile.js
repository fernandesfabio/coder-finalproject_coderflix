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