const mongoose = require("mongoose");
const { Schema } = mongoose;

const mvCategorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MvCategory", mvCategorySchema);
