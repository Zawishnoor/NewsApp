const apikey = '2a1dffbb1a77496dae6e307c765cb283';
const Blogcontainer = document.getElementById("blog-container");
const searchfield = document.getElementById('search-input');
const searchButton = document.getElementById('Search-button');

async function fetchrandomnews() {
    try {
        const apiurl = `add your own api key here `;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

searchButton.addEventListener('click',  async () => {
    const query=searchfield.value.trim();
    if(query!== "") {
        try{

            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.error("Error in fetching news", error);

        }
    }
})

 async function fetchNewsQuery(query) {
     try {
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }

}


function displayBlogs(articles) {
    Blogcontainer.innerHTML = ""; 

    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "default.jpg"; 
        img.alt = article.title || "News Image";

        const title = document.createElement("h2");
        const truncatedtitle = article.title 
            ? (article.title.length > 30 ? article.title.slice(0, 30) + "....." : article.title) 
            : "No Title";
        title.textContent = truncatedtitle; 

        const description = document.createElement("p");
        const truncatedDes = article.description 
            ? (article.description.length > 120 ? article.description.slice(0, 120) + "....." : article.description) 
            : "No description available.";
        description.textContent = truncatedDes;

        const readMore = document.createElement("a");
        readMore.href = article.url || "#";
        readMore.target = "_blank";
        readMore.textContent = "Read more";
        readMore.classList.add("read-more");

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, '_blank');

        })
        blogCard.appendChild(readMore);

        Blogcontainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchrandomnews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error in fetching news:", error);
    }
})();

