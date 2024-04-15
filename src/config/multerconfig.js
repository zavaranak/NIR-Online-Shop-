const multer = require("multer");
// Cài đặt nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_DESTINATION);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Khởi tạo multer với cấu hình đã định nghĩa
const upload = multer({ storage: storage });
module.exports = upload;
