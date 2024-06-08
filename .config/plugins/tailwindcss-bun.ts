import type { BunPlugin } from "bun";
import { __unstable__loadDesignSystem, compile } from "tailwindcss";

export const tailwindcssBunPlugin: BunPlugin = {
	name: "tailwindcss-bun",
	setup(build) {
		build.onLoad(
			{
				filter: /(app|main|tailwind).css$/,
			},
			async (args) => {
				console.log(args);
				const outfile = "dist/assets/app.css";
				await Bun.$`bunx @tailwindcss/cli@next -i src/app.css -o ${outfile}`;
				const file = await Bun.file(outfile).text();
				// const system = __unstable__loadDesignSystem(file);
				return {
					loader: "object",
					exports: {
						default: compile(file).build([outfile]),
					},
				};
			},
		);
	},
};
