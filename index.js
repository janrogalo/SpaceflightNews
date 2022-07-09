const articlesContainer = document.querySelector('.articlesContainer');
let saveArticleButtons = document.querySelectorAll(".addToLibrary");
let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

console.log(savedArticles);


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
                appendArticleCard(articleContent)

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
   string = string.substring(0, 10)
   return string
}

function articleCardContent(article) {
    let content = `<h3>${article.title}</h3>`;
    content += `<p>published at: ${formatDate(article.publishedAt)} by: ${article.newsSite} </p>`;
    content += `<hr><p>${shortenSummary(article.summary)}</p>`;
    content += `<a href="${article.url}"><button>Read more</button></a>`;
    content += `<button class="addToLibrary">Add to library</button>`;
    return content;
}

function appendArticleCard(content){
    const newArticle = document.createElement("div");
    newArticle.classList.add('article');
    newArticle.innerHTML= content;
    articlesContainer.appendChild(newArticle);
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
            button.classList.remove('addToLibrary');
            button.classList.add('removeFromLibrary');
            button.innerText = 'Remove from Library'
            articleCard = e.target.parentElement;
            
            if(savedArticles.length != 0){
                for (let i =0; i < savedArticles.length; i++){
                    if (savedArticles[i].value == articleCard.innerHTML){
                        console.log("Already added")
                        return;
                    }
                }
            }
            savedArticles.push({
                value: articleCard.innerHTML,
            })
            localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
            console.log('item set')
        });
    });
}


// function deleteArticle(){
//     deleteArticleButtons = document.querySelectorAll(".removeFromLibrary");
//     [...deleteArticleButtons].forEach(function(button){
//         button.addEventListener('click', function(e){
//             button.classList.remove('removeFromLibrary');
//             button.classList.add('addToLibrary');
//             button.innerText = 'Add to Library';
//             console.log('Usunięto!')
//             submit();
//             });
//         });
//
//     }








controller();



