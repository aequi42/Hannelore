import { Variables } from "./variables";
import express from "express";
import handler from "./api";
import { json } from "body-parser";

const app = express();
const port = Variables.port;

app.use(json());

app.post("/api", handler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
