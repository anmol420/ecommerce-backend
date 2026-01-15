import { Hono } from "hono";
import userRouter from "./modules/user/user.routes";

const app = new Hono();
const apiRouter = app;

const version = "v1";

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

apiRouter.route("/users", userRouter);

app.route(`/api/${version}`, apiRouter);

export default app;
