import React from "react";

const VideoPlayer = () => {
	return (
		<div>
			<h1>this is a MediaPlayer</h1>

			<video
				width="400"
				height="200"
				className=""
				controls
				preload="none">
				<source
					src="vid-1.mp4"
					type="video/mp4"
				/>
				<source
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
				/>
			</video>
		</div>
	);
};

export default VideoPlayer;
