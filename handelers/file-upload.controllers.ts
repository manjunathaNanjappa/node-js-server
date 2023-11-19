import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

export const uploadFile = multer({ storage: storage });
