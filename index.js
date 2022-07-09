function getNumberOfArticles(){
   let numberOfArticles = document.querySelector('#numberOfArticles');
    return numberOfArticles.value;
};

async function getNews(url) {
    await fetch(url)
        .then(d => d.json())
        .then(response => {
           response.forEach((article)=>console.log(`${article.title}\n ${article.newsSite}\n ${article.publishedAt}\n ${article.summary}\n ${article.url}`))
        });
};

function controller(){
    const API_URL = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${getNumberOfArticles()}`;
    getNews(API_URL);
  // console.log(newsArray);





}


controller();












