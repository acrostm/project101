const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {

    // const userId = parseInt(req.params.userId);

    // Use Sequelize to query the User model for the user with the specified ID
    const userData = await User.findAll({
      where: {
        firstName: 'Jiach'
      }
    });

    if(!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user's information as a JSON response
    res.json(userData);

  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
