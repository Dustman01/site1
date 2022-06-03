/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против...",
        "Адом"
    ]
};



const adv = document.querySelectorAll('.promo__adv img'); // получить рекламных блоков

const genre =document.querySelector('.promo__genre'); // получить элемент с жанром 

const bg = document.querySelector('.promo__bg');

const interactiveIist = document.querySelector('.promo__interactive-list');



// удаление рекламных блоков
// Изменить жанр фильма, поменять "комедия" на "драма"
function init(){
    adv.forEach(el => {
        el.remove();
    });

    genre.textContent = 'драма';

    bg.style.backgroundImage = 'url("img/bg.jpg")';

    
    movieDB.movies.sort();
}

init();

interactiveIist.innerHTML = '';


// 
function renderInteractiveIist(){

    getPost('http://localhost:3000/movies')
        .then(post => {
            post.sort();
            post.forEach((el,i) =>{
                interactiveIist.innerHTML += `
                    <li class="promo__interactive-item">${i+1}. ${el}
                        <div class="delete"></div>
                    </li>
                `;
            });
        });

}

renderInteractiveIist();

// function getPost(url){
//     const request = new XMLHttpRequest();

//     request.open('GET', url);
//     request.setRequestHeader('Content-type', 'application/json; charset:utf-8');
//     request.send();

//     request.addEventListener('load', () =>{
//         if(request.status == 200){
//             console.log(request.response);
//         } else{
//             console.log('error');
//         }
//     });
// }

async function getPost(url){
    const post = await fetch(url);
    return await post.json();
}





console.log('here');


