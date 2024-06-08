set shell := ["nu", "-c"]

dev:
    bun run --port=8080 --watch ./server.tsx

build:
    bun build --format=esm --target=bun --define=process.env.NODE_ENV:"'production'" ./server.tsx --outdir=dist/server