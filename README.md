# 🚀 HackerNews Fetcher

![HTML](https://img.shields.io/badge/HTML-orange?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WEBPACK](https://img.shields.io/badge/WEBPACK-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
![NODEJS](https://img.shields.io/badge/NODE_JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
## A working project showing the Best and Latest News fetched using HackerNews APIs

This project has been made to better understand APIs and how they work. For this particular case, we used the Best and Latest HackerNews APIs.
The website has only 2 pages: one for the Best News and other for the Lastest ones.


The project has 2 pages:
- One for the Best News, ordered by their score.
- One for the Latest News ordered by their publish time.

### Best News

The Best News page, shows the first 10 news with the higher score. By clicking the Load More button, 10 more news will appear. The limit is 200 news.

![BestNews](https://github.com/Nicolas-Tietz/JavascriptAdvancedProject/assets/120263952/a21847eb-85e1-42fd-a9b3-493fe2877079)


### Latest News

The same thing goes for the Latest News page, except for 2 additional features.
- The news publish time updates as the minutes pass
- Every minute there is a new fetch to see if there are any news added compared to the latest fetch. If so, they get added on top.


![LatestNews](https://github.com/Nicolas-Tietz/JavascriptAdvancedProject/assets/120263952/062a876a-dafe-4a8c-8b0e-8276838e56e3)


#### News Getting Added from the minute fetch

![NewsAdded](https://github.com/Nicolas-Tietz/JavascriptAdvancedProject/assets/120263952/c461b7e6-d1d9-40e8-af4f-8fe15d827ed6)




### Languages Used

HTML
SASS
JS

### Libraries Used

Axios
Lodash

