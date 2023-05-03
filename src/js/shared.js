import loadingNews from '../components/loadingNews/loading.js';
import loadingButton from '../components/loadingButton/loading.js';
import loadMoreButton from '../components/loadMoreButton/button.js';
import mainTitle from '../components/title/title.js';
const latestNewsApi = process.env.LATEST_NEWS_API;
const bestNewsApi = process.env.BEST_NEWS_API;
const newsInfoApi = process.env.NEWS_INFO_API;

const _ = require("lodash");
const axios = require('axios');
const { doc } = require("prettier");

document.body.prepend(loadingNews());

let newsArray = [];

let checkArray = []





let loadMoreReady = false;

let latestFetchArray = [];
let newsLoaded = 0;
let newsHtmlElemsArray =[];
let notSortedNews = [];
let newsType;

const loadMoreBtn = loadMoreButton();
loadMoreBtn.addEventListener('click',()=>{
    
    updateTime('loaded');
    showNews();
        
    
    
    
});

//Functions for time

function updateTime(check){
    console.log(newsHtmlElemsArray);
    if (check == 'showed'){
        let timeSpan = document.querySelectorAll('.news-time');
        
        let agoSpan;
        let nowTime = new Date();
        
        for (let span of timeSpan){
            
            let publishTime = new Date(span.getAttribute('data-time'));
            
            let newsTime = Math.floor((Math.abs(nowTime - publishTime)/36e5)*60); //Valore in minuti
            let timeAgo = formatTimeString(newsTime);
            let timeNum = formatTimeNumber(newsTime);
            
            console.log(span);
            
            span.innerHTML ='';
            span.innerHTML = timeNum;
            
            
            agoSpan = span.nextElementSibling;
            agoSpan.innerHTML = ' '+timeAgo;
    
            
            
        }
    }else if (check == 'loaded'){
        
        
        let agoSpan;
        let nowTime = new Date();
        
        for (let news of newsHtmlElemsArray){
            let span = news.getElementsByTagName('span')[0];
            let publishTime = new Date(span.getAttribute('data-time'));
            
            let newsTime = Math.floor((Math.abs(nowTime - publishTime)/36e5)*60); //Valore in minuti
            let timeAgo = formatTimeString(newsTime);
            let timeNum = formatTimeNumber(newsTime);
            
            console.log(news); 
            
            span.innerHTML ='';
            span.innerHTML = timeNum;
            
            
            agoSpan = span.nextElementSibling;
            agoSpan.innerHTML = ' '+timeAgo;

            
            
        }
    }
    
    
    

}

function formatTimeNumber(time){
    if (time<60){
        return time;
    }else if (time <60*24){
        time = Math.floor(time/60)
    }else if (time < 60*24*365){
        time = Math.floor(time/1440);
    }
    return time;
}


function formatTimeString(time){
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


export async function fetchNewsIds(type){
    
    
    try{
        let response;
        newsType = type;
        if (newsType == 'latest'){
            response = await axios.get(latestNewsApi);
            checkArray = response.data;

        }else if (newsType == 'best'){
            response = await axios.get(bestNewsApi);
        }
        
        newsArray = response.data;
        
        
    } catch (err){
        console.log('Errore: ',err);
    }
}




const btnDiv = document.querySelector('.btn-div');





const loadingWheel = loadingButton();


export function insertTitle(){
    const title = mainTitle('Best');
    document.body.prepend(title);
}





function insertButton(){
    
    btnDiv.appendChild(loadMoreBtn);
    
}







//Fetcha gli ID's delle news e li inserisce nel newsArray.


//Ogni minuto di ciclo, time +1, poi time +2, 
//Controlla se ci sono delle nuove news rispetto al fetch precedente




//Riceve un id come parametro, e esegue la call all'API. Poi in caso di successo, chiama createNews


//Scorre 10 elementi del news array e per ogni elemento chiama 
export async function fetchTenNewsInfo(){
    
    loadMoreBtn.replaceWith(loadingWheel);
    let btnLoad = document.querySelector('.btn-loadmore');
    if (btnLoad != null){
    }
    
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
                
                newsLoaded++;
                
                createNews(response,'end',newsType);
            }
            
        } catch (err){
            console.log('Errore: ',err);
        }
    }
    
    
}






