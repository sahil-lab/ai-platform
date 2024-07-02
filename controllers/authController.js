const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const configService = require('../services/configService');

const generateToken = (user, secret) => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
};

// Register user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const jwtSecret = configService.generateJwtSecret();

    user = new User({ name, email, password, jwtSecret });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const token = generateToken(user, jwtSecret);
    user.token = token;

    await user.save();

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const token = generateToken(user, user.jwtSecret);
    user.token = token;
    await user.save();

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { register, login };
