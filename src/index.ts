import express from "express";
import { json } from "body-parser";
import { setupRoutes } from "./Routes";

const app = express();

app.use(json());

const port = 8080;

app.listen(port, () => console.log(`Server started at port: ${port}`));

setupRoutes(app);

export default app;
