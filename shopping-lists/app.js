import { Application } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { executeQuery } from "./database/database.js";
import { parse } from 'https://deno.land/std/flags/mod.ts';

var lists = await executeQuery("SELECT * FROM shopping_lists");
console.log(lists);

import { router } from "./routes/routes.js";



import { serve } from "https://deno.land/std@0.120.0/http/server.ts";

const app = new Application();
app.use(renderMiddleware);


app.use(router.routes());
const { args } = Deno;
const argPort = parse(args).port;
console.log(argPort);


if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: argPort });
}

export default app;