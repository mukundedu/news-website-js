const API_KEY ="8abaf8c37a634327b217ab4627c329ac";
const url ="https://newsapi.org/v2/everything?q=";


window.addEventListener("load",()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML=`${article.source.name} . ${date}`

}

let curSelectednav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem =document.getElementById(id);
    curSelectednav?.classList.remove('active');
    curSelectednav=navItem;
    curSelectednav.classList.add('active');
}


const searchButton = document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener("click" ,()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectednav?.classList.remove("active");
    curSelectednav=null;
})
