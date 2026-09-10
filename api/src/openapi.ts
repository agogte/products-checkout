const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Stripe Checkout Test API",
    version: "1.0.0",
    description: "Basic product listing + Stripe checkout demo API",
  },
  servers: [{ url: "/" }],
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "Service is up",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { status: { type: "string", example: "ok" } },
                },
              },
            },
          },
        },
      },
    },
    "/products": {
      get: {
        summary: "List all products",
        responses: {
          "200": {
            description: "Array of products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
        },
      },
    },
    "/products/{id}": {
      get: {
        summary: "Get a single product by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "The product",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "404": { description: "Product not found" },
        },
      },
    },
    "/checkout": {
      post: {
        summary: "Create and confirm a Stripe PaymentIntent for a product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["productId"],
                properties: {
                  productId: { type: "integer", example: 1 },
                  paymentMethod: {
                    type: "string",
                    example: "pm_card_visa",
                    description:
                      "Stripe test payment method id. Defaults to pm_card_visa. Use pm_card_chargeDeclined to test a decline.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Payment succeeded",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "succeeded" },
                    paymentIntentId: { type: "string", example: "pi_..." },
                  },
                },
              },
            },
          },
          "400": { description: "Payment failed (e.g. declined test card)" },
          "404": { description: "Product not found" },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Aura" },
          priceInCents: { type: "integer", example: 100 },
        },
      },
    },
  },
};

export default openApiSpec;
