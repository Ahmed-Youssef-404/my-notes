const registerRoutes = (server, router) => {
  const db = router.db;

  // GET /api/tags/:userId
  server.get("/api/tags/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    const tags = db.get("tags").filter({ userId }).value();
    res.json(tags);
  });

  server.get("/api/notes/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    const tagId = req.query.tagId ? Number(req.query.tagId) : null;

    let notes = db.get("notes").filter({ userId });

    if (tagId) {
      notes = notes.filter({ tagId });
    }

    res.json(notes.value());
  });

  server.get("/api/note/:userId/:noteId", (req, res) => {
    const userId = Number(req.params.userId);
    const tagId = req.query.tagId ? Number(req.query.tagId) : null;

    let notes = db.get("notes").filter({ userId });

    if (tagId) {
      notes = notes.filter({ tagId });
    }

    res.json(notes.value());
  });

  server.get("/api/users/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    const user = db.get("users").find({ id: userId }).value();

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};
