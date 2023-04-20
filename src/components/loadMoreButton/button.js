import './styles.scss';

function loadMoreButton(){
    const btn = document.createElement('button');
    btn.className = 'btn-loadmore';
    btn.innerHTML = 'Load More';
    
    return btn;
}

export default loadMoreButton;