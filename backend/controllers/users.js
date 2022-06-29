const User = require("../models/dataModel").User;

const newUser = async (req, res) => {
  try {
    const id = (await User.findAll()).length+1;
    await User.create({
      UID: "User"+id,
      Name: req.body.name,
      DOB: req.body.dob,
      Password: req.body.passwd,
      Gender: req.body.gender
    });
    req.session.user = {
      UID: "User"+id,
      Name: req.body.name,
    };
    res.redirect('dashboard')
  } catch (error) {
    res.json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        UID: req.body.uid,
        Password: req.body.passwd,
      },
    });
    if (user[0]) {
      req.session.user = {
        UID: user[0].UID,
        Name: user[0].Name,
      };
      res.redirect('dashboard');
    } else {
      res.json({ loggedIn: false, message: "Login failed" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {loginUser, newUser}