import './styles.scss';

function loadMoreButton(){
    const btn = document.createElement('button');
    btn.className = 'btn-loadmore';
    btn.innerHTML = 'Load More';
    btn.addEventListener('click',()=>{
        if (loadingState == false){
            
            showNews();
            loadingBtn.replaceWith(btnLoad);
        }
        
        
    });
    return btn;
}
export default loadMoreButton;