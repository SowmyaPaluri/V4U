import React from 'react'
import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Trail = () => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
  
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const handleSubmit = () => {
        const date = new Date();
        const imageRef = ref(storage, 'workerIdentities/' + date + '-' + image.name);
        uploadBytes(imageRef, image)
          .then(() => {
            getDownloadURL(imageRef)
              .then((url) => {
                setUrl(url);
              })
              .catch((error) => {
                console.log(error.message, "error getting the image url");
              });
            setImage(null);
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
      console.log(url);
      
      return (
        <div className="App">
          <img src={url}/>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
}

export default Trail