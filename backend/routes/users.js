const express = require('express');
const router = express.Router();
// const User  = require('../models/user');
const models = require('../models');

/* GET users listing. */
router.get('/:userId', async (req, res, next) => {
  try {

    const userId = req.params.userId;
    // Use Sequelize to query the User model for the user with the specified ID
    let userData = await models.User.findByPk(userId);
    // 检查是否有匹配的用户
    if (userData.length === 0) {
      // 返回空数组表示没有匹配的用户
      return res.json([]);
    }

    // Send the user's information as a JSON response
    res.json(userData);

  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
