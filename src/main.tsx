import { renderToStaticMarkup } from "react-dom/server";
import Layout from "./_layout";

export default function Main() {
	return (
		<Layout>
			<head>
				<title>app</title>
			</head>
			<body>
				<div id="root"></div>
			</body>
		</Layout>
	);
}
