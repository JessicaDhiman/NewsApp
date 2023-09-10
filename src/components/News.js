import React,{useEffect,  useState} from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //An async fxn can wait inside its body to resolve some promises
  const updateNews = async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  },[])

  // const handlePrevClick = async()=>{
  //   setPage(page-1);
  //   updateNews();
  // }
  //  const handleNextClick = async()=>{
  //   setPage(page+1);
  //   updateNews();
  // }
  const fetchMoreData = async() => {
    // a async api call like which sends
    // 20 more records in 1.5 secs
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
  };
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
        <div className="row my-3">
        {articles.map((element)=>{
          return <div className="col-md-4 mt-4" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0, 37):""} description={element.description?element.description.slice(0, 80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        
      </div>
    )
}
News.defaultProps = {
  country:"in",
  pageSize:8,
  category:"general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
