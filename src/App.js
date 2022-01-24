import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import News from "./Components/News";

const BASE_ROOT = "https://hn.algolia.com/api/v1/search?query=";
export default function App() {
  const [news, setNews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(" ");
  const [error, setError] = useState(false);
  

  function loadNews(searchQuery) {
    const url = searchQuery
      ? `${BASE_ROOT}${searchQuery}`
      : `${BASE_ROOT}"react"`;

    console.log(`${BASE_ROOT}"react&page=0"`);
    setError(false);
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
       
        setNews(json);
        
        
      })
      .catch(() => setError(true));
  }

  const reset = () => {
    setSearchQuery("");
    loadNews();
  };

const handleNextPage = ()=>{
  fetch(`${BASE_ROOT}"react&page=${news.page+1}`)
  .then(res => res.json())
  .then((json) => setNews(json))

}

const handlePrePage = ()=>{
  fetch(`${BASE_ROOT}"react&page=${news.page-1}`)
  .then(res => res.json())
  .then((json) => setNews(json))

}



  useEffect(loadNews, []);

  const onChange = (event) => {
    // console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  const getContent = () => {
    if (isLoading) return <div>is Loading</div>;
    if (error) return <div> {() => alert("Request failed!")}</div>;
    if (!news) return <div>No result matched your search</div>;

    return (
      <div className="container">
        {news && news.hits.map((item, index) => (
          <News
            index={index}
            title={item.title}
            points={item.points}
            author={item.author}
            time={item.created_at_i}
            comments={item.num_commens}
            page={news.page}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <Header />

      <div>
        {getContent()}
        <div>
          <button
            disabled={news && news.page === 0 }
            onClick={() => {
              handlePrePage();
            }}
          >
            Pre
          </button>
          <button
            disabled={news && news.page >= 49 }
            onClick={() => {
              handleNextPage();
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* {isLoading ? (
        <div>is loading...</div>
      ) : (
        <div className="container">
          {news.map((item) => (
            <News
              title={item.title}
              points={item.points}
              author={item.author}
              comments={item.num_commens}
            />
          ))}
        </div>
      )} */}
      <div style={{margin:'50px'}}>
        <hr className="line-bar" style={{color: "#FF6600"}}></hr>
        <input
          className="input-button"
          type="text"
          value={searchQuery}
          onChange={onChange}
        />
        <button
          disabled={searchQuery.length < 4}
          onClick={() => loadNews(searchQuery)}
          className="search-button"
        >
          Search
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
