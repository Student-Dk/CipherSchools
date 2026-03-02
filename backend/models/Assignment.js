import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    postgresDatabaseName: {
      type: String,
      required: true,
    },
    tables: {
  type: [String], // e.g. ["students"], ["employees"]
  required: true,
}
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;