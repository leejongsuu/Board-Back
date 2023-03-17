const express = require("express");
const router = express.Router();
const User = require("../schema/user");
const Page = require("../schema/page");
const Comment = require("../schema/comment");

router.get("/", function (req, res, next) {
  User.find({}, function (err, users) {
    res.send(users);
  });
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  User.findById(id, function (err, user) {
    res.send(user);
  });
});

router.post("/", function (req, res, next) {
  const { Name, Phone } = req.body;
  const userSave = new User({ Name: Name, Phone: Phone });
  userSave.save(function (err, result) {
    if (err) {
      res.send({ ErrorMessage: "Error" });
    } else {
      res.send({ Message: "등록이 완료되었습니다." });
    }
  });
});

router.put("/", function (req, res, next) {
  const { _id, Name, Phone } = req.body;
  User.findByIdAndUpdate(
    _id,
    { Name: Name, Phone: Phone },
    function (err, result) {
      if (err) {
        res.send({ ErrorMessage: "Error" });
      } else {
        res.send({ Message: "수정이 완료되었습니다." });
      }
    }
  );
});

router.delete("/", function (req, res, next) {
  const { id } = req.body;

  User.findByIdAndDelete(id, function (err1, result1) {
    if (result1) {
      Page.deleteMany({ User_id: id }, function (err2, result2) {
        if (err2) {
          console.log(err2);
        } else {
          Comment.deleteMany({ User_id: id }, function (err3, rsult3) {
            if (err3) {
              console.log(err3);
            } else {
              res.send("succeed!");
            }
          });
        }
      });
    }
  });
});

module.exports = router;
