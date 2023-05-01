const { initializeApp } = require('firebase/app');
const { firebaseConfig } = require('../Config/firebase');
const { CatchAsync } = require('../Utils/CatchAsync');
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} = require('firebase/storage');

initializeApp(firebaseConfig);
const storage = getStorage();

exports.fireBaseUpload = CatchAsync(async (req, res, next) => {
  const storageRef = ref(
    storage,
    `images/${Date.now() + req.file.originalname}`
  );
  const snapshot = await uploadBytes(storageRef, req.file.buffer);
  const downloadURL = await getDownloadURL(snapshot.ref);
  req.body.profilePic = downloadURL;
  next();
});
