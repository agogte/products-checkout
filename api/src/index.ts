import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import healthRoutes from "./routes/health.routes";
import productsRoutes from "./routes/products.routes";
import checkoutRoutes from "./routes/checkout.routes";
import webhookRoutes from "./routes/webhooks.routes";
import openApiSpec from "./openapi";

const app = express();
const port = process.env.PORT || 3000;

app.use(webhookRoutes);

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use(healthRoutes)
    .use(checkoutRoutes)
    .use(productsRoutes);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/docs`);
});
