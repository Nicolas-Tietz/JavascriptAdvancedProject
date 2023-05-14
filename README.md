# <img src="https://github.com/Nicolas-Tietz/JavascriptAdvancedProject/assets/120263952/144fd575-36b1-45cd-bc7c-b22a502cf43c" width="25">  HackerNews Fetcher

![HTML](https://img.shields.io/badge/HTML-orange?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WEBPACK](https://img.shields.io/badge/WEBPACK-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
![NODEJS](https://img.shields.io/badge/NODE_JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

<i><b>Link to the Live Project <a href="https://hackernewsfetcher.netlify.app/">HackerNews Fetcher</a></b></i>

## About The Project

This project has been made to better understand APIs and how they work. For this particular case, we used the Best and Latest HackerNews APIs, to fetch the latest news and the best.



The project has 2 pages:
- One for the Best News, ordered by their score.
- One for the Latest News ordered by their publish time.

### Usage


The <b>Best News</b> page, shows the first 10 news with the higher score. By clicking the Load More button, 10 more news will appear. The limit is 200 news.


The same thing goes for the <b>Latest News</b> page, except for 2 additional features.
- The news publish time updates as the minutes pass
- Every minute the page gets updated with any latest news


### <img src="https://github.com/Nicolas-Tietz/JavascriptAdvancedProject/assets/120263952/e639caa0-e35e-49ea-b5ae-ca2d189c87f7" width="25"> Libraries

- Axios
- Lodash


### How It Works | Latest & Best News

1. On page load, the best/latest news IDs are fetched from the API
2. For each one of the first 10 news, there is another API call to get their infos
3. With the fetched infos the news elements are created and once 10 news are ready, they will appear.
4. The fetch of the next 10 news starts immediately after, so that on button click they just get added and there is no waiting for the fetch.

 #### Latest News Only
 
 5. Every minute there is another fetch of the news ids. After being compared with the latest fetch, if there are new IDs, the news will get fetched and added on top of the page.
 6. The publish time gets updated as minutes passes


### Screenshots 
<p align="left">
    <img src="https://github.com/Nicolas-Tietz/JavascriptAdvancedProject/assets/120263952/a21847eb-85e1-42fd-a9b3-493fe2877079" width="70%" >  

</p>

<p align="left">
    <img src="https://github.com/Nicolas-Tietz/JavascriptAdvancedProject/assets/120263952/c461b7e6-d1d9-40e8-af4f-8fe15d827ed6" width="70%" >  

</p>


## <img src="https://github.com/Nicolas-Tietz/JavascriptAdvancedProject/assets/120263952/1a97ff89-6048-4f5c-85ac-df77f18c8578" width='25px'> Contact

From <a href="https://nicolas-tietz.github.io/contact-me/">Portfolio Website</a>

or Email : nicolastietz48@gmail.com





## License

Distributed under the MIT License.