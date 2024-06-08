import { renderToStaticMarkup } from "react-dom/server";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <html>{children}</html>;
}
