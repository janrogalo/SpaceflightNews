const articlesContainer = document.querySelector('.articlesContainer');
let saveArticleButtons = document.querySelectorAll(".addToLibrary");
let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];


function getNumberOfArticles(){
   let numberOfArticles = document.querySelector('#numberOfArticles');
    return numberOfArticles.value;
};

async function getNews(url) {
    await fetch(url)
        .then(d => d.json())
        .then(response => {
            response.forEach((article) => {
                let articleContent = articleCardContent(article);
                appendArticleCard(articleContent, article)
            });
            submit();
        });
}

function shortenSummary(string){
    if (string.length > 200){
    string = string.substring(0, 200);
    string += '...';
    }
    return string;
}

function formatDate(string){
    return new Date(string).toUTCString()
}

function articleCardContent(article) {
    let content = `<h3>${article.title}</h3>`;
    content += `<p>published at: <span class="publishedAt">${formatDate(article.publishedAt)}</span> by: <span class="newsSite">${article.newsSite}</span></p>`;
    content += `<hr><p class="summary">${shortenSummary(article.summary)}</p>`;
    content += `<a href="${article.url}"><button>Read more</button></a>`;
    return content;
}

function appendArticleCard(content, article){
    const newArticle = document.createElement("div");
    newArticle.classList.add('article');
    newArticle.innerHTML= content;
    newArticle.append(appendButton(article));
    articlesContainer.appendChild(newArticle);
}

function appendButton(article){
    const newButton = document.createElement("button");
    newButton.classList.add('addToLibrary');
    newButton.innerText = 'Add to library'

    if(savedArticles.length != 0){
        for (let i =0; i < savedArticles.length; i++){
            if (savedArticles[i].url == article.url) {
                buttonManipulation(newButton)
            }
        }
    }
    return newButton;
}



function controller() {
    const API_URL = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${getNumberOfArticles()}`;
    articlesContainer.innerHTML='';
    getNews(API_URL);
}

function submit(){
    saveArticleButtons = document.querySelectorAll(".addToLibrary");
    [... saveArticleButtons].forEach(function(button){

        button.addEventListener('click', function(e) {
            buttonManipulation(button);
            articleCard = e.target.parentElement;

            console.log()

            if(savedArticles.length != 0){

                for (let i =0; i < savedArticles.length; i++){

                    if (savedArticles[i].value == articleCard.innerHTML){
                        return;
                    }
                }
            }
            savedArticles.push({
                title: articleCard.querySelector('h3').innerText,
                publishedAt: Date.parse(articleCard.querySelector('.publishedAt').innerText),
                newsSite: articleCard.querySelector('.newsSite').innerText,
                summary: articleCard.querySelector('.summary').innerText,
                url: articleCard.querySelector('a').href,
            });

            localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
        });
    });
}


function buttonManipulation(button){
    button.classList.remove('addToLibrary');
    button.classList.add('removeFromLibrary');
    button.innerText = 'Remove from Library'
    button.onclick = function deleteArticle(index){
        savedArticles.splice(index, 1);
        localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
        button.classList.add('addToLibrary');
        button.classList.remove('removeFromLibrary');
        button.innerText = 'Add to library';
        button.onclick = submit();

    }
    return button;
}


controller();



