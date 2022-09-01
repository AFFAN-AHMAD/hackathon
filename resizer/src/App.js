

import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
	const [img, setImg] = useState("");
	const [height, setHeight] = useState(400);
	const [width, setWidth] = useState(400);
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(img);
	};
	const handleFile = (file) => {
		console.log(file);

		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			let imgUrl = event.target.result;
			setImg(imgUrl);
		};
	};
	return (
		<div className="App">
			<input
				type="file"
				onChange={(e) => handleFile(e.target.files[0])}
			/>
			<form onSubmit={handleSubmit}>
				<box>
					{" "}
					<label>image url</label>
					<input
						placeholder="image url"
						name="url"
						onChange={(e) => setImg(e.target.value)}
					/>
				</box>
				<box>
					{" "}
					<label>height</label>
					<input
						placeholder="height"
						onChange={(e) => setHeight(e.target.value)}
					/>
				</box>
				<box>
					{" "}
					<label>width</label>
					<input
						placeholder="width"
						onChange={(e) => setWidth(e.target.value)}
					/>
				</box>

				<button>save</button>
			</form>
			<img
				src={img}
				alt="image"
				height={`${height}px`}
				width={`${width}px`}
			/>
		</div>
	);
}

export default App;