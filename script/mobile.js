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




const initSlider = () => {
    const imageList= document.querySelector('[data-slide="list"]');
    const slideButtons = document.querySelectorAll('[data-slide="slide-btn"]');

    slideButtons.forEach(button => {
    button.addEventListener("click", () => {
        const direction = button.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
    });
}

window/addEventListener("load", initSlider)

