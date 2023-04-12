import '../src/scss/styles.scss';
import loadingNews from './components/loadingNews/loading.js';
import loadingButton from './components/loadingButton/loading.js';
import loadMoreButton from './components/loadMoreButton/button.js';
document.body.prepend(loadingNews());
const _ = require("lodash");
const axios = require('axios');
const { doc } = require("prettier");

const loadMoreBtn = loadMoreButton();
const loadingBtn = loadingButton();

const btnDiv = document.querySelector('.btn-div');
btnDiv.insertAdjacentElement('afterbegin',loadMoreBtn)

const lastNewsApi = process.env.LAST_NEWS_API;
const newsInfoApi = process.env.NEWS_INFO_API;

let newsArray = [];
let newsLoaded = 0;
let newsHtmlElemsArray =[];
let cont = 0;

let loadingNext = false;
let loadingState = false;



    



function createTitle(){
    let titleH1 = document.createElement('h1');
    titleH1.innerHTML = 'Latest <span>Hacker</span>News';
    let titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';
    titleContainer.appendChild(titleH1);
    document.body.prepend(titleContainer);
}





//Fetcha gli ID's delle news e li inserisce nel newsArray.
async function fetchNewsIds(){
    
    newsArray = [];
    try{
        let response = await axios.get(lastNewsApi)
        newsArray = response.data;
    } catch (err){
        console.log('Errore: ',err);
    }
}


//Scorre 10 elementi del news array e per ogni elemento chiama 
async function fetchTenNewsInfo(){
    loadingState = true;

    let btnLoad = document.querySelector('.btn-loadmore');
    if (btnLoad != null){
        btnLoad.replaceWith(loadingBtn);
    }
    console.log('test');
    for (let i = 0; i<10; i++){
        
        try{    
            let newsLink = newsInfoApi + newsArray[newsLoaded] + '.json';
            let response = await axios.get(newsLink);
            if (response.data == null){
                console.log('News Vuota Trovata Carico Un Altra News',response);
                i--;
                
                continue;
            }else{
                console.log(response);
                newsLoaded++;
                console.log('News numero', newsLoaded, 'caricata');
                createNews(response);
            }
            
        } catch (err){
            console.log('Errore: ',err);
        }
    }
}







function createNews(newsObject){
    console.log(newsObject);
    console.log('news numero',newsLoaded,'caricata');
    
    let newsTitle = newsObject.data.title;
    let nowTime = new Date();
    
    let dateTime = new Date(newsObject.data.time*1000);
    let newsTime = Math.floor((Math.abs(nowTime - dateTime)/36e5)*60);
    let timeAgo = '';
    
    if (newsTime < 60){
        
        if (newsTime == 1){
            timeAgo = 'minute ago'
        }else{
            timeAgo = 'minutes ago';
            
        }
        

    }else if (newsTime < 60*24){
        newsTime = Math.floor(newsTime/60);
        if (newsTime ==1){
            timeAgo = 'hour ago';
        }else{
            timeAgo = 'hours ago';
        }
        
    
    
    }else if (newsTime < 60*24*365){
        newsTime = Math.floor(newsTime/1440);
        if (newsTime == 1 ){
            timeAgo = 'day ago';
        }else{
            timeAgo = 'days ago';
        }
    }
    
    let newsAuthor = newsObject.data.by;
    let newsUrl= newsObject.data.url;
    let newsDiv = document.createElement('div');
    newsDiv.className = 'news';
    newsDiv.innerHTML = `<h2><b><a href="${newsUrl}">${newsTitle}</a></b></h2><p>By <i>${newsAuthor}</i> ${newsTime} ${timeAgo}</p><p> </p><p></p>`;
    newsHtmlElemsArray.push(newsDiv);
    
    /*newsContainer.appendChild(newsDiv);*/
    if (newsLoaded%10==0){
        if (loadingNext == false){
            loadingNext = true;
            showNews();
            
        }
        loadingState=false;        
        
        console.log('ci vado');
        loadingBtn.replaceWith(btnLoad);
    }
    
    
}

//Prende gli elementi da newsHtmlElemsArray, li inserisce nel DOM e una volta inseriti svuota l'array.
function showNews(){
    for (let news of newsHtmlElemsArray){
        let newsContainer = document.getElementById('container-news');
        newsContainer.appendChild(news);


    }


    newsHtmlElemsArray = [];
    let loadingGif = document.querySelector('.loading');
    loadingGif.style.display = 'none';
    fetchTenNewsInfo();
   


   


}


/*     console.log('Titolo',newsTitle,'Data',newsDate,'Tipologia',newsType,'Link',newsUrl); 
        el.appendChild(child);
        array.push(el);
 */


/* IDEA INTERESSANTE : UNA FUNZIONE FETCHA I DATI E LI METTE DA QUALCHE PARTE PRONTI PER ESSERE PUSHATI NEL DOM
 COSì QUANDO VIENE CLICCATO LOAD MORE, VENGONO MOSTRATE LE NOTIZIE GIà SCARICATE E INIZIA A SCARICARE LE 10 SUCCESSIVE
 IN MODO DA NON DOVER ASPETTARE IL CARICAMENTO */



 
window.onload = function(){
    //Creo titolo
    createTitle();
    //Fetcho news Ids
    fetchNewsIds();
    //Creo l'array con le 10 news e le mostro direttamente solo alla prima esecuzione
    fetchTenNewsInfo();
    
    
    
    
    
    
}



