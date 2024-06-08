import type { Context } from "elysia";
import { renderToReadableStream } from "react-dom/server";
import Layout from "./_layout";
import { type JSX } from "react";
import type { FileSystemRouter } from "bun";
import css from "./app.css";

export function createRouter() {
	if ("Bun" in globalThis)
		return new Bun.FileSystemRouter({
			dir: "src/routes",
			style: "nextjs",
			fileExtensions: [".tsx"],
			origin: Bun.origin,
		});

	return {
		routes: {},
		match(req: string) {
			return null;
		},
		reload() {},
		origin: "",
		assetPrefix: "",
		style: "nextjs",
	} satisfies FileSystemRouter;
}

export async function handleRequest(
	ctx: Context & { createRouter: typeof createRouter },
) {
	const route = ctx.createRouter().match(ctx.request);

	if (!route) {
		return new Response("not found", {
			status: 404,
		});
	}

	const RouteComponent = (await import(route.filePath).then(
		(page) => page.default,
	)) as () => JSX.Element;

	const html = await renderToReadableStream(
		<Layout>
			<head>
				<style>{css}</style>
			</head>
			<body>
				<RouteComponent />
			</body>
		</Layout>,
		{
			bootstrapModules: ["/_dist/main.js"],
		},
	);

	await html.allReady;

	return new Response(html);
}
