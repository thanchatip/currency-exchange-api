const User = require("../models/User");

async function register(req, res) {
  const { username, password, email, phone } = req.body;
  try {
    const user = await User.create({
      Username: username,
      Password: password,
      Email: email,
      Phone: phone,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { Username: username } });
    if (user && (await user.validatePassword(password))) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { register, login, getAllUsers };
