const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('profilePic');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) {
    req.body.profilePic = `http://localhost:3002/default.jpg`;
    return next();
  }
  req.file.filename = `user-${req.user ? req.user._id : Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`src/images/User/${req.file.filename}`);

  req.body.profilePic = `http://localhost:3002/User/${req.file.filename}`;

  next();
};
