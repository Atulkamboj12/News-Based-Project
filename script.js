const API_KEY = "d78c7748199045fb81cd8ce5681a4456";
const url = "https://gnews.io/api/v4/";



window.addEventListener("load", () => fetchNews("top-headlines?category=general"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    document.getElementById('loading-spinner').style.display = 'block';
    
    try {
        const res = await fetch(`${url}${query}&apikey=${API_KEY}&lang=en&max=10`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        cardsContainer.innerHTML = "<h3>Failed to load news. Please try again later.</h3>";
    }
    
    document.getElementById('loading-spinner').style.display = 'none';
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
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

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        dateStyle: "short",
        timeStyle: "short"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

const categories = {
    sport: "top-headlines?category=sports",
    finance: "top-headlines?category=business",
    politics: "top-headlines?category=world"
};


function onNavItemClick(id){
    fetchNews(categories[id]);
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
    const query = searchtext.value.trim();
    if (!query) {
        return;
    }
    fetchNews(`search?q=${query}`);
    curSelectedNav.classList.remove("active");
    curSelectedNav = null;  
});