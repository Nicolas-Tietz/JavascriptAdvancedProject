import loadingBtnImg from './loading.gif';
import './styles.scss';

function loadingBtn(){
    const loadingBtnDomImg = new Image();
    loadingBtnDomImg.src = loadingBtnImg;
    loadingBtnDomImg.className = 'loading-btn';
    return loadingBtnDomImg;
}

export default loadingBtn;