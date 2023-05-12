import '../scss/styles.scss';

import { fetchTenNewsInfo,insertTitle,fetchNewsIds,newsCheck } from './main.js';


 
window.onload = function(){

    insertTitle('latest');

    fetchNewsIds('latest');

    fetchTenNewsInfo('latest');

    setTimeout(setInterval(newsCheck,60*1000),60*1000);
    
}



