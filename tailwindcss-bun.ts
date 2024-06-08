import type { BunPlugin } from "bun";
import { compile } from "tailwindcss";

const plugin: BunPlugin = {
	name: "tailwindcss-bun",
	setup(build) {
		build.onLoad(
			{
				filter: /src\/app.css$/,
			},
			async () => {
				await Bun.$`bunx @tailwindcss/cli@next -i src/app.css -o dist/app.css`;
				const file = await Bun.file("dist/app.css").text();
				
				return {
					loader: "object",
					exports: {
						default: compile(file).build(["dist/app.css"]),
					},
				};
			},
		);
	},
};

Bun.plugin(plugin);
