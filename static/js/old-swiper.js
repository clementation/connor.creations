import Swiper, { Navigation, Pagination } from './swiper-bundle.min.js';

window.addEventListener('load', () =>{
    console.log("eh");
    const swiper = new Swiper('.swiper', {
        loop: true,

        pagination: {
            el: '.swiper-pagination',
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
});