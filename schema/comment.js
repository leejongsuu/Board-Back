const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Content: String,
  Page_id: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },
  reComment_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "reComment" }],
  CreatedAt: { type: Date, require: true, default: () => new Date() },
});

module.exports = mongoose.model("Comment", commentSchema, "Comment");
