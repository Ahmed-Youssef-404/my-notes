const fs = require("fs/promises");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const UPLOAD_DIR = path.join(__dirname,"..", "uploads");

const ensureDirectoryExists = async (dir) => {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(`dir exists : ${dir}`);
  } catch (err) {
    console.error("failed to create upload directory", err);
    process.exit(1);
  }
};

const createUploadMiddleware = () => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, UPLOAD_DIR),
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    },
  });

  return multer({ storage });
};

module.exports = {
  UPLOAD_DIR,
  ensureDirectoryExists,
  createUploadMiddleware,
};
