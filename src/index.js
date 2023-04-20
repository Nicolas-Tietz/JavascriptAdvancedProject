import '../src/scss/styles.scss';
import loadingNews from './components/loadingNews/loading.js';
import loadingButton from './components/loadingButton/loading.js';
import loadMoreButton from './components/loadMoreButton/button.js';
document.body.prepend(loadingNews());
const _ = require("lodash");
const axios = require('axios');
const { doc } = require("prettier");







/* DA FIXARE */
/*- Mettere data value con il time in minutes, ogni volta aumenta di 1 e si fanno i vari check */
/*Ma se invece di quello che ho fatto facessi semplicemente, ogni minuto, prendo per ogni news il news time, faccio adesso - newsTime = differenza di tempo, poi la formatto e basta. */




let newsArray = [];
let newsLoaded = 0;
let newsHtmlElemsArray =[];
let cont = 0;

let checkArray = []
let latestFetchArray =[]

let allNews = []

let minutesPassed = 0;

let loadingNext = false;
let loadingState = false;

let timeCount = 0;



const loadMoreBtn = loadMoreButton();
loadMoreBtn.addEventListener('click',()=>{
    if (loadingState == false){
        
        showNews();
        
    }
    
    
});
const loadingBtn = loadingButton();





const lastNewsApi = process.env.LAST_NEWS_API;
const newsInfoApi = process.env.NEWS_INFO_API;





function insertButton(){
    const btnDiv = document.querySelector('.btn-div');
    btnDiv.appendChild(loadMoreBtn);
    console.log('insertbuttone');
}



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
    
    
    try{
        let response = await axios.get(lastNewsApi)
        newsArray = response.data;
        checkArray = newsArray;
        allNews = newsArray;
    } catch (err){
        console.log('Errore: ',err);
    }
}

//Ogni minuto di ciclo, time +1, poi time +2, 
//Controlla se ci sono delle nuove news rispetto al fetch precedente
async function newsCheck(){
    try{
        minutesPassed++;
        updateTime();
        let now = new Date();
        console.log('Minute fetch started at',now);
        let response = await axios.get(lastNewsApi)
        latestFetchArray = response.data;
        
        for (let news of latestFetchArray){
        
            if (!(checkArray.includes(news))){
                console.log('newscheckato');
                addNews(news);
                
            }else{
                break;
            }

        }
        checkArray = latestFetchArray;
    } catch (err){
        console.log('Errore: ',err);
    }
    
    
}

async function addNews(news){
    let newsLink = newsInfoApi + news + '.json';
    let response = await axios.get(newsLink);
    console.log('inizio addnews entrato');
    if (response.data == null){
        console.log('News Vuota Trovata',response);
        
        
    }else{
        let div = createNews(response,'start');
        let newsContainer = document.getElementById('container-news');
        newsContainer.prepend(div);
    }
    
}


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

function updateTime(){

    let timeSpan = document.querySelectorAll('.news-time');
    let formattedNumber;
    let agoSpan;
    let nowTime = new Date();
    
    for (let span of timeSpan){
        
        let publishTime = new Date(span.getAttribute('data-time'));
        console.log(typeof(publishTime));
        let newsTime = Math.floor((Math.abs(nowTime - publishTime)/36e5)*60); //Valore in minuti
        let timeAgo = timeString(newsTime);
        let timeNum = timeNumber(newsTime);
        
        
        
        span.innerHTML ='';
        span.innerHTML = timeNum;
        
        
        agoSpan = span.nextElementSibling;
        agoSpan.innerHTML = ' '+timeAgo;

        
        
    }
    
    

}

function timeNumber(time){
    if (time<60){
        return time;
    }else if (time <60*24){
        time = Math.floor(time/60)
    }else if (time < 60*24*365){
        time = Math.floor(time/60*24);
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



function createNews(newsObject,position){
    console.log(newsObject);
    console.log('news numero',newsLoaded,'caricata');
    
    let newsTitle = newsObject.data.title;
    let nowTime = new Date();
    
    let dateTime = new Date(newsObject.data.time*1000);
    let newsTime = Math.floor((Math.abs(nowTime - dateTime)/36e5)*60); //Valore in minuti
    let timeAgo = timeString(newsTime);
    let timeNum = timeNumber(newsTime);
    
    if (position == 'end'){
        newsTime+=minutesPassed;
    }

    
    
    let newsAuthor = newsObject.data.by;
    let newsUrl= newsObject.data.url;
    let newsDiv = document.createElement('div');

    newsDiv.value = 0;

    newsDiv.className = 'news';
    newsDiv.innerHTML = `<h2><b><a href="${newsUrl}">${newsTitle}</a></b></h2><p>By <i>${newsAuthor}</i> <span class='news-time' data-time='${dateTime}'>${timeNum}</span><span class='time-ago'> ${timeAgo}</span></p><p> </p><p></p>`;
    if (position == 'end'){
        newsHtmlElemsArray.push(newsDiv);
    }else if (position =='start'){
        timeAgo = '0';
        return newsDiv;
    }
    /*newsContainer.appendChild(newsDiv);*/
    if (newsLoaded%10==0){
        //Caricate le prime 10 notizie, inserisci il button
        if (newsLoaded == 10){
            insertButton();
        }
        if (loadingNext == false){
            loadingNext = true;
            showNews();
            
        }
        loadingState=false;        
        loadingBtn.replaceWith(loadMoreBtn);
        console.log('ci vado');
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

    setTimeout(setInterval(newsCheck,60*1000),60*1000);
    
    

    
    
    
    
    
    
}



