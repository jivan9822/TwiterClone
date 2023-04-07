require('dotenv').config({ path: 'config.env' });
const express = require('express');
const cors = require('cors');
const login = require('./src/Routes/Login');
const { requireLogin } = require('./src/MiddleWare/loginMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', requireLogin, (req, res, next) => {
  console.log(req.query.data);
  res.send('HomePage');
});
app.use('/login', login);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
