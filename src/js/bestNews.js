import '../scss/styles.scss';
import loadingNews from '../components/loadingNews/loading.js';
import loadingButton from '../components/loadingButton/loading.js';
import loadMoreButton from '../components/loadMoreButton/button.js';
document.body.prepend(loadingNews());
const _ = require("lodash");
const axios = require('axios');
const { doc } = require("prettier");



/* Decidere se avere varie pagine html oppure cambiare quella attuale nel momento in cui si cliccano i tasti last o best. */



/* DA FIXARE */
/*- Mettere data value con il time in minutes, ogni volta aumenta di 1 e si fanno i vari check */
/*Ma se invece di quello che ho fatto facessi semplicemente, ogni minuto, prendo per ogni news il news time, faccio adesso - newsTime = differenza di tempo, poi la formatto e basta. */




let newsArray = [];
let newsLoaded = 0;
let newsHtmlElemsArray =[];


let checkArray = []
let latestFetchArray =[]


let minutesPassed = 0;

let loadMoreReady = false;

let loadingState = false; //True quando sta fetchando quindi caricando le 10 news, per poi mostrare il pulsante loadMore

let timeCount = 0;

let notSortedNews = []

let nextFetchedDatas = []

//FIXARE
//preparando prima le prossime news da mostrare, l'orario è sbagliato
//soluzione potrebbe essere creare le news solamente dopo che è stato clickato il pulsante, invece che prima, tanto è il fetch la parte che prende più tempo


const loadMoreBtn = loadMoreButton();
loadMoreBtn.addEventListener('click',()=>{
    if (loadingState == false){
        
        showNews();
        
    }
    
    
});
const loadingBtn = loadingButton();





const bestNewsApi = process.env.BEST_NEWS_API;
const newsInfoApi = process.env.NEWS_INFO_API;





function insertButton(){
    const btnDiv = document.querySelector('.btn-div');
    btnDiv.appendChild(loadMoreBtn);
    console.log('insertbuttone');
}



function createTitle(){
    let titleH1 = document.createElement('h1');
    titleH1.innerHTML = 'Best <span>Hacker</span>News';
    let titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';
    titleContainer.appendChild(titleH1);
    document.body.prepend(titleContainer);
}





//Fetcha gli ID's delle news e li inserisce nel newsArray.
async function fetchNewsIds(){
    
    
    try{
        let response = await axios.get(bestNewsApi)
        newsArray = response.data;
        checkArray = newsArray;
        
    } catch (err){
        console.log('Errore: ',err);
    }
}

//Ogni minuto di ciclo, time +1, poi time +2, 
//Controlla se ci sono delle nuove news rispetto al fetch precedente




//Riceve un id come parametro, e esegue la call all'API. Poi in caso di successo, chiama createNews


//Scorre 10 elementi del news array e per ogni elemento chiama 
async function fetchTenNewsInfo(){
    loadingState = true;
    loadMoreBtn.replaceWith(loadingBtn);
    let btnLoad = document.querySelector('.btn-loadmore');
    if (btnLoad != null){
    }
    console.log('test');
    for (let i = 0; i<10; i++){
        
        try{    
            let newsLink = newsInfoApi + newsArray[newsLoaded] + '.json';
            let response = await axios.get(newsLink);
            //creare array in cui mettere le reposnse e dopo quando si clicca il coso createnews e shownews.
            if (response.data == null){
                console.log('News Vuota Trovata Carico Un Altra News',response);
                i--;
                
                continue;
            }else{
                console.log(response);
                newsLoaded++;
                console.log('News numero', newsLoaded, 'caricata');
                createNews(response,'end');
            }
            
        } catch (err){
            console.log('Errore: ',err);
        }
    }
}



function timeNumber(time){
    console.log(time);
    if (time>=0 && time<60){
        return time;
    }else if (time>=60 && time <60*24){
        time = Math.floor(time/60);
    }else if (time>=60*24 && time < 60*24*365){
        time = Math.floor(time/1440);
    }
    return time;
}



function timeString(time){
    let timeAgo='';
    if (time < 60){
        
        if (time == 1){
            timeAgo = 'minute ago'
        }else{
            timeAgo = 'minutes ago';
            
        }
        

    }else if (time < 60*24){
        time = Math.floor(time/60);
        if (time ==1){
            timeAgo = 'hour ago';
        }else{
            timeAgo = 'hours ago';
        }
        
    
    
    }else if (time < 60*24*365){
        time = Math.floor(time/1440);
        if (time == 1 ){
            timeAgo = 'day ago';
        }else{
            timeAgo = 'days ago';
        }
    }
    return timeAgo;
}


//Prende come parametri l'oggetto news e la posizione in cui va inserita. in pratica crea l'elemento HTML news.
function createNews(newsObject,position){
    
    
    
    let newsTitle = newsObject.data.title;
    let nowTime = new Date();
    
    let dateTime = new Date(newsObject.data.time*1000);
    
    let newsTime = Math.floor((Math.abs(nowTime - dateTime)/36e5)*60); //Valore in minuti
    let timeAgo = timeString(newsTime);
    let timeNum = timeNumber(newsTime);
    
    

    
    
    let newsAuthor = newsObject.data.by;
    let newsUrl= newsObject.data.url;
    let newsScore = newsObject.data.score;
    let newsDiv = document.createElement('div');

    newsDiv.value = 0;

    newsDiv.className = 'news';
    newsDiv.innerHTML = `<h2><b><a href="${newsUrl}">${newsTitle}</a></b></h2><p>By <i>${newsAuthor}</i> <span class='news-time' data-time='${dateTime}'>${timeNum}</span><span class='time-ago'> ${timeAgo}</span></p><p> </p><p><b>${newsScore} points</b></p>`;
    if (position == 'end'){
        newsHtmlElemsArray.push(newsDiv);
    }else if (position =='start'){
        console.log('Ora pubblicazione',dateTime);
        timeAgo = '0';
        return newsDiv;
    }
    /*newsContainer.appendChild(newsDiv);*/
    if (newsLoaded%10==0){
        //Caricate le prime 10 notizie, inserisci il button
        if (newsLoaded == 10){
            insertButton();
        }
        if (loadMoreReady == false){
            loadMoreReady = true;
            showNews();
            
        }
        loadingState=false;        
        loadingBtn.replaceWith(loadMoreBtn);
        console.log('ci vado');
    }
    
    
}

//Aggiorna il timer delle news fetchate ma non ancora mostrate, visto che attualmente le news che vengono aggiornate minuto per minuto sono
//Solo quelle visibili, si potrebbe fixare anche avendo un array delle news mostrate + quelle fetchate, e ogni minuto vengono aggiornate tutte


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


            /*Creare array in cui inserire gli attuali news ids, poi ad un secondo fetch
             (ogni minuto) controlliamo se nel secondo fetch ci sono id nuovi, tipo checko
              se l'ultima del secondo fetch è già nel primo fetch, se no la aggiungo, finchè
               non ne trovo una già presente e lì mi fermo visto che da qua in poi tutte sono uguali

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



