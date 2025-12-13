const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Siêu Thị Xanh",
      version: "1.0.0",
      description: "Tài liệu API cho hệ thống bán hàng Siêu Thị Xanh",
      contact: {
        name: "Support Team",
        email: "support@sieuthi xanh.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Server local (Development)",
      },
      {
        url: "https://api.sieuthi xanh.com",
        description: "Server production",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "JWT token nhận được sau khi đăng nhập. Nhập token vào ô bên dưới (không cần thêm 'Bearer')",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(process.cwd(), "src/swagger/paths/*.yaml"),
    path.join(process.cwd(), "src/swagger/components/*.yaml"),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const swaggerDocs = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "API Docs - Siêu Thị Xanh",
    })
  );
};

module.exports = swaggerDocs;
