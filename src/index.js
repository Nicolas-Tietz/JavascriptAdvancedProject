import '../src/scss/styles.scss';

const _ = require("lodash");
const axios = require('axios');
const { doc } = require("prettier");

const lastNewsApi = process.env.LAST_NEWS_API;
const newsInfoApi = process.env.NEWS_INFO_API;

let newsArray = [];
let newsLoaded = 0;
let newsTest;

function createTitle(){
    let titleH1 = document.createElement('h1');
    titleH1.innerHTML = 'Latest HackerNews';
    let titleContainer = document.querySelector('.title-container')
    titleContainer.appendChild(titleH1);
}





async function getNews(){
    newsArray = [];
    let response = await axios.get(lastNewsApi)
    newsArray = response.data;
    loadNews();    
}



async function loadNews(){
    
    console.log('test');
    for (let i = 0; i<10; i++){
        
            
        let newsLink = newsInfoApi + newsArray[newsLoaded] + '.json';
        let response = await axios.get(newsLink);
        console.log(response);
        newsLoaded++;
        console.log('News numero', newsLoaded, 'caricata');
        displayNews(response);
        
    }
}

async function loadMoreNews(){
    for (let i = 0; i<10; i++){
        
        let newsLink = newsInfoApi + newsArray[newsLoaded] + '.json';
        let response = await axios.get(newsLink);
        console.log(response);
        newsLoaded++;
        console.log('News numero', newsLoaded, 'caricata');


    }
}

function insertButton(){
    let btnDiv = document.createElement('div');
    btnDiv.className = 'btn-div';
    let btn = document.createElement('button');
    btn.className = 'btn-loadmore';
    btn.innerHTML = 'Load More';
    btnDiv.appendChild(btn);
    let newsContainer = document.getElementById('container-news');
    newsContainer.insertAdjacentElement('afterend',btnDiv);
    //Potrei fare che quando devono ancora caricare faccio display none poi dal momento in cui sono caricate tutte e 10 le displayio
}


function displayNews(newsObject){
    console.log(newsObject);
    console.log('news numero',newsLoaded,'caricata');
    
    let newsTitle = newsObject.data.title;
    let dateTime = new Date(newsObject.data.time*1000)
    let newsDate = dateTime.toDateString();
    let newsTime = dateTime.getHours()+':'+dateTime.getMinutes();
    
    let newsType =newsObject.data.type;
    let newsUrl= newsObject.data.url;
    let newsContainer = document.getElementById('container-news');
    let newsDiv = document.createElement('div');
    newsDiv.className = 'news';
    newsDiv.innerHTML = `<p><b>${newsTitle}</b></p><p>${newsDate}</p><p> ${newsTime}</p><p>${newsType}</p><p>${newsUrl}</p>`;
    newsContainer.appendChild(newsDiv);
    console.log(typeof(newsDate));
    
    
}
/*     console.log('Titolo',newsTitle,'Data',newsDate,'Tipologia',newsType,'Link',newsUrl); 
        el.appendChild(child);
        array.push(el);
 */


window.onload = function(){
    insertButton();
    createTitle();
    getNews();
}



