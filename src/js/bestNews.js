
import '../scss/styles.scss';

import { fetchTenNewsInfo,insertTitle,fetchNewsIds } from './main.js';

 
window.onload = function(){

    insertTitle();

    fetchNewsIds('best');
    
    fetchTenNewsInfo('best');


}



