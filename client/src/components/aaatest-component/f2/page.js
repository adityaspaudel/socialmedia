import { useEffect, useState } from "react";

const CategoriesList = () => {
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

	//practice-----------------------------------------------------------

	return (
		<div className="flex gap-4">
			<div className="flex flex-col">
				<div className="flex">
					{categoriesList.map((item) => {
						return <CategoriesCard item={item} />;
					})}
				</div>
				<div>
					<PaginationDemo totalItems={totalItems} />
				</div>
			</div>
		</div>
	);
};

export default CategoriesList;
