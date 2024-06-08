declare module "bun" {
	interface Env {
		PORT: number | string;
		HOSTNAME: string;
		OUTDIR: string;
		SSR: boolean;
		NODE_ENV: "development" | "production";
	}
}
