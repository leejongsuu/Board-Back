const express = require("express");
const router = express.Router();
const Page = require("../schema/page");
const Comment = require("../schema/comment");
const reComment = require("../schema/reComment");

router.get("/", function (req, res, next) {
  Page.find({}, function (err, pages) {
    if (err) {
      console.log(err);
    } else {
      res.send(pages);
    }
  }).populate("User_id");
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  Page.findById(id, function (err, page) {
    res.send(page);
  })
    .populate(["Comment_ids"])
    .populate(["reComment_ids"]);
});

router.post("/", function (req, res, next) {
  const { Title, Content, User_id, CreatedAt } = req.body;
  const pageSave = new Page({
    Title: Title,
    Content: Content,
    User_id: User_id,
    CreatedAt: CreatedAt,
  });
  pageSave.save(function (err, result) {
    if (err) {
      res.send({ ErrorMessage: "Error" });
    } else {
      res.send(result);
    }
  });
});

router.put("/", function (req, res, next) {
  const { _id, Title, Content, CreatedAt } = req.body;
  Page.findByIdAndUpdate(
    _id,
    { Title: Title, Content: Content, CreatedAt: CreatedAt },
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

  Page.findByIdAndDelete(id, function (err, result) {
    if (result) {
      console.log(result);

      Comment.deleteMany({ Page_id: id }, function (err2, result2) {
        if (err2) {
          console.log(err2);
        } else {
          reComment.deleteMany({ Page_id: id }, function (err3, result3) {
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
