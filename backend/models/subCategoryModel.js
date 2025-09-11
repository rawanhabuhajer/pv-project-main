
const mongoose = require("mongoose");
const { Schema } = mongoose;

const pvModuleDataSchema = new Schema({
  cableLength: { type: Number },
  vmp: { type: Number },
  Impp: { type: Number },
  pmax: { type: Number },
  uMax: { type: Number },
  classSelectedModule: { type: String },
  childSelectedModule: { type: String },
  areaSelectedModule: { type: Number },
  r20Module: { type: Number },
  rTempretureModule: { type: Number },
  operationTemp: { type: Number },
});

const stringDataSchema = new Schema({
  id: { type: String },
  classSelected: { type: String },
  childSelected: { type: String },
  areaSelected: { type: Number },
  conductorCableLength: { type: Number },
  seriesModule: { type: Number },
  r20: { type: Number },
  rTempreture: { type: Number },
  uTempreture: { type: Number },
  kt: { type: Number },
  nominalPower: { type: Number },
  ploss: { type: Number },
  plossTemp: { type: Number },
  numberOfModules: { type: Number },
  pLossTotal: { type: Number },
  cabelsQuantity: { type: Number },
  stringCount: { type: Number },
  uMaxLength: { type: Number },
});

const inverterDataSchema = new Schema({
  id: { type: String },
  inverterCount: { type: Number },
  strings: [stringDataSchema],
});

const subcategoryDataSchema = new Schema({
  pvModuleData: pvModuleDataSchema,
  inverterData: [inverterDataSchema],
});

const subcategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    data: [subcategoryDataSchema],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subcategorySchema);
