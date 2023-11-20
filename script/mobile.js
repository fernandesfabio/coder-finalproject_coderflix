/* Navbar */
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


/* Açoões botões scroll, rolagem imagens */

const initSlider = () => {
    const imageList= document.querySelector('[data-slide="list"]');
    const slideButtons = document.querySelectorAll('[data-slide="slide-btn"]');
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
    });
}
window.addEventListener("load", initSlider);