//Prende come parametri l'oggetto news e la posizione in cui va inserita. in pratica crea l'elemento HTML news.
function createNews(newsObject,position){
    
    let newsScore = '';
    let newsDatas = _.get(newsObject,'data');
    let newsTitle = _.get(newsDatas,'title');
    let nowTime = new Date();
    
    let dateTime = new Date(newsDatas.time*1000);
    
    let newsTime = Math.floor((Math.abs(nowTime - dateTime)/36e5)*60); //Valore in minuti
    let timeAgo = formatTimeString(newsTime);
    let timeNum = formatTimeNumber(newsTime);
    
    

    
    
    let newsAuthor = _.get(newsDatas,'by');
    let newsUrl= _.get(newsDatas,'url');
    
   
    let newsDiv = document.createElement('div');

    if (newsType == 'best'){
        newsScore = _.get(newsDatas,'score');
        newsDiv.innerHTML = `<h2><b><a href="${newsUrl}">${newsTitle}</a></b></h2><p>By <i>${newsAuthor}</i> <span class='news-time' data-time='${dateTime}'>${timeNum}</span><span class='time-ago'> ${timeAgo}</span></p><p> </p><p><b>${newsScore} points</b></p>`;

    }else if (newsType == 'latest'){
        newsDiv.innerHTML = `<h2><b><a href="${newsUrl}">${newsTitle}</a></b></h2><p>By <i>${newsAuthor}</i> <span class='news-time' data-time='${dateTime}'>${timeNum}</span><span class='time-ago'> ${timeAgo}</span></p><p> </p>`;

    }

    newsDiv.className = 'news';
    if (position == 'end'){
        newsHtmlElemsArray.push(newsDiv);
    }else if (position =='start'){
        
        timeAgo = '0';
        return newsDiv;
    }
    /*newsContainer.appendChild(newsDiv);*/
    if (newsLoaded%10==0){
        //Caricate le prime 10 notizie, inserisci il button
        if (newsLoaded == 20){
            insertButton();
        }
        if (newsLoaded == 10){
            showNews();
        }
        if (newsLoaded == 20){
            insertButton();
        }
        loadingWheel.replaceWith(loadMoreBtn);
            
    }
            
        
        
}

    
    
    
    


//Aggiorna il timer delle news fetchate ma non ancora mostrate, visto che attualmente le news che vengono aggiornate minuto per minuto sono
//Solo quelle visibili, si potrebbe fixare anche avendo un array delle news mostrate + quelle fetchate, e ogni minuto vengono aggiornate tutte


//Prende gli elementi da newsHtmlElemsArray, li inserisce nel DOM e una volta inseriti svuota l'array.
function showNews(){
    updateTime('showed');
    for (let news of newsHtmlElemsArray){

        let newsContainer = document.getElementById('container-news');
        newsContainer.appendChild(news);

    }


    newsHtmlElemsArray = [];
    let loadingGif = document.querySelector('.loading');
    loadingGif.style.display = 'none';
    if (newsType == 'best'){
        if (newsLoaded == 200){
            btnDiv.style.display = 'none';
            return;
        }
        fetchTenNewsInfo('best');

    }else if (newsType == 'latest'){
        if (newsLoaded == 500){
            btnDiv.style.display = 'none';
            return;
        }
        fetchTenNewsInfo('latest');
    }
    
    
   


   


}

//Latest Only Functions
export async function newsCheck(){
    try{
        
        updateTime('showed');
        let now = new Date();
        
        let response = await axios.get(latestNewsApi)
        latestFetchArray = response.data;
        
        for (let news of latestFetchArray){
        
            if (!(checkArray.includes(news))){
                
                addNews(news);
                
            }else{
                break;
            }

        }
        let newsContainer = document.getElementById('container-news');
        
        let sortedNews = notSortedNews.reverse();
        for (let news of sortedNews){
            newsContainer.insertAdjacentElement("afterbegin",news);

        }
        
        notSortedNews = []
        
        checkArray = latestFetchArray;
    } catch (err){
        console.log('Errore: ',err);
    }
    
    
}

async function addNews(news){
    let newsLink = newsInfoApi + news + '.json';
    let response = await axios.get(newsLink);
    
    
    if (response.data == null){
        console.log('News Vuota Trovata',response);
        
        
    }else{
        let div = createNews(response,'start','latest');
        
        notSortedNews.push(div);
        
        
    }
    
}


