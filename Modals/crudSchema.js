import mongoose from "mongoose";

const crudSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  date: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
    required: [true, "desc is required"],
  },
  selectedDirectory: {
    type: String,
    required: [true, "Directory is required"],
  },
}, { timestamps: true });

const CrudModel = mongoose.model("CrudModel", crudSchema);

export default CrudModel;
