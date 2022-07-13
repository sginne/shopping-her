import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import * as mainController from "../controllers/mainController.js";

const router = new Router();

router.get("/", mainController.showIndex);
router.get("/lists", mainController.showLists);
router.post("/lists", mainController.addList);
router.get("/lists/:id", mainController.showList);
router.post("/lists/:id/deactivate", mainController.deactivateList);
router.post("/lists/:id/items", mainController.addItem);




export { router };
