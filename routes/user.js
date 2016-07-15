const router          = require('express').Router();
const { getAllUsers,
        getUser,
        addUser,
        updateUser,
        deleteUser }  = require('../db/db');

// User landing page
router.get('/', getAllUsers, (req,res) => {
  res.render('user/index',{users: res.rows});
});

// Post route to add new user
router.post('/new', addUser, (req,res) => {
  res.redirect('/user');
});


// Show user's profile
router.get('/:id', getUser, (req,res) => {
  res.render('user/show', {user: res.rows});
});

// // Edit user
router.put('/:id', updateUser, (req,res) => {
  res.redirect('/user/'+req.params.id);
});

// Delete user
router.delete('/:id', deleteUser, (req,res) => {
 res.redirect('/user');
})

module.exports = router;
