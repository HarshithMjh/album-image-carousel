import React, {useLayoutEffect, useState, useEffect} from "react";
import Album from "./components/Album";
import "./App.css";

function useImagesPerRow() {
  const [imagesPerRow, setImagesPerRow] = useState(1);
  useLayoutEffect(() => {
    function handleWindowResize() {
      setImagesPerRow(Math.floor((window.innerWidth-90)/200));
    }
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return Math.max(imagesPerRow, 1);
}

function App() {
  const [albums, setAlbums] = useState([]);
  const imagesPerRow = useImagesPerRow();

  useEffect(function(){
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(response => {
        setAlbums(response);
      })
      .catch(error => {
        alert("Something went wrong. Please try after some time");
        console.error(error);
      })
  },[])

  return (
    <div className="App">
      {
        albums.map(album => (
          <div className="albumRow" key={`album-${album.id}`}>
            <Album
              id={album.id}
              title={album.title}
              userId={album.userId}
              imagesPerRow={imagesPerRow}
            />
          </div>
        ))
      }
    </div>
  );
}

export default App;
