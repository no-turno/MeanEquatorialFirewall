import { renderToReadableStream } from "react-dom/server";
import { setup } from "./setup";
import { getUserInfo } from "@replit/repl-auth";
import { Index } from "./routes";
import css from "./app.css";
import Layout from "./_layout";

export const app = () =>
	setup()
		.get(
			"/",
			async (ctx) =>
				await renderToReadableStream(
					<Layout>
							<Index
								// @ts-ignore
								{...getUserInfo({
									params: ctx.params,
									query: ctx.query,
									headers: ctx.headers,
									body: ctx.request.body,
									url: ctx.request.url,
								})}
							/>
					</Layout>
				),
		)
		.get("/app.css", () => Bun.file("dist/app.css"));

if (process.isBun)
	app().listen(
		{
			hostname: "0.0.0.0",
			lowMemoryMode: true,
		},
		({ url }) => {
			console.log("%s", url);
		},
	);
