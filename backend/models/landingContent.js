const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  id: { type: String },
  title: { type: String, default: null },
  subTitle: { type: String, default: "" },
  description: { type: String, default: null },
  buttonLabel: { type: String, default: "" },
  buttonUrl: { type: String, default: "" },
  image: { type: String, default: null },
  lang: { type: String, default: null },
  isActive: { type: Boolean, default: true },
});

const sectionSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    sectionId: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    title: { type: String, default: "" },
    subTitle: { type: String, default: "" },
    description: { type: String, default: "" },
    buttonLabel: { type: String, default: null },
    buttonUrl: { type: String, default: null },
    image: { type: String, default: null },
    lang: { type: String, default: "ar" },
    items: [itemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("LandingContent", sectionSchema);
