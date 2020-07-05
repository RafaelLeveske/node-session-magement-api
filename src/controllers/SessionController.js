const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // segundos
      });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json({ error: 'Incorrect email combination.' }, 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return res.json({ error: 'Incorrect password combination.' }, 401);
    }

    return res.send({
      user,
      token: genetateToken({ id: user.id }),
    });
  },
};
