import React, {useState} from "react";
import { useIntersection } from "../utils/IntersectionObserver";
import "./Album.scss";

function Album({id, title, userId, imagesPerRow}){
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const albumRef = React.useRef();

  useIntersection(albumRef, () => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then(res => res.json())
      .then(response => {
        setImages(response);
        setPageNumber(1);
      })
      .catch(error => {
        console.error(error);
      });
  })

  return(
    <div className="albumContainer" ref={albumRef}>
      <div className="titleSection">{title}</div>
      <div className="infoSection">
        id: {id}, userId: {userId}
      </div>
      <div className="carouselContainer">
        <div
          className={`leftArrow ${(pageNumber===1)||(pageNumber===0)?"arrowDisabled":""}`}
          onClick={()=>{setPageNumber(previousPageNumber => previousPageNumber-1)}}
        ></div>
        <div
          className="imagesSection"
          style={{
            justifyContent: pageNumber===Math.ceil(images.length/imagesPerRow)?"flex-start":"space-between"
          }}
        >
          {
            pageNumber!==0 &&
            images.length!==0 &&
            images.slice(imagesPerRow*(pageNumber-1), Math.min(imagesPerRow*pageNumber, images.length)).map(image => (
              <div className="imageSection" key={`album-${id}-image-${image.id}`}>
                <img
                  src={image.url}
                  className="imageContainer"
                />
                <div className="imageTitle">{image.title}</div>
                <div className="imageId">id: {image.id}</div>
              </div>
            ))
          }
        </div>
        <div 
          className={`rightArrow ${(pageNumber===Math.ceil(images.length/imagesPerRow))||(images.length===0)?"arrowDisabled":""}`}
          onClick={()=>{setPageNumber(previousPageNumber => previousPageNumber+1)}}
        ></div>
      </div>
    </div>
  );
}

export default Album;