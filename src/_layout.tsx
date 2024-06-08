import type React from "react";
import css from "./app.css";

export default function Layout({ children }: { children: React.ReactElement }) {
	return (
		<html>
			<head>
				<title>app</title>
				<style>{css}</style>
			</head>
			<body>{children}</body>
		</html>
	);
}
