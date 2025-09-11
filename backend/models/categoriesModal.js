const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    subcategories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
