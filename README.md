# 🚀 HackerNews Fetcher

## A simple project that fetches the best and latest news from HackerNews and shows them in the appropriate page.

This project has been made to better understand APIs and how they work. For this particular case, we used the Best and Latest HackerNews APIs.

## How It Works | Best News

First, there is a fetch of the Best News IDs. For each one of them, another API call is made to get the News Info and create the News Element.
When first opened, the page will start to load the News, and once done, the first 10 News will appear. After that, the next 10 News will also start to get fetched to avoid the waiting time when the Load More button is clicked. The button will instantly show the next 10 News that have already been prepared.


## How It Works | Latest News

The Latest News page works the same as the Best one, but with some additional functionalities. For example, every minute, the 'time ago' (element?string?) gets updated. At the same time, there will be another fetch, to check if some News were added during that minute. If the response is positive, the news will be added on top. 





