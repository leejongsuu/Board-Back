const express = require("express");
const router = express.Router();
const reComment = require("../schema/reComment");
const Page = require("../schema/page");
const Comment = require("../schema/comment");

router.get("/", function (req, res, next) {
  reComment
    .find({}, function (err, Recomments) {
      res.send(Recomments);
    })
    .populate("User_id");
});

router.post("/", function (req, res, next) {
  const { User_id, Page_id, Comment_id, Content, CreatedAt } = req.body;
  const reCommentSave = new reComment({
    User_id: User_id,
    Page_id: Page_id,
    Comment_id: Comment_id,
    Content: Content,
    CreatedAt: CreatedAt,
  });

  reCommentSave.save(function (err, result) {
    if (err) {
      res.send({ ErrorMessage: "Error" });
    } else {
      Page.findOneAndUpdate(
        { _id: Page_id },
        { $push: { reComment_ids: result._id } }
      )
        .then((res) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
      Comment.findOneAndUpdate(
        { _id: Comment_id },
        { $push: { reComment_ids: result._id } }
      )
        .then((res) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
      res.send({ Message: "등록이 완료되었습니다." });
    }
  });
});

router.put("/", function (req, res, next) {
  const { _id, Content } = req.body;
  reComment.findByIdAndUpdate(
    _id,
    { Content: Content },
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
  reComment.findByIdAndDelete(id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      Page.findOneAndUpdate(
        { reComment_ids: id },
        { $pull: { reComment_ids: id } }
      )
        .then((res) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });

      Comment.findOneAndUpdate(
        { reComment_ids: id },
        { $pull: { reComment_ids: id } }
      )
        .then((res) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    res.send("성공");
  });
});

module.exports = router;
