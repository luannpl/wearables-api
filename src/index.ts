import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoutes from "./modules/user/user.routes";
import ProductRoutes from "./modules/product/product.routes";
import { corsOptions } from "./config/cors";
import { conditionalBodyParser } from "./middlewares/conditionalBodyParser";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(conditionalBodyParser);

app.get("/", (_, res) => {
  res.send("Hello, Wearables API!");
});

app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

app.listen(3000, () => console.log("Server on http://localhost:" + PORT));
