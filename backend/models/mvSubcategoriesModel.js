const mongoose = require("mongoose");
const { Schema } = mongoose;

const mvDataSchema = new Schema({
  coreType: { type: String },
  conductorType: { type: String },
  insulationType: { type: String },
  installationMethod: { type: String },
  spacingMethod: { type: String },
  conductorSize: { type: Number },
  mvCableValue: { type: Number },
  ambientTemperature: { type: Number },
  ambientTemperatureResult: { type: Number },
  spacing: { type: String },
  selectedGroup: { type: Number },
  CFFResult: { type: Number },
  cableCount: { type: Number },
  resistivitiesspacing: { type: Number },
  factor: { type: Number },
  selectedDepth: { type: String },
  selectedConductorSize: { type: String },
  cableMethod: { type: String },
  cableInstallationType: { type: String },
  traysLadders: { type: String },
  circuits: { type: String },
  cableResult: { type: Number },
  inputFactor: { type: Number },
  sumResult: { type: Number },
  comperision: { type: String },
  cableRuns: { type: Number },
  Iz: { type: Number },
  correctionFactor: { type: Number },
  availableGroups: { type: Array },
});
const tableDataSchema = new Schema({
  inputFactor: { type: Number },
  sumResult: { type: Number },
  comperision: { type: String },
});

const mvSubcategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    details: [mvDataSchema],
    tableData: [tableDataSchema],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MvSubCategory", mvSubcategorySchema);
