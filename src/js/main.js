import loadingNews from '../components/loadingNewsCube/loading.js';
import loadingButton from '../components/loadingButtonCube/loading.js';
import loadMoreButton from '../components/loadMoreButton/button.js';
import mainTitle from '../components/title/title.js';
const latestNewsApi = process.env.LATEST_NEWS_API;
const bestNewsApi = process.env.BEST_NEWS_API;
const newsInfoApi = process.env.NEWS_INFO_API;
require('dotenv').config()
const _ = require("lodash");
const axios = require('axios');
const { doc } = require("prettier");

const firstLoadingCube = loadingNews();

document.body.prepend(firstLoadingCube);

let newsArray = [];
let checkArray = []


let latestFetchArray = [];
let newsLoaded = 0;
let newsHtmlElemsArray =[];
let notSortedNews = [];
let newsType;

const newsContainer = document.getElementById('container-news');

const btnDiv = document.querySelector('.btn-div');

const loadingWheelBtn = loadingButton();

const loadMoreBtn = loadMoreButton();
loadMoreBtn.addEventListener('click',()=>{
    
    updateTime('loaded');
    showNews('tenNewsFetch');
        
    
    
    
});

//Updates the time ago of 'showed news' or 'loaded but not showed' news

function updateTime(check){
    console.log(newsHtmlElemsArray);
    if (check == 'showed'){
        let timeSpan = document.querySelectorAll('.news-time');
        
        let agoSpan;
        let nowTime = new Date();
        //Updates time of all shown HTML elements
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
        //Updates time of the only loaded news
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

//Gets the value of 'timeago' in minutes and return the formatted the number
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

//Gets the value of 'timeago' in minutes and return the formatted string
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

//Fetches the news id's and saves them into an array
export async function fetchNewsIds(type){
    
    
    try{
        let response;
        newsType = type;
        if (newsType == 'latest'){
            console.log(latestNewsApi)
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







export function insertTitle(newsType){
    let title = '';
    if (newsType == 'best'){
        title = mainTitle('Best');
        
    }else if (newsType == 'latest'){
        title = mainTitle('Latest');
    }

    document.body.prepend(title);
}

















//Fetches the info of 10 news and calls createNews for every one of them

export async function fetchTenNewsInfo(){
    
    loadMoreBtn.replaceWith(loadingWheelBtn);
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





//Takes the newsObject and the position as parameters.
//If position == start -> the news will be added at the beginning of the newsContainer (used for minute fetched news)
//If position == end -> the news will be added at the end (used for the 10 loaded news)

function createNews(newsObject,position){
    
    let newsScore;
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

    newsDiv.classList.add('news','fade-in');
    if (position == 'end'){
        newsHtmlElemsArray.push(newsDiv);
    }else if (position =='start'){
        
        timeAgo = '0';
        return newsDiv;
    }
    
    if (newsLoaded%10==0){
        //Add button when the first 20 news are loaded
        if (newsLoaded == 20){
            btnDiv.appendChild(loadMoreBtn);
        }
        //Remove button after the first 10 news are loaded
        if (newsLoaded == 10){
            firstLoadingCube.style.display = 'none';
            
            showNews('tenNewsFetch');
        }
        
        loadingWheelBtn.replaceWith(loadMoreBtn);
            
    }
            
        
        
}

    
    
    
    


//Inserts the news into the HTML

function showNews(origin){
    if (origin == 'tenNewsFetch'){
        for (let news of newsHtmlElemsArray){

            
            newsContainer.appendChild(news);

        }


        newsHtmlElemsArray = [];
        
        
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
    else if (origin == 'minuteFetch'){
        console.log('notsorted',notSortedNews);
        
        for (let news of notSortedNews.reverse()){
            newsContainer.insertAdjacentElement("afterbegin",news);
    
        }
        
        notSortedNews = []
    }
    
   


   


}





// ---------------------Latest News Only Functions----------------------------



//Checks for news added compared to the latest and calls fetchNewsInfo for all of them
export async function newsCheck(){
    try{
        
        updateTime('showed');
        
        
        let response = await axios.get(latestNewsApi)
        latestFetchArray = response.data;
        
        for (let news of latestFetchArray){
        
            if (!(checkArray.includes(news))){
                
                fetchNewsInfo(news);
                
            }else{
                break;
            }

        }
        
        
        
        
        showNews('minuteFetch');
        checkArray = latestFetchArray;
    } catch (err){
        console.log('Errore: ',err);
    }
    
    
}



//Fetches the news info and pushes it into an array

async function fetchNewsInfo(news){
    let newsLink = newsInfoApi + news + '.json';
    let response = await axios.get(newsLink);
    
    
    if (response.data == null){
        
        return;
        
        
    }else{
        let div = createNews(response,'start');
        
        notSortedNews.push(div);
        
        
    }
    
}


