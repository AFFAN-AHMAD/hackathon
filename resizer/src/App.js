import logo from "./logo.svg";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { saveAs } from "file-saver";
const fileTypes = ["JPG", "PNG", "GIF"];
function App() {
	const [img, setImg] = useState("");
	const [file, setFile] = useState(null);
	const [height, setHeight] = useState(100);
	const [width, setwidth] = useState(400);
	const [name, setName] = useState("");
	const handleImage = (e) => {
		setFile(e.target.files[0]);
	};

	const handleFile = (event) => {
		event.preventDefault();
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			let img_url = event.target.result;
			setImg(img_url);
			let image = document.createElement("img");
			image.src = img_url;

			image.onload = (e) => {
				let canvas = document.createElement("canvas");
				// let ratio = width / image.width;
				canvas.width = width;
				canvas.height = height;
				// setHeight(image.height * ratio);

				let context = canvas.getContext("2d");
				context.drawImage(image, 0, 0, canvas.width, canvas.height);

				canvas.toBlob(function (blob) {
					saveAs(blob, `${name}.png`);
				});
			};
		};
	};
	const handleChange = (e) => {
		setFile(e);
	};
	return (
		<div className="App">
			<form onSubmit={handleFile}>
				<input
					type="file"
					onChange={(e) => handleImage(e)}
					accept={".jpg, .jpeg, .png"}
				/>
				<FileUploader
					handleChange={(e) => handleChange(e)}
					name="file"
					types={fileTypes}
				/>
				<input
					placeholder="width"
					onChange={(e) => setwidth(e.target.value)}
					type="number"
				/>
				<input
					placeholder="height"
					onChange={(e) => setHeight(e.target.value)}
					type="number"
				/>
				<input
					placeholder="file name"
					onChange={(e) => setName(e.target.value)}
				/>
				<button type="submit"> save</button>
			</form>

			{img && (
				<img
					src={img}
					alt="image"
					height={`${height}px`}
					width={`${width}px`}
					id="image"
				/>
			)}
		</div>
	);
}

export default App;
