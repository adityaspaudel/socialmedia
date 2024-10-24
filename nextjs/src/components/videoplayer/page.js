"use client";

import React from "react";

const VideoPlayer = () => {
	function previousTrack() {
		alert("previousTrack");
		document.getElementsByClassName("vidSource")[0].src = "vid-2.mp4";
		document.getElementsByClassName("vidSource")[0].type = "video/mp4";
		document.getElementsByClassName("video-player")[0].load();
		document.getElementsByClassName("video-player")[0].play();
	}
	function playPauseTrack() {
		alert("play/ pause");
		document.getElementsByClassName("video-player")[0].pause();
	}
	function nextTrack() {
		alert("nextTrack");
		document.getElementsByClassName("vidSource")[0].src = "vid-4.mp4";
		document.getElementsByClassName("vidSource")[0].type = "video/mp4";
		document.getElementsByClassName("video-player")[0].load();
		document.getElementsByClassName("video-player")[0].play();
	}
	return (
		<div className="m-auto w-[60%] flex flex-col">
			<h1>this is a VideoPlayer</h1>

			<video
				width="600"
				height="400"
				className="video-player"
				controls
				autoPlay>
				<source
					className="vidSource"
					src="vid-3.mp4"
					type="video/mp4"
				/>
				{/* <source
					src="vid-2.mp4"
					type="video/mp4"
				/>
				<source
					src="vid-3.mp4"
					type="video/mp4"
				/>
				<source
					src="vid-4.mp4"
					type="video/mp4"
				/> */}
			</video>
			<div className="flex gap-4 musicPlayButtons ">
				<button
					className="previousTrack bg-gray-200 p-2 rounded-md hover:bg-gray-300"
					onClick={previousTrack}>
					prev
				</button>
				<button
					className="playPauseTrack bg-gray-200 p-2 rounded-md hover:bg-gray-300"
					onClick={playPauseTrack}>
					play/pause
				</button>
				<button
					className="nextTrack bg-gray-200 p-2 rounded-md hover:bg-gray-300"
					onClick={nextTrack}>
					next
				</button>
			</div>
		</div>
	);
};

export default VideoPlayer;
