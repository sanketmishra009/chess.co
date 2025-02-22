const router = require("express").Router();

// const firebase = require("../../firebaseConfig");
// const { auth } = require("../../firebaseConfig");

router.post("/signup", (req, res) => {
  console.log(req.body);
  // auth
  //   .createUserWithEmailAndPassword("sam@gmail.com", "pass@123")
  //   .then((userCredential) => {
  //     console.log(userCredential);
  //     res.send(userCredential);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  res.send("done");
});

module.exports = router;
