import React from "react";

const VideoPlayer = () => {
	function previousTrack() {}
	function playPauseTrack() {}
	function nextTrack() {}
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
					src="vid-4.mp4"
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
					className="previousTrack"
					onClick={previousTrack}>
					prev
				</button>
				<button
					className="playPauseTrack"
					onClick={playPauseTrack}>
					play/pause
				</button>
				<button
					className="nextTrack"
					onClick={nextTrack}>
					next
				</button>
			</div>
		</div>
	);
};

export default VideoPlayer;
