import './styles.scss';

function createTitle(category){
    const titleH1 = document.createElement('h1');
    titleH1.innerHTML = category+' <span>Hacker</span>News';
    let titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';
    titleContainer.appendChild(titleH1);
    return titleContainer;
}

export default createTitle;