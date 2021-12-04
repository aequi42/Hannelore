import process from "process";
import express from "express";
import handler from "./api";
import { json } from "body-parser";

const app = express();
const port = 3000;

app.use(json());

app.post("/api", handler);

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
