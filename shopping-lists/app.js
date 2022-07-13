import { Application } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { executeQuery } from "./database/database.js";

var lists = await executeQuery("SELECT * FROM shopping_lists");
console.log(lists);

import { router } from "./routes/routes.js";



import { serve } from "https://deno.land/std@0.120.0/http/server.ts";

const app = new Application();
app.use(renderMiddleware);


app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;