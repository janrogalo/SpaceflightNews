const articlesContainer = document.querySelector('.articlesContainer');
let saveArticleButtons = document.querySelectorAll(".addToLibrary");
let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

controller();


//main invocation of get news with the articlesContainer cleanup and API url
function controller() {
    const API_URL = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${getNumberOfArticles()}`;
    articlesContainer.innerHTML='';
    displayNews(API_URL);
}

//Read user input to get selected number of articles from the API
function getNumberOfArticles(){
    let numberOfArticles = document.querySelector('#numberOfArticles')
    let number = Number(numberOfArticles.value );
    return number
};

// Fetch data
async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Display News Data
async function displayNews(url){
    const articles = await getData(url);
    articles.forEach((article) => {
        appendArticleCard(articleCardContent(article), article);
    });
    saveToLocalStorage();
}


//Create content to be appended to article card
function articleCardContent(article) {
    let content = `<h3>${article.title}</h3>`;
    content += `<p>published at: <span class="publishedAt">${formatDate(article.publishedAt)}</span> by: <span class="newsSite">${article.newsSite}</span></p>`;
    content += `<p class="summary">${shortenSummary(article.summary)}</p>`;
    content += `<a href="${article.url}"><button>Read more</button></a>`;
    return content;
}

//Create button to be appended to article card
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

//Append article card to document
function appendArticleCard(content, article){
    const newArticle = document.createElement("div");
    newArticle.classList.add('article');
    newArticle.innerHTML= content;
    newArticle.append(appendButton(article));
    articlesContainer.appendChild(newArticle);
}

//saveToLocalstorage
function saveToLocalStorage(){
    saveArticleButtons = document.querySelectorAll(".addToLibrary");
    [... saveArticleButtons].forEach(function(button){

        button.addEventListener('click', function(e) {
            buttonManipulation(button);
            articleCard = e.target.parentElement;
            saveArticleToArray();
            localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
        });
    });
}

//save article to array
function saveArticleToArray() {
    if (savedArticles.length != 0) {
        for (let i = 0; i < savedArticles.length; i++) {
            if (savedArticles[i].value == articleCard.innerHTML) {
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
}


//Utility function to shorten summary to 200 characters
function shortenSummary(string){
    if (string.length > 200){
        string = string.substring(0, 200);
        string += '...';
    }
    return string;
}

//Utility function to convert fetched date to UTC string.
function formatDate(string){
    return new Date(string).toUTCString()
}


//Utility function - button manipulation
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
        button.onclick = saveToLocalStorage();

    }
    return button;
}








///////////////////////////////////
const loading = document.querySelector('.loader');

const wrapper = document.querySelector('.wrapper');
let i = 2


function showLoading(){
    loading.classList.add("show");
    setTimeout(()=>{
        loading.classList.remove('show');
        setTimeout(()=> {
            console.log('SCROLL');
            url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${getNumberOfArticles()}&_start=${getNumberOfArticles()*i}`
            displayNews(url);
            i++;
            }, 500)
    }, 2000);
}


window.addEventListener('scroll',()=>{
    const {scrollHeight,scrollTop,clientHeight} = document.documentElement;
    if(scrollTop + clientHeight > scrollHeight-1){
        console.log('BOOOOOM!')
    }
});
