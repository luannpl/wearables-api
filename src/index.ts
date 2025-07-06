import express from "express";
import UserRoutes from "./modules/user/user.routes";
import ProductRoutes from "./modules/product/product.routes";
import dotenv from "dotenv";
import { conditionalBodyParser } from "./middlewares/conditionalBodyParser";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(conditionalBodyParser);

app.get("/", (_, res) => {
  res.send("Hello, Wearables API!");
});

app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

app.listen(3000, () => console.log("Server on http://localhost:" + PORT));
