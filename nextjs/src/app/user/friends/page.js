import React from "react";

const Friends = () => {
	function generateAvatarUrl() {
		const gender = Math.random() < 0.5 ? "men" : "women";
		const number = Math.floor(Math.random() * 100) + 1;
		return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
	}

	// Create an object with 50 person names and avatars
	const personList = {
		people: [
			{ name: "Alice Johnson", avatar: generateAvatarUrl() },
			{ name: "Bob Smith", avatar: generateAvatarUrl() },
			{ name: "Charlie Brown", avatar: generateAvatarUrl() },
			{ name: "Diana Ross", avatar: generateAvatarUrl() },
			{ name: "Ethan Hunt", avatar: generateAvatarUrl() },
			{ name: "Fiona Apple", avatar: generateAvatarUrl() },
			{ name: "George Clooney", avatar: generateAvatarUrl() },
			{ name: "Hannah Montana", avatar: generateAvatarUrl() },
			{ name: "Ian McKellen", avatar: generateAvatarUrl() },
			{ name: "Julia Roberts", avatar: generateAvatarUrl() },
			{ name: "Kevin Bacon", avatar: generateAvatarUrl() },
			{ name: "Lana Del Rey", avatar: generateAvatarUrl() },
			{ name: "Michael Jordan", avatar: generateAvatarUrl() },
			{ name: "Nancy Drew", avatar: generateAvatarUrl() },
			{ name: "Oscar Wilde", avatar: generateAvatarUrl() },
			{ name: "Penelope Cruz", avatar: generateAvatarUrl() },
			{ name: "Quentin Tarantino", avatar: generateAvatarUrl() },
			{ name: "Rachel Green", avatar: generateAvatarUrl() },
			{ name: "Steve Jobs", avatar: generateAvatarUrl() },
			{ name: "Tina Turner", avatar: generateAvatarUrl() },
			{ name: "Uma Thurman", avatar: generateAvatarUrl() },
			{ name: "Vincent van Gogh", avatar: generateAvatarUrl() },
			{ name: "Whitney Houston", avatar: generateAvatarUrl() },
			{ name: "Xavier Naidoo", avatar: generateAvatarUrl() },
			{ name: "Yoko Ono", avatar: generateAvatarUrl() },
			{ name: "Zac Efron", avatar: generateAvatarUrl() },
			{ name: "Amy Winehouse", avatar: generateAvatarUrl() },
			{ name: "Brad Pitt", avatar: generateAvatarUrl() },
			{ name: "Celine Dion", avatar: generateAvatarUrl() },
			{ name: "David Bowie", avatar: generateAvatarUrl() },
			{ name: "Emma Watson", avatar: generateAvatarUrl() },
			{ name: "Frank Sinatra", avatar: generateAvatarUrl() },
			{ name: "Gal Gadot", avatar: generateAvatarUrl() },
			{ name: "Hugh Jackman", avatar: generateAvatarUrl() },
			{ name: "Idris Elba", avatar: generateAvatarUrl() },
			{ name: "Jennifer Lawrence", avatar: generateAvatarUrl() },
			{ name: "Keanu Reeves", avatar: generateAvatarUrl() },
			{ name: "Lady Gaga", avatar: generateAvatarUrl() },
			{ name: "Morgan Freeman", avatar: generateAvatarUrl() },
			{ name: "Natalie Portman", avatar: generateAvatarUrl() },
			{ name: "Orlando Bloom", avatar: generateAvatarUrl() },
			{ name: "Pink", avatar: generateAvatarUrl() },
			{ name: "Queen Latifah", avatar: generateAvatarUrl() },
			{ name: "Robert De Niro", avatar: generateAvatarUrl() },
			{ name: "Scarlett Johansson", avatar: generateAvatarUrl() },
			{ name: "Tom Hanks", avatar: generateAvatarUrl() },
			{ name: "Usher", avatar: generateAvatarUrl() },
			{ name: "Viola Davis", avatar: generateAvatarUrl() },
			{ name: "Will Smith", avatar: generateAvatarUrl() },
			{ name: "Zoe Saldana", avatar: generateAvatarUrl() },
		],
	};
	return (
		<div className="flex flex-col justify-center items-center gap-10">
			your Friends list
			<div className="flex flex-col  gap-2">
				{personList.people.map((item) => (
					<div className="flex gap-4"> <img src={item.avatar} height={40} width={40} /> {item.name}</div>
				))}
			</div>
		</div>
	);
};

export default Friends;
