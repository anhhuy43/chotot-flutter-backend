const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConstant = require('../constants/authConstant');

class UserController {
  // [POST] /user/register
  async register(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists!' });
      }

      const user = new User({ firstName, lastName, email, password });
      await user.save();

      res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /user/login
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(404).json({ success: false, message: 'User not found!' });
      }

      const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ success: false, message: 'Wrong password!' });
      }

      const token = jwt.sign(
        { userId: foundUser._id.toString(), role: foundUser.role },
        authConstant.JWT_SECRET_KEY,
        { expiresIn: authConstant.TOKEN_EXPIRATION }
      );

      res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /user/info
  async info(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found!' });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  // [PUT] /user/update
  async update(req, res, next) {
    const { firstName, lastName } = req.body;

    try {
      await User.findByIdAndUpdate(req.user.userId, { firstName, lastName });
      res.status(200).json({ success: true, message: 'User updated successfully!' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
