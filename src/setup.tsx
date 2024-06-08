import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

export const setup = () => new Elysia().use(cors());
