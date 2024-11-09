import Image from "next/image";
import React, { useEffect, useState } from "react";

const Apitest = () => {
	const [categoriesList, setCategoriesList] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		const data = await fetch("https://api.escuelajs.co/api/v1/categories");
		let categories = await data.json();
		setTotalItems(categories.length);
		setCategoriesList(categories);
	};
	return (
		<div>
			<h1>page</h1>
			<div>
				{categoriesList.map((item) => {
					return (
						<span>
							{item.id}{" "}
							<img
								src={item.image}
								height={100}
								width={100}
							/>
							<br />
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default Apitest;
