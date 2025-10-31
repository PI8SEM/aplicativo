const slide = document.querySelector('.carrossel-slide');
const imagens = document.querySelectorAll('.carrossel-slide img');
const btnPrev = document.querySelector('.carrossel-btn.prev');
const btnNext = document.querySelector('.carrossel-btn.next');

let index = 0;
const totalImagens = imagens.length;

function atualizarSlide() {
    slide.style.transform = `translateX(${-index * 100}%)`;
}

btnNext.addEventListener('click', () => {
    index++;
    if (index >= totalImagens) {
        index = 0;
    }
    atualizarSlide();
});

btnPrev.addEventListener('click', () => {
    index--;
    if (index < 0) {
        index = totalImagens - 1;
    }
    atualizarSlide();
});

setInterval(() => {
    btnNext.click(); 
}, 5000); 


const btnMenu = document.getElementById('menu-hamburguer');
const menuLateral = document.getElementById('menu-lateral');

btnMenu.addEventListener('click', () => {
    menuLateral.classList.toggle('aberto');
});