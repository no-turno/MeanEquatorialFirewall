import { hydrateRoot } from "react-dom/client";
import Main from "./main";
import { createRouter } from "./entry.server";

const router = createRouter();

console.log(router);

hydrateRoot(document.getElementById("root")!, <Main />);
