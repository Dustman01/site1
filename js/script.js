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
const element = document.createElement('ul');
function deletCinema(){
    console.log(element);
    const elements = element.querySelectorAll('li');
    elements.forEach((el, i) => {
        el.addEventListener('click', e =>{
            if(e.target.classList.contains('delete')){
                //getPost(http://localhost:3000/movies);
                console.log(i);
                el.remove();
              //  deletPost('http://localhost:3000/movies', i);
            }
        });
    });
    
}
function  renderInteractiveIist(){
    interactiveIist.innerHTML ='';
    element.innerHTML ='';
    element.classList.add('promo__interactive-list');
     getPost('http://localhost:3000/movies')
        .then(post => {
            let arr = [];
            Object.entries(post).forEach((val, key) =>{
                arr.push(val[1].name);
            });
            arr.sort();
            arr.forEach((el,i) =>{
                element.innerHTML += `
                    <li class="promo__interactive-item">${i+1}. ${el}
                        <div class="delete"></div>
                    </li>
                `;
            });
            interactiveIist.append(element);
            

            deletCinema();
            
            
            //return element;
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

const formCinema = document.querySelectorAll('.add');
const addingInput = document.querySelector('.adding__input');
 
function addCinema(formCinema){
    let cinema = {};
    let el;
    addingInput.addEventListener('input',e => {
        el = addingInput.value;
    });

    formCinema.addEventListener('submit', (e) =>{
        e.preventDefault();
        cinema.name = el;
        console.log(JSON.stringify(cinema));
        setPost('http://localhost:3000/movies', JSON.stringify(cinema))
            .then(e => {
                if(e.ok){
                    renderInteractiveIist();
                }
            })
            .catch(e => console.log('error'));
        
    });

}

formCinema.forEach(form =>{
     addCinema(form);
     });


async function setPost(url, json){
    const post = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: json
    });

    return await post;
}

function deletPost(url, id){
    fetch('http://localhost:3000/movies/' + id, {
        method: 'DELETE'
    })
    .then(res => res.json()) // or res.json()
    .then(res => console.log(res));
}
// 
