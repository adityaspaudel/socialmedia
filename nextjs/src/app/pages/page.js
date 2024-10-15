"use client";

import "../styles/globals.css";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }) {
	return (
		<div className="flex">
			<Sidebar />
			<main className="flex-1">
				<Component {...pageProps} />
			</main>
		</div>
	);
}

export default MyApp;
