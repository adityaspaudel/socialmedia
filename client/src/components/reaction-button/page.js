"use client";
import React, { useState } from "react";

const ReactionButton = () => {
	const [reaction, setReaction] = useState("👍🏾");
	function changeReaction(selectedReaction) {
		if (reaction == selectedReaction) {
			setReaction("");
		} else {
			setReaction(selectedReaction);
		}
	}

	function generateIcons() {
		if (reaction === "Haha") {
			return <button>😆</button>;
		} else if (reaction === "Wow") {
			return <button>😲</button>;
		} else if (reaction === "Love") {
			return <button>❤️</button>;
		} else if (reaction === "Care") {
			return <button>🥰</button>;
		} else if (reaction === "Angry") {
			return <button>😡</button>;
		} else if (reaction === "Sad") {
			return <button>😰</button>;
		} else {
			return (
				<button className="text">
					{reaction == "Like" ? (
						<span>👍🏼</span>
					) : (
						<span className="border-2 border-gray-100">👍🏾</span>
					)}
				</button>
			);
		}
	}

	function showAllEmoji() {
		document.getElementsByClassName("c-showEmoji")[0].style =
			" visibility: visible";
	}
	function hideAllEmoji() {
		document.getElementsByClassName("c-showEmoji")[0].style =
			" visibility:invisible";
	}
	return (
		<div className=" flex flex-col gap-2 justify-start text-4xl ">
			<div className="flex justify-start  c-showEmoji invisible hover:visible h-12 w-96 rounded-3xl">
				<button onClick={() => changeReaction("Like")}>👍🏼</button>
				<button onClick={() => changeReaction("Love")}>❤️</button>
				<button onClick={() => changeReaction("Care")}>🥰</button>
				<button onClick={() => changeReaction("Haha")}>😆</button>
				<button onClick={() => changeReaction("Wow")}>😲</button>
				<button onClick={() => changeReaction("Sad")}>😰</button>
				<button onClick={() => changeReaction("Angry")}>😡</button>
			</div>

			<div
				className="flex justify-start"
				onMouseEnter={() => {
					showAllEmoji();
				}}
				onMouseLeave={() => {
					hideAllEmoji();
				}}>
				{generateIcons()}
			</div>
		</div>
	);
};

export default ReactionButton;
