
import './styles.scss';

function loadingBtn(){
    const parentDiv = document.createElement('div');
    parentDiv.className = 'spinner-parent';
    const spinnerDiv = document.createElement('div');
    spinnerDiv.className = 'spinner';
    spinnerDiv.innerHTML = '<div></div><div></div><div></div><div></div><div></div><div></div>'
    parentDiv.appendChild(spinnerDiv);
    return parentDiv;
}

export default loadingBtn;