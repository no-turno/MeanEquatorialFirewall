import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { createRouter, handleRequest } from "./src/entry.server";
import { staticPlugin } from "@elysiajs/static";
import { cookie } from "@elysiajs/cookie";

await Bun.build({
	entrypoints: [
		'src/entry.client.tsx'
	],
	format: "esm",
	target: "browser",
	loader: {
		".tsx": "tsx",
		".css": "file",
		".ts": "ts",
	},
	outdir: 'dist/client',
	naming: 'main.js'
})

export const setup = () =>
	new Elysia()
		.decorate("createRouter", createRouter)
		.use(cors())
		.use(
			staticPlugin({
				assets: "./public",
				prefix: "/_",
				noCache: true,
				alwaysStatic: false,
				directive: "public",
			}),
		)
		.use(cookie())
		.onStart(async ({ decorator }) => {
			const router = decorator.createRouter();

			await Bun.write(
				"dist/server/routes.js",
				"export default " +
					Bun.inspect(
						Object.fromEntries(
							Array.from(Object.entries(router.routes)).map(([route, path]) => {
								const srcPath = path.replace(process.cwd(), "");
								return [route, srcPath];
							}),
						),
					),
			);

			await Bun.write(
				"dist/client/routes.js",
				"export default " +
					Bun.inspect(
						Object.fromEntries(
							Array.from(Object.entries(router.routes)).map(([route, path]) => {
								const srcPath = path
									.replace(process.cwd() + "/src/routes", Bun.origin)
									.replaceAll(".tsx", "");
								return [
									route,
									srcPath.endsWith("/index")
										? srcPath.replace("/index", "")
										: srcPath,
								];
							}),
						),
					),
			);
		});

export const app = setup()

	.get(
		"*",
		async (ctx) => {
			return  await handleRequest(ctx);
		},
		{
			afterHandle: (ctx) => {
				ctx.response;
			},
		},
	)
	.get('/_dist/main.js', () => Bun.file('dist/client/main.js'))

	.listen(
		{
			hostname: "0.0.0.0",
		},
		({ url }) => {
			console.log("%s", url);
		},
	);
