import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  gridFSId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Document = mongoose.models.Document || mongoose.model("Document", documentSchema);

export default Document;