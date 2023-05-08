const express = require('express'); 
const User = require('../Models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'RadheRadhe';


router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ error: "Ye user kaha milega" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Ye user kaha milega" });
      }
  
       
      
      success = true;
      let uname = user.name;
      let umail = user.email;
      let uid = user._id;
      try{
        
        res.json({ success,  uname, umail, uid })
      } catch(e){
        console.log(e)
         
      }
      
      console.log("success");
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });


  router.post('/adduser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 5 }),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User exists" })
      }
  
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
  
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      });
  
      const data = {
        user: {
          id: user.id
        }
      }
  
       
      const authtoken = jwt.sign(data, JWT_SECRET);
       
      res.json({ authtoken,user })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  
    }
});




module.exports = router;