
import css from "./app.css";
import React from "react";

const ANCHOR = 'import.with.type:<css>'

function Styles() {
	return (
        <style data-anchor={ANCHOR} data-with={{type: "css"}} data-hash={btoa(css)}>{css}</style>
    );
}

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className="bg-blue-900">
			<head>
				<Styles/>
			</head>
			<body>
				{
					children ? children : <div id="root"/>
				}
				{children}
			</body>
				
		</html>
	);
}
