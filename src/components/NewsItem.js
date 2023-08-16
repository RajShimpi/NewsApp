// import React from 'react'

// const NewsItem =(props)=>{

//     let { title, description, imageUrl, newsUrl, author, date, source } = props;
//     return (
//       <div className=' my-3'>
//         <div className="card">
//           <div style={{ display: 'flex', justifyContent: "flex-end", position: 'absolute', right: '0' }}>
//             <span className="badge rounded-pill bg-danger" >{source}</span>
//           </div>
//           <img src={!imageUrl ? "https://gumlet.assettype.com/barandbench%2F2021-06%2F87e7f50e-be49-4c91-91f3-951b1c9f1d75%2FTelangana_High_Court.jpg?rect=0%2C0%2C1600%2C840&w=1200&auto=format%2Ccompress&ogImage=true&enlarge=true" : imageUrl} className="card-img-top" alt="..." />
//           <div className="card-body">
//             <h5 className="card-title">{title}...</h5>
//             <p className="card-text">{description}...</p>
//             <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} - {new Date(date).toGMTString()}</small></p>
//             <a rel="noreferrer" href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read More</a>
//           </div>
//         </div>
//       </div>
//     )
//   }

// export default NewsItem

import React from 'react'

const NewsItem = (props)=> {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className="my-3">
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }> 
                        <span className="badge rounded-pill bg-danger"> {source} </span>
                    </div>
                    <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
     
}

export default NewsItem
