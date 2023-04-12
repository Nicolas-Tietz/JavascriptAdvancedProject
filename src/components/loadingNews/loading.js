import loadingImg from './loading.gif';
import './styles.scss';

function loading(){
    const loadingDomImg = new Image();
    loadingDomImg.src = loadingImg;
    loadingDomImg.className = 'loading';
    
    return loadingDomImg;
}


export default loading;