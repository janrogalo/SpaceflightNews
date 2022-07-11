let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
const articlesContainer = document.querySelector('.articlesContainer');

const sortSelector = document.querySelector("#sortBy");
sortSelector.addEventListener('change',(e)=>{
        const [option] = e.target.selectedOptions
    switch(option.dataset.id) {
        case '1':
            savedArticles.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case '2':
            savedArticles.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case '3':
            savedArticles.sort((a, b) => b.publishedAt -a.publishedAt);
            break;
        case '4':
            savedArticles.sort((a, b) => a.publishedAt -b.publishedAt);
            break;
    }
    displayArticles();
    });


function displayArticles(){
    let contents = ""

    savedArticles.forEach(function(article) {
        contents += `<div class="article"><h3>${article.title}</h3>`;
        contents += `<p>published at: <span class="publishedAt">${new Date(article.publishedAt).toUTCString()}</span> by: <span class="newsSite">${article.newsSite}</span></p>`;
        contents += `<p class="summary">${article.summary}</p>`;
        contents += `<a href="${article.url}"><button>Read more</button></a>`;
        contents += `<button class="removeFromLibrary" onclick="deleteArticle();">Remove from library</button></div>`
    })
    articlesContainer.innerHTML = contents;
}

 function deleteArticle(index){
    savedArticles.splice(index, 1);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
    displayArticles();
    ;}


displayArticles();

