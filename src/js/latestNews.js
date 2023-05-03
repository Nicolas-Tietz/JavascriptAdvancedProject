import '../scss/styles.scss';
import loadingNews from '../components/loadingNews/loading.js';


import { fetchTenNewsInfo,insertTitle,fetchNewsIds,newsCheck } from './shared.js';


 
window.onload = function(){
    //Creo titolo
    insertTitle();

    

    //Fetcho news Ids
    fetchNewsIds('latest');
    //Creo l'array con le 10 news e le mostro direttamente solo alla prima esecuzione
    fetchTenNewsInfo('latest');

    setTimeout(setInterval(newsCheck,60*1000),60*1000);
    
    

    
    
    
    
    
    
}



