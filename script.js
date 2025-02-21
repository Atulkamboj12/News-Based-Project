const API_KEY = "a7b7fd4415f84bcba8d046631518a774";
const url = "https://newsapi.org/v2/everything?q=";



window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    document.getElementById('loading-spinner').style.display = 'block';  
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    document.getElementById('loading-spinner').style.display = 'none';
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = " ";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    if(curSelectedNav){
        curSelectedNav.classList.remove("active");
    }
    curSelectedNav = navItem; 
    curSelectedNav.classList.add("active");  
}

function reload() {
    window.location.reload();
}

const searchBtn = document.getElementById("search-btn");
const searchtext = document.getElementById("search-text");

searchBtn.addEventListener("click", () => {
    const query = searchtext.value;
    if (!query) {
        return;
    }
    fetchNews(query);
    curSelectedNav.classList.remove("active");
    curSelectedNav = null;  
});