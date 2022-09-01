import logo from "./logo.svg";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import { saveAs } from "file-saver";
function App() {
  const [img, setImg] = useState("");
  const [height, setHeight] = useState(100);
  const [WIDTH, setWidth] = useState(1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(img);
  };

  const handleFile = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      let img_url = event.target.result;
      setImg(img_url);
      let image = document.createElement("img");
      image.src = img_url;

      image.onload = (e) => {
        let canvas = document.createElement("canvas");
        let ratio = WIDTH / image.width;
        canvas.width = WIDTH;
        canvas.height = image.height * ratio;
        setHeight(image.height * ratio);

        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(function (blob) {
          saveAs(blob, "pretty-image.png");
        });
      };
    };
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => handleFile(e.target.files[0])}
          accept={".jpg, .jpeg, .png"}
        />
		<input placeholder="height"/>
		<input placeholder="width"/>
		<input type={"submit"}/>
      </form>

      <img
        src={img}
        alt="image"
        height={`${height}px`}
        width={`${WIDTH}px`}
        id="image"
      />
    </div>
  );
}

export default App;
