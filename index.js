const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const passportConfig = require('./config/passport');
passportConfig(passport);


const users = [{ id: 1, name: 'afrah', password: 'afrah123' }];


app.get('/', (req, res) => {
  res.send('Welcome to the App!');
});


app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const user = users.find(u => u.name === name && u.password === password);
  if (user) {
    const payload = { sub: user.id, name: user.name };
    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'You are accessing a protected route!', user: req.user });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
