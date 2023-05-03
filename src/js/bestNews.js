
import '../scss/styles.scss';


import { } from './shared.js';
import { fetchTenNewsInfo,insertTitle,fetchNewsIds } from './shared.js';






 
window.onload = function(){
    //Creo titolo
    insertTitle();

    

    //Fetcho news Ids
    fetchNewsIds('best');
    //Creo l'array con le 10 news e le mostro direttamente solo alla prima esecuzione
    
    fetchTenNewsInfo('best');


    
    
}



