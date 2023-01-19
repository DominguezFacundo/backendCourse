require("dotenv").config({ path: "../../.env" });
import express from "express";
import handlebars from "express-handlebars";
import { connectDB } from "./mongo/mongo.js";
import { config } from "dotenv";
import __dirname from "../dirname.js";
import productsRouter from "../routes/productsRouter.js"
import cartsRouter from "../routes/cartsRouter.js"
import viewsRouter from "../routes/viewsRouter.js"



const app = express();
const process = config().parsed;
const { PORT } = process;

//server
app.listen(PORT, () => {
  console.log(`Server running on port" ${PORT}`);
});

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

connectDB();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
