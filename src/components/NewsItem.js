import React from 'react'

const NewsItem = (props)=>{
    let {title, description, imageUrl, newsUrl, author, date} = props
    return (
      <div>
        <div className="card " style={{ height:"28rem", margin:"1rem 0", borderRadius:"10px",position:"initial"}}>
          <img src={!imageUrl?"https://i.kinja-img.com/gawker-media/image/upload/s---Jp3oE95--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/199zpfi8dig2njpg.jpg":imageUrl} alt="..." style={{height:"15rem"}}/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By <strong>{!author?"Unknown": author}</strong> on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
