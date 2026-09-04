import "dotenv/config";
import express from "express";
import healthRoutes from "./routes/health.routes";
import baseRoutes from "./routes/base.route";
import productsRoutes from "./routes/products.route";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(healthRoutes)
    .use(baseRoutes)
    .use(productsRoutes);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
