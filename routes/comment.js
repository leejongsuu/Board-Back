const express = require("express");
const router = express.Router();
const Comment = require("../schema/comment");
const Page = require("../schema/page");

router.get("/", function (req, res, next) {
  Comment.find({}, function (err, comments) {
    res.send(comments);
  }).populate("User_id");
});

router.post("/", function (req, res, next) {
  const { User_id, Content, CreatedAt, Page_id } = req.body;

  const commentSave = new Comment({
    User_id: User_id,
    Content: Content,
    Page_id: Page_id,
    CreatedAt: CreatedAt,
  });

  commentSave.save(function (err, result) {
    if (err) {
      res.send({ ErrorMessage: "Error" });
    } else {
      Page.findOneAndUpdate(
        { _id: Page_id },
        { $push: { Comment_ids: result._id } }
      )
        .then((res) => {
          res.send(result);
        })
        .catch((err) => console.log(err));
      res.send({ Message: "등록이 완료되었습니다." });
    }
  });
});

router.put("/", function (req, res, next) {
  const { _id, Content } = req.body;
  Comment.findByIdAndUpdate(_id, { Content: Content }, function (err, result) {
    if (err) {
      res.send({ ErrorMessage: "Error" });
    } else {
      res.send({ Message: "수정이 완료되었습니다." });
    }
  });
});

router.delete("/", function (req, res, next) {
  const { id } = req.body;
  Comment.findByIdAndDelete(id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      Page.findOneAndUpdate({ Comment_ids: id }, { $pull: { Comment_ids: id } })
        .then((res) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
      res.send("성공");
    }
  });
});

module.exports = router;
