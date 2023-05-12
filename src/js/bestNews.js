
import '../scss/styles.scss';

import { fetchTenNewsInfo,insertTitle,fetchNewsIds } from './main.js';

 
window.onload = function(){

    insertTitle('best');

    fetchNewsIds('best');
    
    fetchTenNewsInfo('best');


}



