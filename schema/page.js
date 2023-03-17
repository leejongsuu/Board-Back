const mongoose = require("mongoose");
const pageSchema = new mongoose.Schema({
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Title: String,
  Content: String,
  CreatedAt: { type: Date, require: true, default: () => new Date() },
  Comment_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  reComment_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "reComment" }],
});

module.exports = mongoose.model("Page", pageSchema, "Page");
