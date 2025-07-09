"use strict";
const jsonServer = require("json-server");
const {
  createUploadMiddleware,
  ensureDirectoryExists,
  UPLOAD_DIR,
} = require("./utils.js");
const registerRoutes = require("./ro utes.js");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const DELAY = 2000;

server.use((_req, _res, next) => setTimeout(next, DELAY));

console.log("server started");

ensureDirectoryExists(UPLOAD_DIR).then(() => {
  server.post(
    "/api/upload",
    createUploadMiddleware().single("file"),
    (req, res) => {
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      const { originalname, mimetype, size, filename } = req.file;
      res.json({
        filename: originalname,
        type: mimetype,
        size,
        url: `/${filename}`,
      });
    }
  );

  server.use("/uploads", jsonServer.defaults({ static: UPLOAD_DIR }));
  server.use(middlewares);

  registerRoutes(server, router);

  server.use("/api",router);

  server.use((req, res) => {
    res.status(404).json({ message: "Not found", url: req.originalUrl });
  });
  

  server.listen(3001, () => {
    console.log(
      `JSON Server running at http://localhost:3001 with ${DELAY / 1000}s delay`
    );
  });
});
