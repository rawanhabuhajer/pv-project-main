const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    tags: [{ type: String }],
    metaTitle: { type: String },
    metaDescription: { type: String },
    canonicalTag: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
