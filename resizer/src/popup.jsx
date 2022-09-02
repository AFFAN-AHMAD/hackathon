import React from "react";
import { render } from "react-dom"
import { useRef, useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { saveAs } from "file-saver";
import styled from 'styled-components'

const fileTypes = ["JPG", "PNG", "GIF"];

const ResizerStyle = styled.div`
	background-image: linear-gradient(to bottom right, #DD95F7 0%, #9AADF9 50%, #7FC9D9 100%);
	margin:0;
	top:10px;
    width:500px;
    max-height:600px;
    padding:20px;
    border-radius:10px;
	.WHFdiv{
		display:grid;
		grid-template-columns:1fr 1fr 1.5fr;
		padding:10px;
	}
    .chooseUpload{
        color:green;
        height:30px;
    }
	.imagediv{
		margin-top:20px;
		border:2px solid blue;
		height:400px;
		cursor: grab;
		border-radius:5px;
		overflow:scroll;
		scrollbar-width: thin;
	}
	.imagediv::-webkit-scrollbar {
		width: 8px;
		height: 8px
	}
	.imagediv::-webkit-scrollbar-button {
		background: white
	}
	.imagediv::-webkit-scrollbar-track-piece {
		background: white;
	}
	.imagediv::-webkit-scrollbar-thumb {
		background: grey
	}
	.inputBoxCSS{
		width:60px;
		border-radius:4px;
		border:none;
		padding:4px;
	}
	.inputBoxCSS1{
		width:100px;
		border-radius:4px;
		border:none;
		padding:4px;
	}
	.SubmitButton{
		border:none;
		font-size:12px;
		padding: 7px 15px;;
		width:200px;
		border-radius:5px;
		margin-top:10px;
		font-weight:600;
		letter-spacing:2px;
		color:white;
		background-image: linear-gradient(to bottom right, #DD95F7 0%, #920909 50%, black 100%);
	}
	.formDivCss{
		text-align:center;
		margin:10px;
	}
`;

function Popup() {
	const [img, setImg] = useState("");
	const [file, setFile] = useState(null);
	const [height, setHeight] = useState(100);
	const [width, setwidth] = useState(400);
	const [name, setName] = useState("")
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
					saveAs(blob, `${name}`);
				});
			};
		};
	};
	const handleChange = (e) => {
		setFile(e);

	}
	return (
		<ResizerStyle>
			<div>
				<form onSubmit={handleFile} className="formDivCss">
					<FileUploader
						handleChange={(e) => handleChange(e)}
						name="file"
						types={fileTypes}
					/>
					<div className="WHFdiv">
						<div>
							<label style={{ padding: '10px', fontWeight: '500', fontSize: '12px' }}>Width:</label>
							<input
								className="inputBoxCSS"
								placeholder="width"
								onChange={(e) => setwidth(e.target.value)}
								type="number"
							/>
						</div>
						<div>
							<label style={{ padding: '10px', fontWeight: '500', fontSize: '12px' }}>Height:</label>
							<input
								className="inputBoxCSS"
								placeholder="height"
								onChange={(e) => setHeight(e.target.value)}
								type="number"
							/>
						</div>
						<div>
							<label style={{ padding: '10px', fontWeight: '500', fontSize: '12px' }}>File Name:</label>
							<input
								className="inputBoxCSS1"
								placeholder="file name"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
					</div>
					<button type="submit" className="SubmitButton">SAVE&nbsp; & &nbsp;DOWNLOAD</button>
				</form>

				{img && (
					<div className="imagediv">
						<img
							src={img}
							alt="pick"
							height={`${height}px`}
							width={`${width}px`}
							id="image"
							draggable="false"
						/>
					</div>
				)}
			</div>
		</ResizerStyle>
	);
}

render(<Popup />, document.getElementById("react-target"))