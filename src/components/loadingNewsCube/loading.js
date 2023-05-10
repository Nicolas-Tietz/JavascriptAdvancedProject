
import './styles.scss';

function loadingBtn(){
    const spinnerDiv = document.createElement('div');
    spinnerDiv.className = 'spinner';
    spinnerDiv.innerHTML = '<div></div><div></div><div></div><div></div><div></div><div></div>'
    
    return spinnerDiv;
}

export default loadingBtn;