let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
const articlesContainer = document.querySelector('.articlesContainer');

//
function sortAlphabetically(){
    savedArticles.sort((a, b) => a.title.localeCompare(b.title));
    displayArticles();
};


function sortByDate(){
    savedArticles.sort((a, b) => a.publishedAt -b.publishedAt);
    displayArticles();
};

const alphaButton = document.querySelector('.sortAlphabetically');
alphaButton.addEventListener('click', sortAlphabetically);

const dateButton = document.querySelector('.sortbyDate');
dateButton.addEventListener('click', sortByDate);


function displayArticles(){
    let contents = ""

    savedArticles.forEach(function(article) {
        contents += `<div class="article"><h3>${article.title}</h3>`;
        contents += `<p>published at: <span class="publishedAt">${new Date(article.publishedAt).toUTCString()}</span> by: <span class="newsSite">${article.newsSite}</span></p>`;
        contents += `<hr><p class="summary">${article.summary}</p>`;
        contents += `<a href="${article.url}"><button>Read more</button></a>`;
        contents += `<button class="removeFromLibrary" onclick="deleteArticle();">Remove from library</button></div>`
    })
    articlesContainer.innerHTML = contents;
}

displayArticles();


 function deleteArticle(index){
    savedArticles.splice(index, 1);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
    displayArticles();
    ;}
