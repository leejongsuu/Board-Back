const mongoose = require("mongoose");
const reCommentSchema = new mongoose.Schema({
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Content: String,
  Page_id: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },
  Comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  CreatedAt: { type: Date, require: true, default: () => new Date() },
});
module.exports = mongoose.model("reComment", reCommentSchema, "reComment");
